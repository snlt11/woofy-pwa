import { motion } from "motion/react";

// Opacity only: no movement, so nothing on screen shifts position
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
