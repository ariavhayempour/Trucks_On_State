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
            <div className="social-media-container">
              <a href="#" className="facebook-link">
                <FaFacebook className="facebook-icon" />
              </a>
              <a href="#" className="twitter-link">
                <FaTwitter className="twitter-icon" />
              </a>
              <a href="#" className="instagram-link">
                <FaInstagram className="instagram-icon" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="quick-links-title">Quick Links</h4>
            <ul className="quick-links-list">
              <li>
                <Link href="/">
                  <span className="home-link">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('trucks')}
                  className="food-trucks-button"
                >
                  Food Trucks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="about-button"
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
