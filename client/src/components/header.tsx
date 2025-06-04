import { useState } from "react";
import { Link } from "wouter";
import { Truck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Truck className="h-6 w-6 text-black mr-2" />
                <h1 className="text-2xl font-bold text-black">
                  Trucks on State
                </h1>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-primary-700 hover:text-primary">
                  Home
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-primary"
                onClick={() => scrollToSection('trucks')}
              >
                Food Trucks
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-primary"
                onClick={() => scrollToSection('about')}
              >
                About
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-primary"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </Button>
            </div>
          </nav>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="text-primary-700 block w-full text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-primary block w-full text-left"
              onClick={() => scrollToSection('trucks')}
            >
              Food Trucks
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-primary block w-full text-left"
              onClick={() => scrollToSection('about')}
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-primary block w-full text-left"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
