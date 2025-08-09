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
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Truck className="w-6 h-6 mr-2" />
              Trucks on State
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('trucks')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Food Trucks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  About
                </button>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 Trucks on State. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
