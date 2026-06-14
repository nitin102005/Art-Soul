import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { highlights } from "../data/events";
import { Award, Users, Calendar, Sparkles } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { fadeUp, staggerContainer } from "../utils/animations";

const icons = [Calendar, Users, Award, Sparkles];

function AnimatedCounter({ target, suffix = "", isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Highlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br from-text-primary via-[#3a2832] to-text-primary py-20 md:py-28">
      <br />
      {/* Ambient background layer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl md:h-96 md:w-96" />
        <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-rose-gold/10 blur-3xl md:h-80 md:w-80" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-full px-5 sm:px-6">
        <SectionHeader
          badge=" Our Impact "
          title="Numbers That"
          highlight="Inspire"
          dark
        />
        <br />

        {/* Wrapper div with justify-center */}
        <div className="flex w-full justify-center">
          <motion.div
            ref={ref}
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-6 md:mt-16 md:gap-16 lg:grid-cols-4"
          >
            {highlights.map((stat, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 hover:bg-white/[0.07] md:p-8"
                >
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 to-rose-gold/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/10 group-hover:to-rose-gold/10 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-rose-gold/20 transition-all duration-500 group-hover:scale-110 group-hover:from-primary group-hover:to-rose-gold">
                    <Icon
                      size={24}
                      className="text-primary transition-colors duration-500 group-hover:text-white"
                    />
                  </div>

                  {/* Value */}
                  <p className="relative z-10 mb-1.5 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      isVisible={isInView}
                    />
                  </p>

                  {/* Label */}
                  <p className="relative z-10 text-xs font-medium uppercase tracking-wider text-white/60 md:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <br />
    </section>
    
  );
}
