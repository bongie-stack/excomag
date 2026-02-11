import React from 'react';
import { FileText, ClipboardCheck, BookOpen, UserCheck, MapPin } from 'lucide-react';
import './Requirements.css';

export default function Requirements() {
    return (
        <div className="requirements-page">
            <section className="requirements-hero">
                <div className="container">
                    <h1>Enrolment <span className="text-highlight">Requirements</span></h1>
                    <p className="hero-subtitle">Everything you need to begin your journey at Beacon of Life Institute.</p>
                </div>
            </section>

            <section className="requirements-content section-padding">
                <div className="container">
                    <div className="requirements-grid-page">
                        <div className="req-card">
                            <div className="req-icon-box">
                                <FileText size={32} />
                            </div>
                            <h3>Official Documents</h3>
                            <ul className="req-list">
                                <li>Birth Certificate (Original & Copy)</li>
                                <li>Grade 7 Certificate / Latest School Report</li>
                                <li>Transfer Letter from previous school</li>
                                <li>Completed Registration Form</li>
                            </ul>
                        </div>

                        <div className="req-card">
                            <div className="req-icon-box">
                                <UserCheck size={32} />
                            </div>
                            <h3>Sponsor Information</h3>
                            <ul className="req-list">
                                <li>National ID copy of Sponsor/Parent</li>
                                <li>Proof of Residence (Water/Electricity bill)</li>
                                <li>Contact details for emergency notification</li>
                            </ul>
                        </div>

                        <div className="req-card">
                            <div className="req-icon-box">
                                <ClipboardCheck size={32} />
                            </div>
                            <h3>School Essentials</h3>
                            <ul className="req-list">
                                <li>1 Ream of Bond Paper (per term)</li>
                                <li>4 Rolls of tissue paper (per term)</li>
                                <li>Board markers (Black/Blue)</li>
                                <li>Flat File for documentation</li>
                            </ul>
                        </div>
                    </div>

                    <div className="assessment-banner glass-panel">
                        <div className="banner-text">
                            <h2>Important: Entrance Assessment</h2>
                            <p>All new students are required to undergo a basic assessment to help us understand their learning needs and ensure proper placement.</p>
                        </div>
                        <a href="https://wa.me/263786757073" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book Assessment</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
