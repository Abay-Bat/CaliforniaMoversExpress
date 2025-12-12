// Booking.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  date: "",
  startWindow: "",
  movers: "2",
  serviceType: "",
  pickupAddress: "",
  pickupCity: "",
  pickupState: "",
  pickupZip: "",
  pickupApt: "",
  moveSize: "",
  moveType: "",
  furnishing: "",
  extraStops: "no",
  stops: [],
  dropoffAddress: "",
  dropoffCity: "",
  dropoffState: "",
  dropoffZip: "",
  dropoffApt: "",
  access: "",
  pianoFragile: "no",
  notes: "",
};

export default function Booking() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const change = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const addStop = () =>
    setForm((p) => ({
      ...p,
      stops: [...p.stops, { address: "", city: "", state: "", zip: "", apt: "" }],
    }));

  const updateStop = (idx, field, value) => {
    setForm((p) => ({
      ...p,
      stops: p.stops.map((s, i) => (i === idx ? { ...s, [field]: value } : s)),
    }));
  };

  const removeStop = (idx) =>
    setForm((p) => ({ ...p, stops: p.stops.filter((_, i) => i !== idx) }));

  const validateStep = (s = step) => {
    const e = {};
    if (s === 0) {
      if (!form.fullName.trim()) e.fullName = "Full name is required";
      if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email is required";
      if (!form.phone.trim() || form.phone.trim().length < 7) e.phone = "Phone is required";
    } else if (s === 1) {
      if (!form.date) e.date = "Date is required";
      if (!form.startWindow) e.startWindow = "Start window is required";
      if (!form.serviceType) e.serviceType = "Service type is required";
      if (!form.moveSize) e.moveSize = "Move size is required";
      if (!form.moveType) e.moveType = "Move type is required";
    } else if (s === 2) {
      ["pickupAddress", "pickupCity", "pickupState", "pickupZip"].forEach((f) => {
        if (!form[f]) e[f] = "Required";
      });
      ["dropoffAddress", "dropoffCity", "dropoffState", "dropoffZip"].forEach((f) => {
        if (!form[f]) e[f] = "Required";
      });
      if (form.extraStops === "yes") {
        form.stops.forEach((s, i) => {
          if (!s.address) e[`stop-${i}-address`] = "Address required";
          if (!s.city) e[`stop-${i}-city`] = "City required";
          if (!s.state) e[`stop-${i}-state`] = "State required";
          if (!s.zip) e[`stop-${i}-zip`] = "Zip required";
        });
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleComplete = async () => {
    if (![0, 1, 2].every((s) => validateStep(s))) {
      setStep(0);
      return;
    }
    setSubmitting(true);
    try {
      const message = [
        `Full name: ${form.fullName}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Date: ${form.date}`,
        `Start window: ${form.startWindow}`,
        `Movers: ${form.movers}`,
        `Service: ${form.serviceType}`,
        `Move size: ${form.moveSize}`,
        `Move type: ${form.moveType}`,
        `Furnishing: ${form.furnishing || "N/A"}`,
        `Pickup: ${form.pickupAddress}, ${form.pickupCity}, ${form.pickupState}, ${form.pickupZip} ${form.pickupApt ? "Apt:" + form.pickupApt : ""}`,
        `Dropoff: ${form.dropoffAddress}, ${form.dropoffCity}, ${form.dropoffState}, ${form.dropoffZip} ${form.dropoffApt ? "Apt:" + form.dropoffApt : ""}`,
        `Access: ${form.access}`,
        `Piano/fragile: ${form.pianoFragile}`,
        `Extra stops: ${form.extraStops}`,
      ];
      if (form.extraStops === "yes" && form.stops.length) {
        message.push("Stops:");
        form.stops.forEach((s, i) =>
          message.push(`${i + 1}. ${s.address}, ${s.city}, ${s.state}, ${s.zip} ${s.apt ? "Apt:" + s.apt : ""}`)
        );
      }
      if (form.notes) message.push(`Notes: ${form.notes}`);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { subject: "New Booking Request", name: form.fullName, email: form.email, phone: form.phone, message: message.join("\n") }
      );
// Prepare the message for auto-reply
const userMessage = `
Hi ${form.fullName},

Thank you for contacting California Movers Express. We have received your booking request and will get back to you shortly.

Here’s what you sent us:
Name: ${form.fullName}
Email: ${form.email}
Phone: ${form.phone}
`;

await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID_RECEIVER, // auto-reply template
  {
    name: form.fullName,
    email: form.email,  // must match {{email}} in template
    message: userMessage,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);

      setCompleted(true);
      setSubmitting(false);
      setTimeout(() => navigate("/"), 1400);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      alert("Failed to submit booking — please try again.");
    }
  };

  return (
    <div className="booking-page">
        <motion.section
    className="top-controls"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <Link to="/">
      <motion.button
        className="back-btn-main"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
         Home
      </motion.button>
    </Link>
  </motion.section>
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
        <h1 className="booking-title">Book Now</h1>
        <p className="booking-subtitle">Complete the steps to request a booking.</p>

        <div className="steps">
          {["Contact", "Move details", "Addresses & Stops", "Review"].map((t, i) => (
            <div key={t} className={`step-pill ${i === step ? "active" : ""}`}>{t}</div>
          ))}
        </div>

        <div className="slide-container">
          <AnimatePresence custom={dir} initial={false} exitBeforeEnter>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, type: "tween" }}
              className="slide-card"
            >
              {/* STEP CONTENT */}
              {step === 0 && (
                <div className="card">
                  <h2>Contact Information</h2>
                  <div className="grid-2">
                    <label>
                      Full name *
                      <input name="fullName" value={form.fullName} onChange={change} />
                      {errors.fullName && <small className="err">{errors.fullName}</small>}
                    </label>
                    <label>
                      Email *
                      <input name="email" type="email" value={form.email} onChange={change} />
                      {errors.email && <small className="err">{errors.email}</small>}
                    </label>
                    <label style={{ gridColumn: "1 / -1" }}>
                      Phone *
                      <input name="phone" value={form.phone} onChange={change} />
                      {errors.phone && <small className="err">{errors.phone}</small>}
                    </label>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="card">
                  <h2>Move Details</h2>
                  <div className="grid-2">
                    <label>
                      Date *
                      <input name="date" type="date" value={form.date} onChange={change} />
                      {errors.date && <small className="err">{errors.date}</small>}
                    </label>
                    <label>
                      Start window *
                      <select name="startWindow" value={form.startWindow} onChange={change}>
                        <option value="">Select start window</option>
                        <option value="8:00 - 8:30 am">8:00 - 8:30 am</option>
                        <option value="2:00 - 5:00 pm">2:00 - 5:00 pm</option>
                        <option value="flexible">Flexible</option>
                      </select>
                      {errors.startWindow && <small className="err">{errors.startWindow}</small>}
                    </label>
                    <label>
                      How many movers?
                      <select name="movers" value={form.movers} onChange={change}>
                        {Array.from({ length: 9 }, (_, i) => i + 2).map((n) => <option key={n} value={String(n)}>{n}</option>)}
                      </select>
                    </label>
                    <label>
                      Type of service *
                      <select name="serviceType" value={form.serviceType} onChange={change}>
                        <option value="">Choose service</option>
                        <option value="Moving">Moving</option>
                        <option value="Furniture Delivery">Furniture Delivery</option>
                        <option value="Loading only">Loading only</option>
                        <option value="Unloading only">Unloading only</option>
                        <option value="Packing only">Packing only</option>
                        <option value="Unpacking only">Unpacking only</option>
                      </select>
                      {errors.serviceType && <small className="err">{errors.serviceType}</small>}
                    </label>
                    <label>
                      Move size *
                      <select name="moveSize" value={form.moveSize} onChange={change}>
                        <option value="">Select size</option>
                        <option value="studio">Studio</option>
                        <option value="1 bedroom">1 bedroom</option>
                        <option value="2 bedroom">2 bedroom</option>
                        <option value="3 bedroom">3 bedroom</option>
                        <option value="4+ bedroom">4+ bedroom</option>
                        <option value="office">Office</option>
                        <option value="storage">Storage</option>
                        <option value="not applicable">Not Applicable</option>
                      </select>
                      {errors.moveSize && <small className="err">{errors.moveSize}</small>}
                    </label>
                    <label>
                      Move type *
                      <select name="moveType" value={form.moveType} onChange={change}>
                        <option value="">Select type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Storage Unit">Storage Unit</option>
                        <option value="Office">Office</option>
                        <option value="Specialty Unit">Specialty Unit</option>
                      </select>
                      {errors.moveType && <small className="err">{errors.moveType}</small>}
                    </label>
                    <label>
                      Furnishing (optional)
                      <select name="furnishing" value={form.furnishing} onChange={change}>
                        <option value="">Not specified</option>
                        <option value="Lightly Furnished">Lightly Furnished</option>
                        <option value="Moderately Furnished">Moderately Furnished</option>
                        <option value="Heavily Furnished">Heavily Furnished</option>
                      </select>
                    </label>
                    <label style={{ gridColumn: "1 / -1" }}>
                      Piano / Fragile items?
                      <div className="radio-group">
                        <label>
                          <input type="radio" name="pianoFragile" value="yes" checked={form.pianoFragile === "yes"} onChange={change} /> Yes
                        </label>
                        <label>
                          <input type="radio" name="pianoFragile" value="no" checked={form.pianoFragile === "no"} onChange={change} /> No
                        </label>
                      </div>
                    </label>
                    <label style={{ gridColumn: "1 / -1" }}>
                      Extra notes
                      <textarea name="notes" value={form.notes} onChange={change} placeholder="Add any extra notes here" />
                    </label>
                  </div>
                </div>
              )}
{step === 2 && (
  <div className="card">
    <h2>Addresses & Stops</h2>

    <h3>Pickup Address</h3>
    <div className="grid-2">
      <label>
        Address *
        <input name="pickupAddress" value={form.pickupAddress} onChange={change} />
        {errors.pickupAddress && <small className="err">{errors.pickupAddress}</small>}
      </label>
      <label>
        City *
        <input name="pickupCity" value={form.pickupCity} onChange={change} />
        {errors.pickupCity && <small className="err">{errors.pickupCity}</small>}
      </label>
      <label>
        State *
        <input name="pickupState" value={form.pickupState} onChange={change} />
        {errors.pickupState && <small className="err">{errors.pickupState}</small>}
      </label>
      <label>
        ZIP *
        <input name="pickupZip" value={form.pickupZip} onChange={change} />
        {errors.pickupZip && <small className="err">{errors.pickupZip}</small>}
      </label>
      <label>
        Apt/Unit
        <input name="pickupApt" value={form.pickupApt} onChange={change} />
      </label>
    </div>

    <h3>Extra Stops</h3>
    <div className="radio-group">
      <label>
        <input type="radio" name="extraStops" value="no" checked={form.extraStops === "no"} onChange={change} /> No
      </label>
      <label>
        <input type="radio" name="extraStops" value="yes" checked={form.extraStops === "yes"} onChange={change} /> Yes
      </label>
    </div>

    {form.extraStops === "yes" && (
      <div>
        {form.stops.map((s, idx) => (
          <div key={idx} className="stop-card">
            <h4>Stop {idx + 1}</h4>
            <div className="grid-2">
              <label>
                Address *
                <input value={s.address} onChange={(e) => updateStop(idx, "address", e.target.value)} />
                {errors[`stop-${idx}-address`] && <small className="err">{errors[`stop-${idx}-address`]}</small>}
              </label>
              <label>
                City *
                <input value={s.city} onChange={(e) => updateStop(idx, "city", e.target.value)} />
                {errors[`stop-${idx}-city`] && <small className="err">{errors[`stop-${idx}-city`]}</small>}
              </label>
              <label>
                State *
                <input value={s.state} onChange={(e) => updateStop(idx, "state", e.target.value)} />
                {errors[`stop-${idx}-state`] && <small className="err">{errors[`stop-${idx}-state`]}</small>}
              </label>
              <label>
                ZIP *
                <input value={s.zip} onChange={(e) => updateStop(idx, "zip", e.target.value)} />
                {errors[`stop-${idx}-zip`] && <small className="err">{errors[`stop-${idx}-zip`]}</small>}
              </label>
              <label>
                Apt/Unit
                <input value={s.apt} onChange={(e) => updateStop(idx, "apt", e.target.value)} />
              </label>
            </div>
            <button type="button" className="btn remove" onClick={() => removeStop(idx)}>Remove Stop</button>
          </div>
        ))}
        <button type="button" className="btn primary" onClick={addStop}>Add Stop</button>
      </div>
    )}

    <h3>Dropoff Address</h3>
    <div className="grid-2">
      <label>
        Address *
        <input name="dropoffAddress" value={form.dropoffAddress} onChange={change} />
        {errors.dropoffAddress && <small className="err">{errors.dropoffAddress}</small>}
      </label>
      <label>
        City *
        <input name="dropoffCity" value={form.dropoffCity} onChange={change} />
        {errors.dropoffCity && <small className="err">{errors.dropoffCity}</small>}
      </label>
      <label>
        State *
        <input name="dropoffState" value={form.dropoffState} onChange={change} />
        {errors.dropoffState && <small className="err">{errors.dropoffState}</small>}
      </label>
      <label>
        ZIP *
        <input name="dropoffZip" value={form.dropoffZip} onChange={change} />
        {errors.dropoffZip && <small className="err">{errors.dropoffZip}</small>}
      </label>
      <label>
        Apt/Unit
        <input name="dropoffApt" value={form.dropoffApt} onChange={change} />
      </label>
      <label style={{ gridColumn: "1 / -1" }}>
        Access instructions
        <textarea name="access" value={form.access} onChange={change} placeholder="Elevator, stairs, special instructions..." />
      </label>
    </div>
  </div>
)}
{step === 3 && (
  <div className="card">
    <h2>Review & Complete</h2>

    <div style={{ lineHeight: 1.6 }}>
      <strong>Full Name:</strong> {form.fullName || "—"} <br />
      <strong>Email:</strong> {form.email || "—"} <br />
      <strong>Phone:</strong> {form.phone || "—"} <br />
      <strong>Date:</strong> {form.date || "—"} <br />
      <strong>Start Window:</strong> {form.startWindow || "—"} <br />
      <strong>Movers:</strong> {form.movers} <br />
      <strong>Service Type:</strong> {form.serviceType || "—"} <br />
      <strong>Move Size:</strong> {form.moveSize || "—"} <br />
      <strong>Move Type:</strong> {form.moveType || "—"} <br />
      <strong>Furnishing:</strong> {form.furnishing || "—"} <br />

      <strong>Pickup Address:</strong> {form.pickupAddress}, {form.pickupCity}, {form.pickupState} {form.pickupZip} {form.pickupApt ? `(${form.pickupApt})` : ""} <br />
      <strong>Dropoff Address:</strong> {form.dropoffAddress}, {form.dropoffCity}, {form.dropoffState} {form.dropoffZip} {form.dropoffApt ? `(${form.dropoffApt})` : ""} <br />
      <strong>Access Instructions:</strong> {form.access || "—"} <br />
      <strong>Piano / Fragile:</strong> {form.pianoFragile} <br />

      <strong>Extra Stops:</strong> {form.extraStops} <br />
      {form.extraStops === "yes" && form.stops.length > 0 && (
        <ol style={{ marginTop: 6 }}>
          {form.stops.map((s, i) => (
            <li key={i}>
              {s.address}, {s.city}, {s.state} {s.zip} {s.apt ? `(${s.apt})` : ""}
            </li>
          ))}
        </ol>
      )}

      {form.notes && (
        <div style={{ marginTop: 8 }}>
          <strong>Notes:</strong> {form.notes}
        </div>
      )}
    </div>

    <div style={{ marginTop: 16 }}>
      {completed ? (
        <div className="success">Booking completed — redirecting...</div>
      ) : (
        <p>Click “Complete” to submit your booking request.</p>
      )}
    </div>
  </div>
)}

              {/* STEP 2 & STEP 3 will follow similar refactored pattern */}
              {/* ... you can continue as in your original code, using the same grid, spacing, stops layout ... */}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="controls">
          <button onClick={back} disabled={step === 0} className="btn">Back</button>
          {step < 3 ? (
            <button onClick={next} className="btn primary">Next</button>
          ) : (
            <button onClick={handleComplete} className="btn success" disabled={submitting || completed}>
              {submitting ? "Submitting..." : completed ? "Completed" : "Complete"}
            </button>
          )}
        </div>
      </motion.section>
       <motion.section
        className="privacy-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
      
<motion.div className="privacy-btn-container">
  <Link to="/privacy-policy">
    <motion.button
      className="privacy-btn-link"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Privacy Policy
    </motion.button>
  </Link>
</motion.div>


{/* 
<Link to="/">
  <motion.button
    className="back-btn-main"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Back to Home
  </motion.button>
</Link> */}
      </motion.section>
        <p className="sms-consent">
            By submitting this form, you agree to receive SMS notifications from San Diego Packing Movers regarding your moving quote and updates and accept the Conditions of Use and Privacy Notice. Message and data rates may apply. Reply STOP to unsubscribe at any time.
          </p>
    </div>
  );
}
