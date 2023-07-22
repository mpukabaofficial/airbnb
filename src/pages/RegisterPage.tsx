import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("registration successful, now you can log in");
    } catch (e) {
      alert("Registration failed please try again later");
    }
  }
  return (
    <div className="mt-4 flex grow items-center justify-center">
      <div className="">
        <h1 className="mb-4 text-center text-4xl">Register</h1>
        <form className="mx-auto max-w-lg" onSubmit={registerUser}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            name="email"
            id="registeremail"
            placeholder="youremail@domain.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            name="password"
            id="registerpassword"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary">Register</button>
          <div className="py-2 text-center">
            Already a member?{" "}
            <Link className="text-primary  hover:underline" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
