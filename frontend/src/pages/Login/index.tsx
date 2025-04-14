import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import "./styles.css";
import { LayoutComponents } from "../../components/LayoutComponents";
import axios, { AxiosError } from "axios";

type LoginResponse = {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
};

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8080/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login falhou");
      }
    } catch (err) {
      const axiosError = err as AxiosError<LoginResponse>;
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Erro ao fazer login"
      );
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutComponents>
      <span className="login-form-title">Login</span>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <span className="focus-input" data-placeholder="Senha"></span>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>

        <div className="container-login-form-btn">
          <button
            className="login-form-btn"
            type="submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Carregando..." : "ENTRAR"}
          </button>
        </div>

        <div className="login-create-account">
          <span className="text1">Não possui uma conta?</span>
          <Link to="/cadastro" className="text2">
            Criar conta.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};