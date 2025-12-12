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
          At CaliforniaMoversExpress, your privacy is very important to us. We collect 
          personal information such as your name, email, phone number, and details 
          you provide when booking our moving services. We use this information to 
          provide and improve our services, communicate with you, and ensure a safe 
          and reliable experience.
        </p>

        <p>
          We take appropriate measures to protect your information and do not share it 
          with third parties except as needed to fulfill our services or comply with 
          legal requirements. By using our services, you consent to this Privacy Policy. 
          You can contact us to access, update, or delete your personal information at 
          any time.
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
