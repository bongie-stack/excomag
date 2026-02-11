import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
    return (
        <div style={{ padding: '120px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact Us</h1>
            <div style={{ display: 'grid', gap: '2rem', padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MapPin size={24} color="#002147" />
                    <div>
                        <h3>Address</h3>
                        <p>29 Fort Street, Bulawayo</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Phone size={24} color="#002147" />
                    <div>
                        <h3>Phone</h3>
                        <p>0292888066</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Mail size={24} color="#002147" />
                    <div>
                        <h3>Email</h3>
                        <p>Beaconlife907@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
