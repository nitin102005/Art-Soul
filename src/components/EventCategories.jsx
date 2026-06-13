import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { eventCategories } from "../data/events";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { fadeUp, staggerContainer } from "../utils/animations";

function CategoryCard({ category, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <div className="relative h-full card-premium overflow-hidden hover:translate-y-0">
        {/* Image */}
        <div className=" overflow-hidden">
          <img
            src={category.image}
            // alt={category.title}
            className="w-full
      h-fit
      sm:h-70
      md:h-92
      lg:h-100
      object-center
      transition-transform
      duration-700
      ease-out
      group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-linear-to-t from-text-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />


        </div>

        {/* Content */}
        <div className="p-6 text-center">   {/* ← Added text-center */}
          <h3 className="font-display text-xl font-bold text-text-primary mb-2 group-hover:text-rose-gold transition-colors duration-300">
            {/* {category.title} */}
          </h3>
          {/* <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
            {category.description}
          </p> */}
          {/* <button className="inline-flex items-center gap-2 text-sm font-semibold text-rose-gold hover:text-primary-dark transition-colors cursor-pointer group/btn mx-auto">
            Learn More
            <ArrowRight
              size={16}
              className="group-hover/btn:translate-x-1 transition-transform duration-300"
            />
          </button> */}
        </div>

        {/* Hover accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary-dark to-rose-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
}

export default function EventCategories() {
  const ref = useRef(null);

  return (
    <section id="categories" className="py-16">
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-full  mx-auto px-5 sm:px-6" ref={ref}>
        <SectionHeader
          badge="What We Offer"
          title="Event"
          highlight="Categories"
          description="From serene pottery classes to vibrant community meetups — find your creative calling."
        />
        <br />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-4 justify-items-center"
        >
          {eventCategories.map((cat, i) => (
            <motion.div key={cat.id} variants={fadeUp} className="w-full max-w-[285px]">
              <CategoryCard category={cat} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}