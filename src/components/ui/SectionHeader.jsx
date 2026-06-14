import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  align = "center",
  dark = false,
  className = "",
}) {
  const alignClass =
    align === "center"
      ? "text-center mx-auto"
      : "text-left";

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`mb-14 md:mb-16 max-w-full ${alignClass} ${className}`}
    >
      {badge && (
        <motion.span
          variants={fadeUp}
          className={`inline-block px-4 py-1.5 rounded-[3px] text-sm font-medium mb-4 tracking-wide ${
            dark
              ? "whitespace-pre text-white/60 bg-rose-gold/15 px-3"
              : "bg-primary/10 text-rose-gold"
          }`}
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className={`font-display text-display-md md:text-display-lg font-bold text-balance ${
          dark ? "text-white" : ""
        }`}
      >
        {title}{" "}
        {highlight && (
          <span className={dark ? "text-primary" : "gradient-text"}>
            {highlight}
          </span>
        )}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={`mt-4 text-center text-text-secondary text-body-lg leading-relaxed ${
            align === "center" ? "max-w-xl mx-auto" : "max-w-2xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
