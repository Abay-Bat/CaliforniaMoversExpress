import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Link } from "react-router-dom";
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: "",
    });

    try {
     await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  message: `
    Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.phone}
  `,
  from_name: formData.name,
  reply_to: formData.email
}
,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY   // ← REQUIRED
);

// Prepare the message for auto-reply
const userMessage = `
Hi ${formData.name},

Thank you for contacting California Movers Express. We have received your message and will get back to you shortly.

Here’s what you sent us:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
`;

await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID_RECEIVER, // auto-reply template
  {
    name: formData.name,
    email: formData.email,  // must match {{email}} in template
    message: userMessage,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);

      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: "Message sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <motion.section
      id="contacts"
      className="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 variants={fadeInUp} initial="initial" animate="animate" viewport={{ once: true }}>
        Let Us Reach Out !
      </motion.h2>

      <motion.div className="contact-content" variants={fadeInUp}>
        <motion.form className="contact-form" onSubmit={handleSubmit}>
          <motion.input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
            whileFocus={{ scale: 1.02 }}
            onChange={handleInputChange}
          />

          <motion.input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            whileFocus={{ scale: 1.02 }}
            onChange={handleInputChange}
          />

          <motion.input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            whileFocus={{ scale: 1.02 }}
            onChange={handleInputChange}
          />

          <motion.button
            className="submit-btn"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={formStatus.submitting}
          >
            {formStatus.submitting ? "Sending..." : "Send Message"}
          </motion.button>

         <Link to="/privacy-policy">
  <motion.button
    className="privacy-btn"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Privacy Policy
  </motion.button>
</Link>

          <p className="sms-consent">
            By submitting this form, you agree to receive SMS notifications from San Diego Packing Movers regarding your moving quote and updates and accept the Conditions of Use and Privacy Notice. Message and data rates may apply. Reply STOP to unsubscribe at any time.
          </p>

          {formStatus.message && (
            <motion.div className={`form-status ${formStatus.success ? "success" : "error"}`}>
              {formStatus.message}
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </motion.section>
  );
};
