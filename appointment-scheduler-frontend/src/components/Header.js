import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <h1>MedLife</h1>
                </div>
                <div className="tagline">
                    <p>We care for better lives</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
