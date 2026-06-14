import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-[75vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-0 bg-linear-to-br from-white via-primary-lighter to-primary-light/40"
    >
      {/* Content */}
      <motion.div
        className="max-w-4xl mx-auto px-5 sm:px-6 text-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          className="text-sm font-medium flex justify-center gap-1.5 mb-6"
          variants={badgeVariants}
        >
          <Sparkles size={16} className="text-accent" />
          Welcome to Art & Soul
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-display-xl font-bold tracking-tight mb-6"
          variants={itemVariants}
        >
          <span className="inline-block">Where</span>{" "}
          <span className="inline-block">
            <span className="gradient-text whitespace-pre">Creativity</span>
          </span>
          <br />
          <span className="inline-block">Meets</span>{" "}
          <span className="inline-block">
            <span className="gradient-text whitespace-pre">Community</span>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <p className="text-body-lg text-center text-text-secondary max-w-2xl mb-10">
            Explore inspiring workshops, artistic experiences, exhibitions, and
            events hosted by Art & Soul.
          </p>
        </motion.div>
        <br />

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => handleScroll("#events")}
            className="btn-primary group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Events
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.button>
          

          <motion.button
            onClick={() => handleScroll("#community")}
            className="btn-glass"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Community
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 md:mt-20"
          variants={itemVariants}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={() => handleScroll("#about")}
            className="w-6 h-10 mx-auto rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5 cursor-pointer hover:border-primary/60 transition-colors"
            aria-label="Scroll to about section"
          >
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
