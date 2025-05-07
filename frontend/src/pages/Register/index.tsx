import { Link } from "react-router-dom";
import { useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents/LayoutComponents";
import "./styles.css";

export const Register = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    setPasswordError("");

    try {
      const resposta = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: name,
          email,
          senha: password,
        }),
      });

      if (resposta.status === 201) {
        alert("Usuário cadastrado com sucesso!");
        setName("");
        setCpf("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else if (resposta.status === 409) {
        alert("E-mail já está cadastrado!");
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <LayoutComponents>
      <div className="w-[390px] rounded-2xl bg-gray-100 shadow-lg">
        <form onSubmit={handleSubmit} className="registry-form">
          <span className="register-form-title">Cadastro</span>
          <div className="wrap-input">
            <input
              className={name !== "" ? "has-val input" : "input"}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span
              className="focus-input"
              data-placeholder="Nome Completo"
            ></span>
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
      </div>
    </LayoutComponents>
  );
};
