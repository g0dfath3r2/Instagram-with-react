import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

import { doesUsernameExist } from "../services/firebase";

function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
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
    } else if (name === "username") {
      setUsername(value);
    } else if (name === "fullName") {
      setFullName(value);
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        console.log(createdUserResult);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setError("That username is already taken , please try another.");
    }
  };

  useEffect(() => {
    document.title = "SignUp - Instagram";
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
          <form onSubmit={handleSignUp} className="form w-full">
            <input
              type="text"
              value={username}
              name="username"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
               border border-gray-primary rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              value={fullName}
              name="fullName"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
               border border-gray-primary rounded mb-2"
              onChange={handleChange}
              required
            />
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
              Sign Up
            </button>
          </form>
        </div>
        <div
          className="flex justify-center items-center flex-col w-full bg-white p-4
          border border-gray-primary"
        >
          <p className="text-sm">
            Already have an account?
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
