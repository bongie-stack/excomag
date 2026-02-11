import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import './Admissions.css';

export default function Admissions() {
    return (
        <div className="admissions-page">
            <section className="admissions-hero">
                <div className="container">
                    <h1>Join Our <span className="text-secondary">Community</span></h1>
                    <p className="hero-subtitle">We are delighted that you are considering Beacon of Life Institute for your child's education.</p>
                </div>
            </section>

            <section className="admissions-process section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Enrolment Process</h2>
                        <div className="title-underline"></div>
                    </div>

                    <div className="process-steps">
                        <div className="step-item">
                            <div className="step-number">1</div>
                            <h3>Inquiry</h3>
                            <p>Contact our admissions office or visit the campus to learn about our programs and values.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">2</div>
                            <h3>Application</h3>
                            <p>Submit the completed registration form along with all necessary documentation.</p>
                            <Link to="/requirements" className="link-text">See Required Documents <ArrowRight size={14} /></Link>
                        </div>
                        <div className="step-item">
                            <div className="step-number">3</div>
                            <h3>Assessment</h3>
                            <p>Prospective students undergo a placement assessment to ensure they transition smoothly into our curriculum.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">4</div>
                            <h3>Acceptance</h3>
                            <p>Upon successful assessment and document verification, an offer of place will be issued.</p>
                        </div>
                    </div>

                    <div className="admissions-cta glass-panel p-5 mt-5">
                        <div className="cta-content">
                            <h2>Plan a Visit</h2>
                            <p>The best way to experience Beacon of Life is to see it in action. Open days and individual tours are available by appointment.</p>
                            <Link to="/contact" className="btn btn-primary mt-3">Book a Tour</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
