import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import './Landing.css';

import hero1 from '../assets/hero_1.jpg';
import hero2 from '../assets/hero_2.jpg';
import hero3 from '../assets/hero_3.jpg';
import hero4 from '../assets/hero_4.jpg';

const heroImages = [hero1, hero2, hero3, hero4];

export default function Landing() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="landing-page">
            <div className="hero-section">
                <div className="hero-slideshow">
                    {heroImages.map((img, index) => (
                        <div
                            key={index}
                            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}
                    <div className="hero-overlay"></div>
                </div>

                <div className="container hero-content">
                    <h1>Welcome to <span className="text-gradient">Beacon of Life Institute</span></h1>
                    <p className="hero-subtitle">Nurturing Excellence, Inspiring Futures.</p>
                </div>
            </div>

            <div className="split-selection container" style={{ justifyContent: 'center' }}>
                <Link to="/primary" className="selection-card primary-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="card-content">
                        <BookOpen size={48} className="card-icon" />
                        <h2>Primary School</h2>
                        <p>Building strong foundations for lifelong learning.</p>
                        <span className="card-link">Enter Primary <ArrowRight size={16} /></span>
                    </div>
                    <div className="card-bg primary-bg"></div>
                </Link>
            </div>
        </div>
    );
}
