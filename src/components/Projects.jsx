import { motion } from "framer-motion";
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

const services = [
  {
    title: "Local Moving",
    desc: "Fast and reliable moving services within your city. Perfect for apartments, homes, and small offices.",
    price: "Learn More",
    image: "/projects/1.jpg",
    link: "/booking",
  },
  {
    title: "Residential Moving",
    desc: "Smooth and stress-free home moving services with careful handling of your valuables and furniture.",
    price: "Learn More",
    image: "/projects/2.jpg",
    link: "/booking",
  },
  {
    title: "Storage Solutions",
    desc: "Safe and secure short-term and long-term storage options for your belongings and furniture.",
    price: "Learn More",
    image: "/projects/3.jpg",
    link: "/booking",
  },
  {
    title: "Furniture Delivery",
    desc: "Fast and careful delivery of furniture from stores, warehouses, and private sellers.",
    price: "Learn More",
    image: "/projects/4.jpg",
    link: "/booking",
  },
  {
    title: "In-state Moving",
    desc: "Reliable moving services across the state with full protection and professional handling.",
    price: "Learn More",
    image: "/projects/5.jpg",
    link: "/booking",
  },
  {
    title: "Packing and Unpacking",
    desc: "Professional packing and unpacking services using high-quality protective materials.",
    price: "Learn More",
    image: "/projects/6.jpg",
    link: "/booking",
  },
  {
    title: "Office Moving",
    desc: "Efficient office relocation services with minimal downtime and organized equipment handling.",
    price: "Learn More",
    image: "/projects/7.jpg",
    link: "/booking",
  },
  {
    title: "Heavy Item Lifting",
    desc: "Specialized moving for pianos, safes, appliances, and other heavy or oversized items.",
    price: "Learn More",
    image: "/projects/8.jpg",
    link: "/booking",
  },
];

export const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
        Services
      </motion.h2>

      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <Link
            to={service.link}
            key={index}
            className="project-card-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <motion.div
              className="project-card"
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="project-image"
                style={{ backgroundImage: `url('${service.image}')` }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              />
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="project-tech">
                <span>{service.price}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.section>
  );
};
