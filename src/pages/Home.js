import { useNavigate } from "react-router-dom";
function Home() { 
    const navigate = useNavigate();
  return (
    <div className="container">
      <div className="hero">

        <div className="logo">🧬</div>

        <h1>Context DNA</h1>

        <h2>Your AI Memory Layer</h2>

        <p>
          Remembering your goals, habits and preferences
          to deliver truly personalized AI experiences.
        </p>

        <button onClick={() => navigate("/login")}>
  Get Started →
</button>
      </div>

      <div className="features">

        <div className="card">
          🧠
          <h3>Persistent Memory</h3>
          <p>AI remembers you across every session.</p>
        </div>

        <div className="card">
          🎯
          <h3>Goal Aware</h3>
          <p>Keeps track of your long-term goals.</p>
        </div>

        <div className="card">
          🔒
          <h3>Privacy First</h3>
          <p>Your memories stay secure.</p>
        </div>

      </div>
    </div>
  );
}

export default Home;