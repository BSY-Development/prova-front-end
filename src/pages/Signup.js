import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import "./Signup.css"

function Signup() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [hideError, setHideError] = useState(true)

  useEffect(() => {
    const handleValidation = () => {
      const FIELD_LENGTH = 6;
      if (password.length < FIELD_LENGTH || user.length < FIELD_LENGTH) {
        return setButtonDisabled(true);
      }
      return setButtonDisabled(false);
    };
    handleValidation();
  }, [user, password]);

  const handleChange = async (func, { target: { value } }) => {
    func(value);
  };

  const handleClick = async () => {
    let result = await fetch('http://localhost:9000/signup', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ username: user, password }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    })
    if (result.status === 200) {
      setShouldRedirect(true)
    } else if (result.status === 409) {
      setHideError(false)
    }
  };

  if (shouldRedirect) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <Header isSigned={ false } />
      <div className='sign-body'>
        <div className='sign-forms'>
          <h1>Cadastro</h1>
          <div className='sign-inputs'>
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
            <p hidden={hideError}>Username already registered!</p>
            <button
              type="button"
              disabled={buttonDisabled}
              onClick={handleClick}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
