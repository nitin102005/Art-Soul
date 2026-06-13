import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { testimonials } from "../data/testimonials";
import { Star, Quote } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { fadeUp, staggerContainer } from "../utils/animations";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-accent fill-accent" : "text-primary/20"}
        />
      ))}
    </div>
  );

  const TestimonialCard = ({ testimonial }) => (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="h-full p-7 md:p-8 rounded-3xl card-premium flex flex-col"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
        <Quote size={18} className="text-rose-gold" />
      </div>

      <p className="text-text-secondary leading-relaxed flex-1 mb-6 italic text-[15px]">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      <StarRating rating={testimonial.rating} />

      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-primary/10">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 ring-offset-2"
          loading="lazy"
          decoding="async"
        />
        <div>
          <p className="font-display font-semibold text-text-primary text-sm">
            {testimonial.name}
          </p>
          <p className="text-xs text-text-muted">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="testimonials" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-light/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      {/* Wrapper div with flex + justify-center */}
      <div className="flex justify-center">
        <div className="relative z-10 max-w-7xl w-full px-5 sm:px-6" ref={ref}>
          <SectionHeader
            badge="Testimonials"
            title="What Our"
            highlight="Artists Say"
            description="Hear from the people who've experienced the magic of Art & Soul."
          />

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp}>
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                spaceBetween={24}
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="pb-14!"
              >
                {testimonials.map((t) => (
                  <SwiperSlide key={t.id} className="h-auto!">
                    <TestimonialCard testimonial={t} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}