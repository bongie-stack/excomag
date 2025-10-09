import { Mail, MapPin, Phone, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/excomag-logo.png";
import NewsletterSubscribe from "./NewsletterSubscribe";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="mb-12">
          <NewsletterSubscribe />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <img 
              src={logo} 
              alt="ExcoMag Africa" 
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <img 
              src={logo} 
              alt="ExcoMag Africa Icon" 
              className="h-20 w-auto mb-4"
            />
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Africa's premier virtual incubation hub, connecting entrepreneurs, 
              innovators, and investors across the continent.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://zw.linkedin.com/company/exhibitors-corner" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://x.com/excomag01" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </a>
              <a 
                href="https://www.facebook.com/exhibitorscorner/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/excomag/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#articles" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Articles
                </a>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">
                  info@excomag.africa
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">
                  +27 (0) 123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">
                  Johannesburg, South Africa
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} ExcoMag Africa. All rights reserved. Site by Bonginkosi Masundulwani
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;