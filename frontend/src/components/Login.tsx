import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <>
      <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <span className="login-form-title">Login</span>
            <form action="" className="login-form">
              <div className="wrap-input">
                <input
                  className={email !== "" ? 'has-value input' : 'input'}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Email"></span>
              </div>

              <div className="wrap-input">
                <input
                  className={password !== "" ? 'has-value input' : 'input'}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Password"></span>
              </div>

              <div className="container-login-form-btn">
                <button className="login-form-btn">ENTRAR</button>
              </div>

              <div className="login-create-account">
                <span className="text1">Não possuí uma conta?</span>
                <a className="text2" href="#">
                  Criar conta.
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
