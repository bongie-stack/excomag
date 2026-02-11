import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer bg-primary-dark">
            <div className="container footer-content">
                <div className="footer-col about-col">
                    <h3 className="footer-logo">Beacon of Life <span className="text-highlight">Institute</span></h3>
                    <p className="footer-desc">Nurturing minds, building futures. A Christian-based education center committed to excellence.</p>
                    <div className="social-links">
                        <a href="#" className="social-icon"><Facebook size={20} /></a>
                        <a href="#" className="social-icon"><Instagram size={20} /></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Contact Information</h4>
                    <ul className="contact-list">
                        <li>
                            <MapPin size={18} className="contact-icon" />
                            <span>29 Fort Street, Bulawayo</span>
                        </li>
                        <li>
                            <Phone size={18} className="contact-icon" />
                            <span>0292888066</span>
                        </li>
                        <li>
                            <Mail size={18} className="contact-icon" />
                            <span>Beaconlife907@gmail.com</span>
                        </li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <div className="footer-links-row">
                        <ul className="footer-links">
                            <li><Link to="/">Primary School</Link></li>
                            <li><Link to="/admissions">Admissions</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container flex-center">
                    <p>&copy; {new Date().getFullYear()} Beacon of Life Institute. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
