import React from 'react';
import logo from '../assets/logo.jpg';

const HeaderComponent = () => {
  return (
    <div className="container d-flex justify-content-center align-items-start bg-custom-blue">
    <header className="navbar navbar-dark ">
      
        <a className="navbar-brand logo-img" href="/">
          <img src={logo} alt="Logo" />
        </a>
      
    </header>
    </div>
  );
};

export default HeaderComponent;
