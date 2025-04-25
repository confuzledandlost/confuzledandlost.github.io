// filepath: /Users/brandon/Documents/SSU-SNHU-SRJC/Personal_Site/portfolio-vite/src/components/AnimatedSection.jsx
import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const AnimatedSection = ({ children, className = "", animation = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2 }); // Trigger when 20% of the section is visible

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.2, // Stagger animations of child elements
            duration: 0.5,
          },
        },
        ...animation,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;