import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/auth/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="border m-4 p-4 rounded max-w-sm" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <label className="block" htmlFor="email">
          Email
        </label>
        <input
          className="border p-2 rounded w-full"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <br />
        <br />

        <label className="block" htmlFor="password">
          Password
        </label>
        <input
          className="border p-2 rounded w-full"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <br />
        <br />

        <button type="submit" className="border p-2 rounded w-full">
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
