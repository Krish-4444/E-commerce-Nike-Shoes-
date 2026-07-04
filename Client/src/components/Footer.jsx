import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Nike</h3>
          <p>
            Nike, Inc. is an American athletic footwear and apparel corporation headquartered near Beaverton, Oregon, United States.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <span>FB</span>
            <span>IG</span>
            <span>TW</span>
          </div>
        </div>
        
        <div className="footer-section">
          <p>&copy; 2025 Nike Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;