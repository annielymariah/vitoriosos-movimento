import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles.css";
import { LayoutComponents } from "../../components/LayoutComponents";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LayoutComponents>
      <span className="login-form-title">Login</span>
      <form action="" className="login-form">
        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <button className="login-form-btn">ENTRAR</button>
        </div>

        <div className="login-create-account">
          <span className="text1">Não possuí uma conta?</span>
          <Link to="/cadastro" className="text2">
            Criar conta.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};
