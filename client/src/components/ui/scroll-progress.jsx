import { motion, useScroll } from "motion/react";
import { cn } from "../lib/utils";
import { forwardRef } from "react";

export const ScrollProgress = forwardRef(function ScrollProgress(
  { className, ...props },
  ref
) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-19 z-50 h-[3px] origin-left bg-gradient-to-r from-[#90C67C] via-[#67AE6E] to-[#328E6E] ",
        className
      )}
      style={{ scaleX: scrollYProgress }}
      transition={{ ease: "easeOut", duration: 0.15 }}
      {...props}
    />
  );
});
