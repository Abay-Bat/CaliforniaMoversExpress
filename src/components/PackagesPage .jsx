// src/components/PackagesPage.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../App.css"; // adjust if you have a separate CSS for this page

const packages = [
  {
    title: "2 Movers and a Truck",
    description: "Studio, 1-bedroom House/Apartment/Condo, Small office, Few items",
    pricing: "$95 cash / $105 card / Hourly",
    extra: "16-feet truck, hand trucks, 4-wheel dolly, speed pack, wardrobe boxes, stretch wrap, tapes, furniture pads. 3-Hour Minimum, Double Drive Time",
  },
  {
    title: "3 Movers and a Truck",
    description: "2-bedroom House/Apartment/Condo, office",
    pricing: "$135 cash / $145 card / Hourly",
    extra: "26-feet truck, hand trucks, 4-wheel dolly, speed pack, wardrobe boxes, stretch wrap, tapes, furniture pads. 3-Hour Minimum, Double Drive Time",
  },
  {
    title: "4 Movers and a Truck",
    description: "3-Bedroom and more House/Apartment/Condo, Medium office",
    pricing: "$175 cash / $185 card / Hourly",
    extra: "26-feet truck, hand trucks, 4-wheel dolly, speed pack, wardrobe boxes, stretch wrap, tapes, furniture pads. 3-Hour Minimum, Double Drive Time",
  },
  {
    title: "4 Movers and 2 Trucks",
    description: "4-bedroom and more House/Apartment/Condo, large office",
    pricing: "$190 cash / $210 card / Hourly",
    extra: "2x26-feet trucks, hand trucks, 4-wheel dolly, speed pack, wardrobe boxes, stretch wrap, tapes, furniture pads. 3-Hour Minimum, Double Drive Time",
  },
  {
    title: "In-State Moving",
    description: "San Diego ⇾ San Francisco. Studio, 1-bedroom House/Apartment/Condo, Small office, Few items",
    pricing: "$2500 - $3000 Flat Rate",
    extra: "26-feet truck, hand trucks, 4-wheel dolly, speed pack, wardrobe boxes, stretch wrap, tapes, furniture pads. 3-Hour Minimum, Double Drive Time",
  },
  {
    title: "Furniture Delivery",
    description: "Few items, furniture delivery",
    pricing: "$250 - $350 Flat Rate",
    extra: "26-feet truck, hand trucks, 4-wheel dolly, speed pack, wardrobe boxes, stretch wrap, tapes, furniture pads. Double Drive Time",
  },
];

const PackagesPage = () => {
  return (
    <div className="packages-page">
      <motion.section
        className="packages-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back to Home button */}
        <Link to="/">
          <motion.button
            className="back-home-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>
        </Link>

        {/* Packages grid */}
        <div className="project-grid">
         {packages.map((pkg, index) => (
  <Link
    to="/booking"
    key={index}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <motion.div className="project-card">
      <h3>{pkg.title}</h3>
      <p>{pkg.description}</p>
      <div className="project-tech">
        <span>{pkg.pricing}</span>
      </div>
      <p className="pkg-extra">{pkg.extra}</p>
    </motion.div>
  </Link>
))}
        </div>
      </motion.section>
    </div>
  );
};

export default PackagesPage;
