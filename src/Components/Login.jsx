import { useState } from "react";
import "../Styles/Login.css";
import logo from "../assets/shabkhooz.png";

function Login({ handleLogin, isLoading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="login-page">
      <img src={logo} alt="Game Logo" className="game-logo" />
      <h1 className="welcome">Welcome to EMIT Contest!</h1>
      <div className="login-container">
        <p className="login-title">Please log in to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {isLoading ? (
              <div className="loading-indicator">
                <div className="spinner"></div>
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
