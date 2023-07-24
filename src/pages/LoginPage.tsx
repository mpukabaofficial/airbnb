import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [inputLength, setInputLength] = useState(0);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputLength < 3) return;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      console.log(data);
      setUser(data);
      alert("login successful");
      setRedirect(true);
    } catch (error) {
      alert("login failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 flex grow items-center justify-center">
      <div className="">
        <h1 className="mb-4 text-center text-4xl">Login</h1>
        {inputLength < 3 && inputLength > 0 && (
          <p className="text-primary">
            Please input valid email and/or password
          </p>
        )}
        <form className="mx-auto max-w-lg" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="youremail@domain.com"
            value={email}
            onChange={(event) => {
              {
                setEmail(event.target.value);
                setInputLength(event.target.value.trim().length);
              }
            }}
            minLength={3}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(event) => {
              {
                setPassword(event.target.value);
                setInputLength(event.target.value.trim().length);
              }
            }}
            minLength={3}
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
