import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles.css";
import { LayoutComponents } from "../../components/LayoutComponents/LayoutComponents";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você normalmente faria a validação do login
    // Por enquanto, vamos apenas simular um login bem-sucedido
    
    // Redireciona para a landing page com estado de logado
    navigate("/", { state: { isLoggedIn: true } });
  };

  return (
    <LayoutComponents>
      <div className="w-[390px] rounded-2xl bg-gray-100 shadow-lg">
        <form onSubmit={handleSubmit} className="login-form">
          <span className="login-form-title">Login</span>
          
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
            <button type="submit" className="login-form-btn">
              ENTRAR
            </button>
          </div>

          <div className="login-create-account">
            <span className="text1">Não possuí uma conta?</span>
            <Link to="/cadastro" className="text2">
              Criar conta.
            </Link>
          </div>
        </form>
      </div>
    </LayoutComponents>
  );
};