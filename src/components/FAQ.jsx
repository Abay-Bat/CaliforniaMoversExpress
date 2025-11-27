import { motion } from "framer-motion";
import { useState } from "react";

const faqData = [
  {
    question: "What services do Like Movers in San Diego offer?",
    answer:
      "We provide packing, local moving, residential moving, furniture disassembly, and storage options.",
  },
  {
    question: "Are Like Movers licensed and insured?",
    answer:
      "Yes. We are fully licensed and insured to ensure safe and secure moving services.",
  },
  {
    question: "What areas do you serve besides San Diego?",
    answer:
      "We serve Chula Vista, La Jolla, Oceanside, Carlsbad, and surrounding cities.",
  },
  {
    question: "Do you provide long-distance moving?",
    answer:
      "Yes, we provide both long-distance and local relocations anywhere in California.",
  },
];

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
      className="faq"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        FAQ
      </motion.h2>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span className="arrow">{activeIndex === index ? "-" : "+"}</span>
            </button>

            <motion.div
              className="faq-answer"
              initial={{ height: 0, opacity: 0 }}
              animate={
                activeIndex === index
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.4 }}
            >
              <p>{item.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
