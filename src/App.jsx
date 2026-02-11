import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import Primary from './pages/Primary'
import Admissions from './pages/Admissions'
import Contact from './pages/Contact'
import OurStaff from './pages/OurStaff'
import Requirements from './pages/Requirements'
import Activities from './pages/Activities'


import ScrollToTop from './components/ScrollToTop'

function App() {
    return (
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <ScrollToTop />
            <Header />
            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Primary />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/our-staff" element={<OurStaff />} />
                    <Route path="/requirements" element={<Requirements />} />
                    <Route path="/activities" element={<Activities />} />
                </Routes>
            </main>
            <Footer />
        </div >
    )
}

export default App
