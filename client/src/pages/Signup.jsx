import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Redirect after signup
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "../styles/signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Redirect user after signup

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // **Send OTP to Email**
  const sendOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/auth/send-otp-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setMessage("OTP sent! Please check your email.");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error sending OTP. Try again.");
    }
    setLoading(false);
  };

  // **Verify OTP & Register User**
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const verifyOtpRes = await fetch("http://localhost:3001/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: form.otp }),
      });

      const verifyData = await verifyOtpRes.json();
      if (!verifyOtpRes.ok) {
        setMessage(verifyData.message);
        setLoading(false);
        return;
      }

      // Proceed with registration after OTP verification
      const registerRes = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const registerData = await registerRes.json();
      if (registerRes.ok) {
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login page
      } else {
        setMessage(registerData.message);
      }
    } catch (error) {
      setMessage("Error registering. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      {/* Left side - Banner */}
      <div className="signup-banner">
        <div className="signup-banner-overlay"></div>
        <div className="signup-banner-content">
          <h1>Register & Be A Part Of The KALKI Circle!</h1>
          <p className="bold">Join Now.</p>
          <p className="small">T&C Apply</p>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <p className="text-muted">
            Welcome to Kalki! It's quick and easy to set up an account
          </p>

          <form onSubmit={handleRegister}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name*"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address*"
              required
            />
            <div className="phone-input">
              <span className="phone-prefix">+91 🇮🇳</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number*"
                required
              />
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password*"
              required
            />

            {!otpSent ? (
              <button type="button" onClick={sendOtp} disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <>
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP*"
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </>
            )}
          </form>

          {message && <p className="message">{message}</p>}

          <p className="text-muted small-text mt-3">
            By continuing, I agree to the Terms of Use and Privacy Policy
          </p>

          <div className="social-icons">
            <FaFacebook size={30} className="facebook-icon" />
            <FaGoogle size={30} className="google-icon" />
          </div>

          <p className="text-muted small-text mt-3">
            Already have an account?{" "}
            <span className="text-primary">
              <a href="/login">Sign In</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
