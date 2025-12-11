import { motion } from "framer-motion";
import truck from "../../public/truck.png";


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

export const Hero = () => {
  return (
    <motion.section
      id="home"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="hero-container">

        {/* LEFT SIDE CONTENT */}
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="hero-badge">
            <span> Welcome to</span>
          </motion.div>

          <motion.h1 className="glitch" variants={fadeInUp} whileHover={{ scale: 1.02 }}>
            California Movers Express
          </motion.h1>

          <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            San Diego’s Trusted Movers
          </motion.h2>

          <motion.p className="hero-description" variants={fadeInUp}>
            At California Movers Express, we believe that moving should be simple, stress-free, and affordable. Our team has over 4 years of hands-on moving experience in California, helping hundreds of families and businesses relocate with care and precision.  After years of working in the moving industry, we decided it was time to launch our own company, built on trust, professionalism, and customer-first service.  Whether you’re moving across town or to a neighboring city — our friendly, experienced movers are here to make your transition smooth and hassle-free.
          </motion.p>

          <motion.div className="cta-buttons" variants={staggerContainer}>
            <motion.a
              href="#projects"
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Offers
            </motion.a>

            <motion.a
              href="/booking"
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.a>
          </motion.div>

        <motion.div className="social-links" variants={staggerContainer}>
  <motion.a
    href="https://www.facebook.com/movewithcme?mibextid=wwXIfr&mibextid=wwXIfr"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-facebook"></i>
  </motion.a>

  <motion.a
    href="https://www.instagram.com/movewithcme?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-instagram"></i>
  </motion.a>

  <motion.a
    href="https://www.thumbtack.com/ca/san-diego/moving-companies/california-movers-express-llc/service/550296042678738954"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fas fa-truck"></i>
  </motion.a>
</motion.div>

        </motion.div>

        {/* RIGHT SIDE IMAGE (NOW CORRECTLY PLACED) */}
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div
            style={{
              marginTop: "20px",
              padding: "1.5rem",
              borderRadius: "20px",
              background: "rgba(30, 41, 59, 0.8)",
              backdropFilter: "blur(10px)",
              marginBottom: "50px",
            }}
          >
            <img
              src={truck}
              alt="Truck"
              style={{
                width: "100%",
                borderRadius: "25px",
                objectFit: "cover",
              }}
            />
          </div>

          <motion.div
            className="floating-card"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="card-content">
              <span className="card-icon">📦</span>
              <span className="card-text">
                Your belongings handled with respect and precision.
              </span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
};
