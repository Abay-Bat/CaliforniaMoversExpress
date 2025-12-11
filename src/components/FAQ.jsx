import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqData = [
  {
    question: "What is the typical process for working with a new customer?",
    answer: `First, we discuss the move details over the phone/message — location, item list, and timing.
    
Then, we provide a clear upfront estimate with no hidden fees.

On moving day, we arrive on time, protect floors and furniture, complete the move efficiently, and review everything before finishing.`,
  },
  {
    question: "What should the customer know about your pricing (e.g., discounts, fees)?",
    answer: `We offer competitive hourly rates with no hidden fees.

We charge for actual working time only (minimum 3 hours).

• Discounts for seniors, students & military families
• Flat rates available for long-distance and specialty items`,
  },
  {
    question: "What should I think about before requesting a moving quote?",
    answer: `• Home size (how many bedrooms)
• Large or fragile items (piano, glass, heavy equipment)
• Whether you need packing services or transport-only
• Access difficulties (stairs, elevators, limited parking)
• Preferred moving date (for scheduling availability)`,
  },
  {
    question: "How does your pricing work?",
  answer: `The service fee covers everything needed for a smooth move:

• Truck (26 ft / 16 ft)
• Fuel, mileage, and tolls
• Full furniture protection
• Loading and unloading
• Packing and unpacking
• Assembly and disassembly
• Extra pick-ups or drop-offs (upon request)
• All materials (wrap, tape, blankets, wardrobe boxes)
• Stairs and long carries
• Insurance coverage

No cancellation fees, and we have a 3-hour minimum.

Double Drive Time (DDT):
California law requires all licensed moving companies to apply Double Drive Time — the driving time between your pick-up and drop-off locations is doubled by law for transparent billing.

California Movers Express is fully insured, bonded & licensed, focusing on honest, customer-first service.`,
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
        className="faq-title"
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
              <span className="arrow">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p style={{ whiteSpace: "pre-line" }}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
