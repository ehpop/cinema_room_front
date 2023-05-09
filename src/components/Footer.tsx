import React from "react";
import "./styles/Footer.css";
import "@fortawesome/fontawesome-free/css/all.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h4>Contact</h4>
          <p>Email: example@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
        <div className="footer-info">
          <h4>Address</h4>
          <p>1234 Main Street</p>
          <p>City, State, Country</p>
        </div>
        <div className="footer-info">
          <h4>Social Media</h4>
          <p>Follow us on:</p>
          <div className="social-media-icons">
            <a href="https://www.facebook.com">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.twitter.com">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Fake Cinema INC. All rights not reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
