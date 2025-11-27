import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const reviews = [
  { name: "Alice Johnson", text: "Amazing service! Highly recommend." },
  { name: "Bob Smith", text: "Professional and reliable. 5/5 stars!" },
  { name: "Catherine Lee", text: "Exceptional experience, will use again." },
  { name: "David Kim", text: "Fast and careful. Loved it!" },
  { name: "Eva Martinez", text: "Superb quality and attention to detail." },
];

export default function ReviewCarousel() {
  const loopedReviews = [...reviews, ...reviews]; // duplicate for seamless loop
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(-1); // -1 = left, 1 = right
  const speed = 0.5; // lower = slower
  const slideWidth = 350 + 32; // card width + gap

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      setOffset((prev) => {
        const maxOffset = -(loopedReviews.length / 2) * slideWidth;
        const next = prev + speed * direction;
        if (direction === -1 && next <= maxOffset) return 0;
        if (direction === 1 && next >= 0) return maxOffset;
        return next;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [direction, loopedReviews.length]);

  const handlePrev = () => setDirection(1);
  const handleNext = () => setDirection(-1);

  return (
    <section className="reviews">
      <h2>Customer Reviews</h2>
      <div className="reviews-wrapper">
        <motion.div
          className="reviews-container"
          style={{ x: offset }}
          transition={{ ease: "linear" }}
        >
          {loopedReviews.map((review, idx) => (
            <motion.div
              key={idx}
              className="review-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stars">★★★★★</div>
              <p className="review-text">"{review.text}"</p>
              <p className="reviewer">- {review.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Arrows */}
        <button className="arrow left-arrow" onClick={handlePrev}>
          ⬅
        </button>
        <button className="arrow right-arrow" onClick={handleNext}>
          ➡
        </button>
      </div>
    </section>
  );
}
