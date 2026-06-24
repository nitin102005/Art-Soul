import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer } from "../utils/animations";

const dotPositions = [
  { top: "12%", left: "8%" },
  { top: "25%", left: "85%" },
  { top: "45%", left: "15%" },
  { top: "60%", left: "72%" },
  { top: "78%", left: "30%" },
  { top: "18%", left: "55%" },
  { top: "35%", left: "42%" },
  { top: "55%", left: "90%" },
  { top: "70%", left: "8%" },
  { top: "88%", left: "65%" },
  { top: "42%", left: "58%" },
  { top: "8%", left: "38%" },
];

export default function CommunityCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="community" className="relative section-padding overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-lighter via-white to-primary-light/30" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-72 h-72 border-2 border-primary/10 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 -left-32 w-96 h-96 border-2 border-accent/10 rounded-full pointer-events-none"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative dots - kept absolute as they are background decoration */}
      {dotPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/15 pointer-events-none"
          style={{ top: pos.top, left: pos.left }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Main content using flex for clean centering */}
      <div className="flex items-center justify-center min-h-fit relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl w-full flex justify-center
          flex-col items-center px-5 sm:px-6 text-center"
        >
          <motion.div variants={fadeUp} className="w-16 h-16 mx-auto mb-8">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full rounded-2xl bg-linear-to-br from-primary to-rose-gold flex items-center justify-center shadow-lg shadow-primary/30"
            >
              <Sparkles size={28} className="text-white" />
            </motion.div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-display-md md:text-display-lg font-bold leading-tight mb-6 text-balance"
          >
            Become Part of the{" "}
            <span className="gradient-text">Art &amp; Soul</span> Family
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-body-lg text-text-secondary max-w-xl mx-auto mb-10"
          >
            Join a vibrant community of creators, dreamers, and art lovers.
            Register now and never miss an inspiring workshop or event.
          </motion.p>
          <br />

          <a
 href="https://in.bookmyshow.com/explore/c/venues/how-about-coffee-jaipur/hwcj"
  target="_blank"
  rel="noopener noreferrer"
>
  <motion.button
    variants={fadeUp}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="group inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-primary-dark via-rose-gold to-accent text-white font-semibold text-lg rounded-[5px] shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-shadow duration-300 cursor-pointer"
  >
    
    <p className="whitespace-pre">  Register for Upcoming Events </p>
    <ArrowRight
      size={20}
      className="group-hover:translate-x-1 transition-transform duration-300"
    />
  </motion.button>
</a>
        </motion.div>

      </div>
      <br />
    </section>
  );
}
