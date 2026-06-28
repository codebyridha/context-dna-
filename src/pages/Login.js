import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="container">

      <div className="card login-card">

        <h1>🔐</h1>

        <h2>Welcome Back</h2>

        <p>
          Sign in to continue your Context DNA journey.
        </p>

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button onClick={() => navigate("/chat")}>
          Sign In
        </button>

      </div>

    </div>
  );
}

export default Login;