import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="home-wrapper">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-left">MyApp</div>
        <nav className="navbar-center">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="navbar-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-name">Profile ▾</div>
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Sign out</button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="hero">
        <div className="hero-content">
          <h1>Free and open</h1>
          <h2>stock market and financial education</h2>
          <p>
            A structured, easy-to-follow path to help you understand markets.
            Modules and tests available — no ads, no signup required.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigate("/modules")}>Modules</button>
            <button className="btn btn-outline" onClick={() => navigate("/tests")}>Tests</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://zerodha.com/varsity/img/hero.svg"
            alt="Hero"
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
