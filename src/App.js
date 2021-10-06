import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "./App.css";
import initializeAuth from "./Firebase/firebase.init";
import { useState } from "react";

initializeAuth();
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
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

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>SignIn</button>
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
