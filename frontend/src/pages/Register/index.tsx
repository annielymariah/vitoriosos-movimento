import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import axios, { AxiosError } from "axios";
import "./styles.css";

type RegisterResponse = {
  id?: string;
  name?: string;
  email?: string;
  message?: string;
  errors?: {
    email?: string[];
    cpf?: string[];
    password?: string[];
  };
};

export const Register = () => {
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let isValid = true;
    
    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres");
      isValid = false;
    }

    return isValid;
  };

  const formatCPF = (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiErrors({});
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post<RegisterResponse>(
        "http://localhost:8080/cadastro",
        {
          name,
          cpf: cpf.replace(/\D/g, ''),
          email,
          password,
          password_confirmation: confirmPassword,
        }
      );

      if (response.data.id) {
        navigate("/login", { state: { registrationSuccess: true } });
      } else {
        setApiErrors({ general: response.data.message || "Erro no cadastro" });
      }
    } catch (err) {
      const axiosError = err as AxiosError<RegisterResponse>;
      if (axiosError.response?.data?.errors) {
        const errors: Record<string, string> = {};
        Object.entries(axiosError.response.data.errors).forEach(([key, value]) => {
          errors[key] = value.join(" ");
        });
        setApiErrors(errors);
      } else {
        setApiErrors({
          general: axiosError.response?.data?.message || "Erro ao cadastrar usuário",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutComponents>
      <span className="register-form-title">Cadastro</span>
      
      {apiErrors.general && (
        <div className="error-message">{apiErrors.general}</div>
      )}

      <form onSubmit={handleSubmit} className="registry-form">
        <div className="wrap-input">
          <input
            className={name !== "" ? "has-val input" : "input"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
          />
          <span className="focus-input" data-placeholder="Nome Completo"></span>
          {apiErrors.name && (
            <div className="input-error-message">{apiErrors.name}</div>
          )}
        </div>

        <div className="wrap-input">
          <input
            className={cpf !== "" ? "has-val input" : "input"}
            type="text"
            value={formatCPF(cpf)}
            onChange={(e) => setCpf(e.target.value)}
            required
            maxLength={14}
          />
          <span className="focus-input" data-placeholder="CPF"></span>
          {apiErrors.cpf && (
            <div className="input-error-message">{apiErrors.cpf}</div>
          )}
        </div>

        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="focus-input" data-placeholder="Email"></span>
          {apiErrors.email && (
            <div className="input-error-message">{apiErrors.email}</div>
          )}
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <span className="focus-input" data-placeholder="Senha"></span>
          {apiErrors.password && (
            <div className="input-error-message">{apiErrors.password}</div>
          )}
        </div>

        <div className="wrap-input">
          <input
            className={confirmPassword !== "" ? "has-val input" : "input"}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
          <span className="focus-input" data-placeholder="Confirmar Senha"></span>
          {passwordError && (
            <div className="password-error-message">{passwordError}</div>
          )}
        </div>

        <div className="container-register-form-btn">
          <button
            type="submit"
            className="register-form-btn"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "CRIAR CONTA"}
          </button>
        </div>

        <div className="register-login-account">
          <span className="text1">Já possui uma conta?</span>
          <Link to="/login" className="text2">
            Acesse já.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};