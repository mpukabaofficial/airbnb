import axios from "axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLoginSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    try {
      axios.post(
        "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      alert("login successful");
    } catch (error) {
      alert("login failed");
    }
  }

  return (
    <div className="mt-4 flex grow items-center justify-center">
      <div className="">
        <h1 className="mb-4 text-center text-4xl">Login</h1>
        <form className="mx-auto max-w-lg" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="youremail@domain.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary">Login</button>
          <div className="py-2 text-center">
            Don't have an account yet?{" "}
            <Link className="text-primary  hover:underline" to={"/register"}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;