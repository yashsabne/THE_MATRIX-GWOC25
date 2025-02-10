import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setUser } from "../redux/state"; // Import Redux actions
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "../styles/login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // If using cookies
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(login({ token: data.token }));
        dispatch(setUser(data.user));
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        seterrorMsg(data.message);
      }
    } catch (error) {
      seterrorMsg("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      {/* Left side - Banner */}
      <div className="signup-banner">
        <div className="signup-banner-overlay"></div>
        <div className="signup-banner-content">
          <h1>Welcome Back to KALKI!</h1>
          <p className="bold">Sign in to continue.</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Login</h2>
          <p className="text-muted">Enter your credentials to access your account</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address*"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password*"
              required
            />
            <p className="forgot-password">Forgot Password?</p>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          {message && <p className="message success">{message}</p>}
          {errorMsg && <p className="message error" > {errorMsg} </p> }

          <div className="social-icons">
            <FaFacebook size={30} className="facebook-icon" />
            <FaGoogle size={30} className="google-icon" />
          </div>

          <p className="text-muted small-text mt-3">
            Don't have an account?{" "}
            <span className="text-primary">
              <a href="/signup">Sign Up</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
