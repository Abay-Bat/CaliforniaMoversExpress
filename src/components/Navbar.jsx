import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // scrolling UP → show
      if (currentScroll < lastScrollYRef.current) {
        setShowNav(true);
      }
      // scrolling DOWN → hide (only after scrolled 100px)
      else if (currentScroll > lastScrollYRef.current && currentScroll > 100) {
        setShowNav(false);
      }

      lastScrollYRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // run once

  return (
    <motion.nav
      className="navbar"
      animate={{ y: showNav ? 0 : -120 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* LOGO - using anchor for hash link; change to Link if you need route navigation */}
      <motion.a
        href="#home"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Home"
      >
        <motion.img
          src="/logo.png"
          alt="MEREI&co Logo"
          className="logo"
          style={{ cursor: "pointer" }}
        />
      </motion.a>

      {/* HAMBURGER */}
      <button
        className="hamburger"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span className={open ? "line open" : "line"}></span>
        <span className={open ? "line open" : "line"}></span>
        <span className={open ? "line open" : "line"}></span>
      </button>

      {/* DESKTOP LINKS */}
      <motion.ul
        className="nav-links"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.li variants={fadeInUp} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <a href="#contacts">Assist</a>
        </motion.li>

        <motion.li variants={fadeInUp} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <a href="#projects">Moving Services</a>
        </motion.li>

        {/* internal route: use Link */}
        <motion.li variants={fadeInUp} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/packages">Pricing Packages</Link>
        </motion.li>

        <motion.li variants={fadeInUp} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <a href="#faq">FAQ</a>
        </motion.li>

        <motion.li
          className="contact-item"
          variants={fadeInUp}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.a href="tel:+16199299398" className="phone-cta">
            📞 +1 619 929 9398
          </motion.a>
        </motion.li>

        {/* Book Now */}
        <motion.li variants={fadeInUp} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/booking">Book Now</Link>
        </motion.li>
      </motion.ul>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <a href="#contacts" onClick={() => setOpen(false)}>Assist</a>
          <a href="#projects" onClick={() => setOpen(false)}>Services</a>
          <Link to="/packages" onClick={() => setOpen(false)}>Packages</Link>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          <Link to="/booking" onClick={() => setOpen(false)}>Book Now</Link>

          <div className="mobile-contact">
            <a href="tel:+16199299398" onClick={() => setOpen(false)}>📞 +1 619 929 9398</a>
            <a href="mailto:movewithcme@gmail.com" onClick={() => setOpen(false)}>
              ✉️ movewithcme@gmail.com
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
