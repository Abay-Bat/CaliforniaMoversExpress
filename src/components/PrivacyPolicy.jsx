import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css"; // or a separate CSS file

export const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      {/* <Navbar /> */}

      <motion.section
        className="privacy-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Privacy Policy</h1>

        <p>
          Welcome to our Privacy Policy page. Here we explain how we collect,
          use, and protect your data. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla nec purus euismod, gravida est at, cursus
          massa. 
        </p>

        <p>
          By using our services, you agree to our rules and conditions. Message
          and data rates may apply. You can unsubscribe at any time.
        </p>

        <Link to="/">
          <motion.button
            className="back-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>
        </Link>
      </motion.section>
    </div>
  );
};
