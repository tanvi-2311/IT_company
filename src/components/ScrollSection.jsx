import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollSection = ({ children, className = "" }) => {
  const containerRef = useRef(null);

  // Advanced scroll-linked viewport tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Tracks from when section's top enters bottom of viewport to when section's bottom leaves top of viewport
  });

  // Map scroll progress to premium visual transformations:
  // Progress 0.0 -> 0.18: Smoothly fade in, move up from bottom, remove blur
  // Progress 0.18 -> 0.82: Remain fully pristine and readable in the center
  // Progress 0.82 -> 1.0: Smoothly fade out, move up to leave, apply elegant blur
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [50, 0, 0, -50]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity,
        y,
        filter,
        willChange: "transform, opacity, filter" // Leverages hardware graphics cards for full GPU acceleration (120 FPS)
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollSection;
