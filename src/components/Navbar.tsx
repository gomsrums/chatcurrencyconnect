
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">ChatCurrencyConnect</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/" className="hover:text-accent transition-colors duration-200">
            Home
          </a>
          <a href="#converter" className="hover:text-accent transition-colors duration-200">
            Converter
          </a>
          <a href="#" className="hover:text-accent transition-colors duration-200">
            Crypto Insights
          </a>
          <a href="#" className="hover:text-accent transition-colors duration-200">
            Blockchain Explorer
          </a>
          <div className="ml-4 flex space-x-2">
            <Button variant="outline" className="border-white hover:bg-white hover:text-primary">
              Sign In
            </Button>
            <Button className="bg-secondary hover:bg-secondary/90">
              Sign Up
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-primary text-primary-foreground z-50 py-4 px-6 shadow-md">
          <div className="flex flex-col space-y-4">
            <a href="/" className="hover:text-accent transition-colors duration-200">
              Home
            </a>
            <a href="#converter" className="hover:text-accent transition-colors duration-200">
              Converter
            </a>
            <a href="#" className="hover:text-accent transition-colors duration-200">
              Crypto Insights
            </a>
            <a href="#" className="hover:text-accent transition-colors duration-200">
              Blockchain Explorer
            </a>
            <div className="flex flex-col space-y-2 mt-2">
              <Button variant="outline" className="border-white hover:bg-white hover:text-primary">
                Sign In
              </Button>
              <Button className="bg-secondary hover:bg-secondary/90">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
