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
    
    <section className="py-16 md:py-20 overflow-hidden bg-linear-to-br from-text-primary via-[#3a2832] to-text-primary"> 
      
      {/* Decorative blurs */}
      <br />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-full mx-auto px-5 sm:px-6" ref={ref}>
        <SectionHeader
          badge="Our Impact"
          title="Numbers That"
          highlight="Inspire"
          dark
        />
        <br />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center justify-center"  
        >
          
          {highlights.map((stat, i) => {
            const Icon = icons[i];
            return (
              
              <motion.div
                key={stat.label}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative text-center p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-colors duration-500 w-full max-w-[280px]"  
              >
                
                <div className="w-14 h-20 mx-auto mb-4 rounded-2xl bg-linear-to-br from-primary/20 to-rose-gold/20 flex items-center justify-center group-hover:from-primary group-hover:to-rose-gold transition-all duration-500">
                  <Icon size={24} className="text-primary group-hover:text-white transition-colors" />
                </div>

                <p className="font-display text-3xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isVisible={isInView}
                  />
                </p>

                <p className="text-xs md:text-sm text-white/60 font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
        <br />
      </div>
    </section>
  );
}