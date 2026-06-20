import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/auth/signup",
        {
          name,
          email,
          password,
          passwordConfirm,
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
        <h1 className="text-2xl font-bold mb-6">Signup</h1>

        <label className="block" htmlFor="name">
          Name
        </label>
        <input
          className="border p-2 rounded w-full"
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <br />
        <br />

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
        <label className="block" htmlFor="passwordConfirm">
          Confirm Password
        </label>

        <input
          className="border p-2 rounded w-full"
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Confirm your password"
        />
        <br />
        <br />

        <button type="submit" className="border p-2 rounded w-full">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
