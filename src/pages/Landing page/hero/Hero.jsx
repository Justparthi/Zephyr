import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Create stunning email templates in <span className="highlight">minutes</span>, not hours
          </h1>
          <p className="hero-subtitle">
            The all-in-one platform that makes email design simple, fast, and accessible to everyone—no coding required.
          </p>
          <div className="hero-cta">
            <button className="primary-button">Start Building for Free</button>
            <button className="secondary-button">View Templates</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Templates</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">99%</span>
              <span className="stat-label">Delivery Rate</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="image-showcase">
            <div className="main-image">
              <img 
                src="https://imgs.search.brave.com/mbILlkTDinAHNrOwGL-DuqR-xfEcjbYy1tgTivcRDBY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naG9z/dC1pbWFnZXMuY2hh/bWFpbGVvbi5pby8y/MDI0LzA3L0Vzc2Vu/dGlhbC1UaXBzLWZv/ci1NYW5hZ2luZy1Z/b3VyLUVtYWlsLUNy/ZWF0aW9uLVdvcmtm/bG93LnBuZw" 
                alt="Business person using email marketing platform" 
                className="primary-image"
              />
            </div>
            <div className="secondary-image top-image">
              <img 
                src="https://imgs.search.brave.com/bIYlbABXFKyzpdgN1TXSDVtKiuU7aR5m8Io0U6n7Nn8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDgy/ODU5MDY1L3Bob3Rv/L2VsZWN0cm9uaWMt/bWFpbGJveC13aXRo/LWVudmVsb3Blcy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/MGE4RFhlS0d3VURz/eVdodnVvMzQ0c25m/U1dBLU5JQ1ZxNjZ5/eExlZ0FqUT0" 
                alt="Email template example" 
                className="overlay-image"
              />
            </div>
            <div className="secondary-image bottom-image">
              <img 
                src="https://imgs.search.brave.com/oChmrKG-SvCtbS6Hy3AAlg5jDusdBD7qisH74cub3pU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTI4/ODM4NjcvcGhvdG8v/YmxhY2stYW5kLWJs/dWUtZGlnaXRhbC1i/b2FyZC13aXRoLWUt/bWFpbC1pY29ucy1i/YWNrZ3JvdW5kLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz00/RlhBOUh4QVE5Rl9t/eGxlUkVxYUlXamd1/VUowVWk4SzFiMDBD/RkFYdFlVPQ" 
                alt="Analytics dashboard for email campaigns" 
                className="overlay-image"
              />
            </div>
          </div>
         
          
          <div className="background-gradient"></div>
        </div>
      </div>
      
      <div className="trusted-by">
        <p>Trusted by teams at</p>
        <div className="company-logos">
          <div className="company-logo">Acme Co.</div>
          <div className="company-logo">Globex</div>
          <div className="company-logo">Stark Inc.</div>
          <div className="company-logo">Initech</div>
          <div className="company-logo">Hooli</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;