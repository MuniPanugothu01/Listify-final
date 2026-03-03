import { motion, useScroll } from "motion/react";
import { cn } from "../lib/utils";
import { forwardRef } from "react";

export const ScrollProgress = forwardRef(function ScrollProgress(
  { className, ...props },
  ref,
) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
<<<<<<< HEAD
        "fixed inset-x-0 top-14 md:top-16 sm:top-16 lg:top-16 z-10 h-[4px] p-1.5 md:p-1.5 origin-left bg-gradient-to-r from-[#90C67C] via-[#67AE6E] to-[#328E6E] ",
        className,
=======
        "fixed inset-x-0 top-14 md:top-14 sm:top-14 lg:top-16 z-10 h-[4px] p-1.5 md:p-1.5 origin-left bg-gradient-to-r from-[#90C67C] via-[#67AE6E] to-[#328E6E] ",
        className
>>>>>>> a61f37d73347f6712df2cc0da6eae19b122ddf19
      )}
      style={{ scaleX: scrollYProgress }}
      transition={{ ease: "easeOut", duration: 0.15 }}
      {...props}
    />
  );
});
