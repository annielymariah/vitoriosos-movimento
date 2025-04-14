import { Link } from "react-router-dom";
import { useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import "./styles.css";

export const Register = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }
    setPasswordError("");
    console.log("Cadastro enviado:", { name, cpf, email, password });
  };

  return (
    <LayoutComponents>
      <span className="register-form-title">Cadastro</span>
      <form onSubmit={handleSubmit} className="registry-form">
        <div className="wrap-input">
          <input
            className={name !== "" ? "has-val input" : "input"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span className="focus-input" data-placeholder="Nome Completo"></span>
        </div>

        <div className="wrap-input">
          <input
            className={cpf !== "" ? "has-val input" : "input"}
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <span className="focus-input" data-placeholder="CPF"></span>
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
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>

        <div className="wrap-input">
          <input
            className={confirmPassword !== "" ? "has-val input" : "input"}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="focus-input"
            data-placeholder="Confirmar Senha"
          ></span>
          {passwordError && (
            <div className="password-error-message">{passwordError}</div>
          )}
        </div>

        <div className="container-register-form-btn">
          <button type="submit" className="register-form-btn">
            CRIAR CONTA
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
