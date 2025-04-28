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
                src="https://media.istockphoto.com/id/1559523525/photo/business-e-mail-communication-and-digital-marketing-businessman-holding-mobile-and-touching.jpg?s=2048x2048&w=is&k=20&c=YENswPaz0duzEp6mcSHgnMVarAQLW8dXQ-OmtLgTMS4=" 
                alt="Business person using email marketing on mobile device" 
                className="primary-image"
              />
            </div>
            <div className="secondary-image">
              <img 
                src="http://media.istockphoto.com/id/1401461127/photo/hand-of-businessman-using-smartphone-for-email-with-notification-alert.jpg?s=2048x2048&w=is&k=20&c=QfXjapMmC-0jjlDCZgHBDJqESCUgGmQOlQeHl4zwg_w=" 
                alt="Hand holding smartphone with email notification" 
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