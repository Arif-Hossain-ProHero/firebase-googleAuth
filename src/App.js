import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";

import "./App.css";
import initializeAuth from "./Firebase/firebase.init";
import { useState } from "react";

initializeAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();

function App() {
  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedUser);
      })
      .catch((error) => console.log(error.message));
  };

  const handleGitgubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedUser);
      })
      .catch((error) => console.log(error.message));
  };
  const handleLogOut = () => {
    signOut(auth).then(() => setUser({}));
  };

  return (
    <div className="App">
      {user.email ? (
        <div>
          <button onClick={handleLogOut}>logOut</button>
        </div>
      ) : (
        <div>
          {" "}
          <button onClick={handleGoogleSignIn}>SignIn with Google</button>
          <button onClick={handleGitgubSignIn}>SignIn with Github</button>
        </div>
      )}
      <br />
      {user.email && (
        <div>
          <h1>{user.name}</h1>
          <h5>{user.email}</h5>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
