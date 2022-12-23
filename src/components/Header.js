import React from 'react';
import "./Header.css"

export default function Header({ isSigned }) {
  const signed = (isSignedIn) => {
    if (isSignedIn) {
      return (
        <ul className="ul-config">
          <li><a className="remove-nav-window" href="/" onClick={ () => localStorage.clear() }>Logout</a></li>
        </ul>
      );
    } else {
      return (
        <ul className="ul-config">
          <li><a className="remove-nav-window" href="/login">Login</a></li>
          <li><a className="remove-nav-window" href="/signup">Signup</a></li>
        </ul>
      );
    }
  }
  return (
    <nav className="main-nav">
      <a href="/">OKR Project</a>
      {signed(isSigned)}
    </nav>
  );
}
