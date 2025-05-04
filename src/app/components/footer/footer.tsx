import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Subscription Section */}
      <div className={styles.subscribeSection}>
        <p className={styles.subscribeText}>Stay in the loop with exclusive deals & offers!</p>
        <div className={styles.inputGroup}>
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Footer Links */}
      <div className={styles.linkSection}>
        <div className={styles.column}>
          <h4>Get to Know Us</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Amazon Science</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Connect with Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell on Amazon</li>
            <li>Affiliate Program</li>
            <li>Advertise Your Products</li>
            <li>Fulfilment by Amazon</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Let Us Help You</h4>
          <ul>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>Help</li>
            <li>Amazon App Download</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© 2025 Amazon Clone. Built for educational purposes.</p>
      </div>
    </footer>
  );
};

export default Footer;
