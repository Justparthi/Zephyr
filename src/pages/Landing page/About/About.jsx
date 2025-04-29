import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-header">
          <div className="about-header-line"></div>
          <h2 className="section-title">Our Story</h2>
          <div className="about-header-line"></div>
        </div>
        
        <div className="about-content">
          <div className="about-text-content">
            <h3 className="about-title">Revolutionizing <span className="highlight">email marketing</span> for everyone</h3>
            <p className="about-description">
              Founded in 2020, our platform was born from a simple observation: email marketing tools were either too complex or too limited. We set out to change that with an intuitive solution that puts design power back in your hands.
            </p>
            <div className="about-values">
              <div className="value-card">
                <div className="value-icon">💡</div>
                <h4 className="value-title">Innovation</h4>
                <p className="value-description">Constantly pushing boundaries to create tools that simplify complex processes.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h4 className="value-title">Accessibility</h4>
                <p className="value-description">Making professional email design accessible to businesses of all sizes.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🚀</div>
                <h4 className="value-title">Growth</h4>
                <p className="value-description">Helping our customers achieve measurable results through better engagement.</p>
              </div>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="about-image-container">
              <div className="about-image main-about-image">
                <img src="/api/placeholder/450/300" alt="Team working on email templates" />
                <div className="image-caption">Our design team collaborating</div>
              </div>
              <div className="floating-stat stat-one">
                <div className="stat-value">93%</div>
                <div className="stat-description">Customer satisfaction</div>
              </div>
              <div className="floating-stat stat-two">
                <div className="stat-value">5M+</div>
                <div className="stat-description">Emails sent monthly</div>
              </div>
              <div className="shape-decorator shape-one"></div>
              <div className="shape-decorator shape-two"></div>
            </div>
          </div>
        </div>
        
        <div className="team-section">
          <h3 className="team-title">Meet Our Leadership</h3>
          <div className="team-members">
            <div className="team-member">
              <div className="member-image">
                <div className="member-photo-placeholder"></div>
              </div>
              <h4 className="member-name">Alex Morgan</h4>
              <p className="member-role">Co-Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="member-photo-placeholder"></div>
              </div>
              <h4 className="member-name">Jordan Lee</h4>
              <p className="member-role">Co-Founder & CTO</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="member-photo-placeholder"></div>
              </div>
              <h4 className="member-name">Taylor Kim</h4>
              <p className="member-role">Head of Design</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="member-photo-placeholder"></div>
              </div>
              <h4 className="member-name">Casey Rivera</h4>
              <p className="member-role">Head of Customer Success</p>
            </div>
          </div>
        </div>
        
        <div className="cta-section">
          <div className="cta-content">
            <h3 className="cta-title">Ready to transform your email marketing?</h3>
            <p className="cta-description">Join thousands of businesses who have already improved their engagement rates.</p>
            <button className="primary-button">Get Started Today</button>
          </div>
          <div className="cta-decoration">
            <div className="pulse-circle"></div>
            <div className="cta-shape"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;