// App.jsx
import "./App.css";
import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { FAQ } from "./components/FAQ";
import ReviewCarousel from "./components/Review";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import PackagesPage from "./components/PackagesPage "; // fixed import (no trailing space)
import Booking from "./components/Booking"; // <-- make sure Booking.jsx exists at this path

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Main Home Page */}
        <Route
          path="/"
          element={
            <div className={`app ${isLoaded ? "loaded" : ""}`}>
              <Navbar />
              <Hero />
              <Projects />
              <FAQ />
              <Contact />
              <ReviewCarousel />

              <motion.footer
                className="footer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p> &copy; Inspired by PedroTech.</p>
              </motion.footer>

              {/* Floating Book Now Button */}
              <a href="/booking" className="floating-arrow">
                <motion.span
                  initial={{ y: 0 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Book Now
                </motion.span>
              </a>
            </div>
          }
        />

        {/* Booking page (client-side route) */}
        <Route path="/booking" element={<Booking />} />

        {/* Privacy Policy Page */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Packages Page */}
        <Route path="/packages" element={<PackagesPage />} />

        {/* Fallback (dev-friendly) */}
        <Route path="*" element={<div style={{ padding: 40 }}>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
