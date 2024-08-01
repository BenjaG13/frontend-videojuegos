import React from 'react';

const NavbarComponent = () => {
  return (
    <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <div className="collapse navbar-collapse" >
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="/">
                    Dashboard
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/generos">
                    Generos
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/plataformas">
                    Plataformas
                </a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    </div>
    
  );
};

export default NavbarComponent;
