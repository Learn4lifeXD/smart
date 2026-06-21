"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

export default function ScrollHighlight({ children, className = "" }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"]
  });

  // When scrolling down, the opacity and glow of the element increases
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const color = useTransform(scrollYProgress, [0, 1], ["rgba(233, 195, 73, 0)", "rgba(233, 195, 73, 0.2)"]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, boxShadow: useTransform(color, c => `0 0 20px ${c}`) }}
      className={`transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
