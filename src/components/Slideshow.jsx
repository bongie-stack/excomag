import React, { useState, useEffect } from 'react';
import './Slideshow.css';

import hero1 from '../assets/hero_1.jpg';
import hero2 from '../assets/hero_2.jpg';
import hero3 from '../assets/hero_3.jpg';
import hero4 from '../assets/hero_4.jpg';

const heroImages = [hero1, hero2, hero3, hero4];

export default function Slideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="slideshow-container">
            <div className="slideshow-inner">
                {heroImages.map((img, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
                <div className="slideshow-overlay"></div>
                <div className="slideshow-content">
                    <h3>Experience Our Excellence</h3>
                    <p>A glimpse into life at Beacon of Life Institute</p>
                </div>
            </div>
        </div>
    );
}
