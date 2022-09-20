// React, Router & Redux imports
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// Firebase imports
import { googleSignIn, signIn, signUp } from '../utils/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Other imports
import styled from 'styled-components';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState(false)

  // Updates de login state wanneer iemand in- of uitlogt
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      setLogin(!!user);
    });
    return () => {
      listener();
    };
  }, [])

  return (
    <Wrapper>
      {!login ? (
        <div className="login-container">
          <div className="login-card">
            <h1>Inloggen</h1>
            <input className="input-info" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input className="input-info" type="password" placeholder="Wachtwoord" onChange={(e) => setPassword(e.target.value)} required />
            <div className="button-container">
              <button className="button" onClick={() => signIn(email, password)}>Inloggen</button>
              <button className="button" onClick={googleSignIn}>Inloggen met Google</button>
            </div>
          </div>
          <div className="login-card">
            <h1>Account aanmaken</h1>
            <input className="input-info" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input className="input-info" type="password" placeholder="Wachtwoord" onChange={(e) => setPassword(e.target.value)} required />
            <div className="button-container">
              <button className="button" onClick={() => signUp(email, password)}>Maak account aan</button>
              <button className="button" onClick={googleSignIn}>Maak account aan met Google</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="heading">
          <h1>Welkom {user.displayName ? user.displayName : user.email}!</h1>
          <Link to="/producten"><button>Shop now</button></Link>
          <img className="image" alt="hond" src={process.env.PUBLIC_URL + "/images/inlog-image.png"} />
        </div>
      )}
    </Wrapper>

  )
}

const Wrapper = styled.div`
min-height: 100vh;

.heading {
  display: flex;
  flex-direction: column;
  color: #34556d;
  margin: auto;
  align-items: center;

  button {
    width: 6rem;
    height: 3rem;
    font-size: 1rem;
    margin-bottom: 1rem;
    border-style: none;
    border-radius: 0.5rem;
  }
}

.image {
  width: 26rem;
  jusitfy-self: flex-end;
}

.login-container {
  display: flex;
  width: 48rem;
  margin: 3rem auto 0 auto;
  justify-content: space-between;
}

.login-card {
  display: flex;
  flex-direction: column;
  width: 19rem;
  height: 14rem;
  padding: 0 1rem 0 1rem;
  background-color: #49abcc;
  border-radius: 0.8rem;

  h1 {
    color: white;
  }

button {
  background-color: white;
  color: black;
  width: 8rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: none;
  margin: 6px auto;
}
}

.button-container {
  display: flex;
  margin-top: 0.8rem;
}

input {
  margin: 0.2rem;
}

@media only screen and (max-width: 750px) {
padding-bottom: 9rem;

.login-container {
  width: 100%;
  padding-bottom: 10rem;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.login-card {
  margin-bottom: 2rem;
}

}
`
