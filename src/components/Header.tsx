import { Button } from "@/components/ui/button";
import { Menu, User, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/excomag-logo.png";
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface HeaderProps {
  onAdminLogin: () => void;
  currentUser?: SupabaseUser | null;
  onLogout?: () => void;
}

const Header = ({ onAdminLogin, currentUser, onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card card-shadow border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="ExcoMag Africa Logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-accent transition-colors">
              Home
            </a>
            <a href="#articles" className="text-foreground hover:text-accent transition-colors">
              Articles
            </a>
            <a href="#about" className="text-foreground hover:text-accent transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </a>
          </nav>

          {/* Authentication Buttons */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {currentUser.email}
                </span>
                <Button 
                  variant="outline" 
                  onClick={onAdminLogin}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Admin</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/auth">
                  <Button variant="outline">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={onAdminLogin}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Admin</span>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-accent">Home</a>
              <a href="#articles" className="text-foreground hover:text-accent">Articles</a>
              <a href="#about" className="text-foreground hover:text-accent">About</a>
              <a href="#contact" className="text-foreground hover:text-accent">Contact</a>
              
              {currentUser ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-muted-foreground">
                    {currentUser.email}
                  </span>
                  <Button onClick={onAdminLogin} variant="outline" className="w-fit">
                    <User className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                  <Button onClick={onLogout} variant="outline" className="w-fit">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/auth">
                    <Button variant="outline" className="w-fit">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Button onClick={onAdminLogin} variant="outline" className="w-fit">
                    <User className="h-4 w-4 mr-2" />
                    Admin Login
                  </Button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;