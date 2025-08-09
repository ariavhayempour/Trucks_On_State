import { Truck, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "wouter";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="footer-background">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="brand-section">
            <h3 className="brand-title">
              <Truck className="brand-icon" />
              Trucks on State
            </h3>
            <div className="social-links">
              <a href="#" className="social-link">
                <FaFacebook className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <FaTwitter className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <FaInstagram className="social-icon" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="navigation-title">Quick Links</h4>
            <ul className="navigation-list">
              <li>
                <Link href="/">
                  <span className="navigation-link">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('trucks')}
                  className="navigation-button"
                >
                  Food Trucks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="navigation-button"
                >
                  About
                </button>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="footer-bottom">
          <p className="copyright-text">&copy; 2024 Trucks on State. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
