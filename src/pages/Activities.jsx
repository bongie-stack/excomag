import React from 'react';
import { Trophy, Music, Palette, Users, Shirt, Star } from 'lucide-react';
import './Activities.css';

export default function Activities() {
    const sports = [
        { name: 'Ball Games', description: 'Soccer, Netball, and Volleyball training.' },
        { name: 'Athletics', description: 'Track and field events for all ages.' },
        { name: 'Swimming', description: 'Developmental swimming in our school facility.' },
        { name: 'Chess & Darts', description: 'Mind sports to encourage strategic thinking.' }
    ];

    const clubs = [
        { name: 'Music & Choir', description: 'Nurturing vocal and instrumental talents.' },
        { name: 'Art & Design', description: 'Creative expression through various media.' },
        { name: 'Public Speaking', description: 'Building confidence and communication skills.' }
    ];

    return (
        <div className="activities-page">
            <section className="activities-hero">
                <div className="container">
                    <h1>Extra-Curricular <span className="text-highlight">Activities</span></h1>
                    <p className="hero-subtitle">Developing holistic leaders through sports, arts, and culture.</p>
                </div>
            </section>

            <section className="sports-section section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <Trophy size={48} className="text-highlight mb-3" />
                        <h2 className="section-title">Sporting Excellence</h2>
                        <div className="title-underline"></div>
                    </div>

                    <div className="activities-grid">
                        {sports.map((sport, index) => (
                            <div key={index} className="activity-card">
                                <h3>{sport.name}</h3>
                                <p>{sport.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="clubs-section section-padding bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <Palette size={48} className="text-highlight mb-3" />
                        <h2 className="section-title">Clubs & Culture</h2>
                        <div className="title-underline"></div>
                    </div>

                    <div className="activities-grid">
                        {clubs.map((club, index) => (
                            <div key={index} className="activity-card white-bg">
                                <h3>{club.name}</h3>
                                <p>{club.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="uniform-section section-padding">
                <div className="container">
                    <div className="glass-panel uniform-showcase">
                        <div className="uniform-text">
                            <Shirt size={48} className="text-highlight mb-3" />
                            <h2>School Uniform</h2>
                            <p>Our uniform represents pride and belonging. All students are required to wear the full school uniform as specified by the institute.</p>
                            <ul className="uniform-list">
                                <li>Formal blazer with school badge</li>
                                <li>White shirt/blouse & school tie</li>
                                <li>Grey trousers / School skirt</li>
                                <li>Sports tracksuits & T-shirts</li>
                                <li>School jersey & headwear</li>
                            </ul>
                        </div>
                        <div className="uniform-image-placeholder">
                            <Star size={100} color="var(--color-brand-secondary)" strokeWidth={1} />
                            <p>Beacon of Life Pride</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
