import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  function handleChange(event) {
    const { value, name } = event.target;

    if (name === "email") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login- Instagram";
  }, []);

  return (
    <div className="login-container container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="login-img">
        <img
          className=" flex w-3/5 w-full"
          src={process.env.PUBLIC_URL + "/images/iphone-with-profile.jpg"}
          alt="inta-mobile"
        />
      </div>
      <div className="login flex flex-col w-2/5 w-full">
        <div
          className="login-form flex flex-col items-center bg-white p-4 mb-4
        border border-gray-primary w-full rounded"
        >
          <h1 className="flex justify-center w-full">
            <img
              className="mt-2 w-6/12 mb-4"
              src={process.env.PUBLIC_URL + "/images/users/logo.png"}
              alt="instagram"
            />
          </h1>
          <form onSubmit={handleLogin} className="form w-full">
            <input
              type="email"
              value={emailAddress}
              name="email"
              placeholder="Email Address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
               border border-gray-primary rounded mb-2"
              onChange={handleChange}
            />
            <input
              type="password"
              value={password}
              name="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
               border border-gray-primary rounded mb-2"
              onChange={handleChange}
            />
            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

            <button
              className={`"login-btn bg-blue-medium text-white w-full rounded h-8 font-bold"
              ${isInvalid && "opacity-50"}`}
            >
              Log In
            </button>
          </form>
        </div>
        <div
          className="flex justify-center items-center flex-col w-full bg-white p-4
          border border-gray-primary"
        >
          <p className="text-sm">
            Don't have an account?
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
