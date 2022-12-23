import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import "./Login.css";

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [hideError, setHideError] = useState(true)
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const handleValidation = () => {
      const FIELD_LENGTH = 6;
      if (password.length < FIELD_LENGTH || user.length < FIELD_LENGTH) {
        return setButtonDisabled(true);
      }
      return setButtonDisabled(false);
    };
    handleValidation();
  }, [user, password, hideError]);

  const handleChange = async (func, { target: { value } }) => {
    func(value);
  };

  const handleClick = async () => {
    let result = await fetch('http://localhost:9000/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ username: user, password }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    })
    if (result.status === 200) {
      let token = await result.json()
      localStorage.setItem("token", JSON.stringify(token.token))
      setHideError(!hideError)
    } else {
      setHideError(false)
    }
  };

  if (localStorage.getItem("token")) {
    return <Navigate to="/1" />
  }

  return (
    <div>
      <Header isSigned={ false } />
      <div className='login-body'>
        <div className='login-forms'>
          <h1>Login</h1>
          <div className='login-inputs'>
            <input
              type="user"
              placeholder="Username"
              onChange={(e) => handleChange(setUser, e)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(setPassword, e)}
            />
            <p hidden={hideError}>Username or Password not found!</p>
            <button
              type="button"
              disabled={buttonDisabled}
              onClick={handleClick}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
