import React from 'react';
import { User, GraduationCap, Heart, Star } from 'lucide-react';
import './OurStaff.css';

const staffMembers = [
    {
        name: 'Mr. J Nkomo',
        role: 'Director',
        description: 'Visionary leader dedicated to providing holistic education and nurturing future leaders.',
        icon: <Star size={40} />,
        image: null // I will use icons if no images are provided
    },
    {
        name: 'Pastor G. Gumpo',
        role: 'Chaplain',
        description: 'Guiding the spiritual growth and moral development of our students and staff.',
        icon: <Heart size={40} />,
        image: null
    },
    {
        name: 'Mrs. S. Ncube',
        role: 'Senior Teacher',
        description: 'Expert in primary education with over 15 years of experience in Cambridge curriculum.',
        icon: <GraduationCap size={40} />,
        image: null
    },
    {
        name: 'Mr. L. Sibanda',
        role: 'Sports Director & Teacher',
        description: 'Passionate about physical education and developing teamwork skills through sports.',
        icon: <User size={40} />,
        image: null
    },
    {
        name: 'Ms. R. Dube',
        role: 'Arts & Music Teacher',
        description: 'Inspiring creativity and artistic expression in our young learners.',
        icon: <User size={40} />,
        image: null
    }
];

export default function OurStaff() {
    return (
        <div className="our-staff-page">
            <section className="staff-hero">
                <div className="container">
                    <h1>Meet <span className="text-highlight">Our Staff</span></h1>
                    <p className="hero-subtitle">The dedicated professionals shaping the future of our students.</p>
                </div>
            </section>

            <section className="staff-grid-section section-padding">
                <div className="container">
                    <div className="staff-grid">
                        {staffMembers.map((member, index) => (
                            <div key={index} className="staff-card">
                                <div className="staff-image-container">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="staff-img" />
                                    ) : (
                                        <div className="staff-placeholder">
                                            {member.icon}
                                        </div>
                                    )}
                                </div>
                                <div className="staff-info">
                                    <h3 className="staff-name">{member.name}</h3>
                                    <p className="staff-role">{member.role}</p>
                                    <div className="staff-divider"></div>
                                    <p className="staff-description">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="philosophy-section section-padding bg-light">
                <div className="container">
                    <div className="philosophy-content text-center">
                        <h2 className="section-title">Our Teaching Philosophy</h2>
                        <div className="title-underline"></div>
                        <p className="philosophy-text">
                            At Beacon of Life Institute, our staff is committed to fostering an environment where
                            every child feels valued, challenged, and inspired. We believe in academic excellence
                            balanced with character development and spiritual growth.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
