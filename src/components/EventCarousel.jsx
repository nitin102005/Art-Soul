import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { featuredEvents } from "../data/events";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { fadeUp, staggerContainer } from "../utils/animations";

function EventCard({ event }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden card-premium h-full flex flex-col shadow-none"
      style={{ height: "clamp(260px, 55vw, 380px)" }}  // ✅ fluid height for all screens
    >
      {/* Image Container - Increased Height */}
      <div className="relative flex-[2.8] overflow-hidden shadow-none">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-black/90 min-h-[40px]">
        <div>
          <h3 className="font-display text-xs sm:text-base md:text-base font-bold text-white leading-tight mb-1 sm:mb-1.5">
            {event.title}
          </h3>
          {/* <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-white/75 text-xs sm:text-sm">
            <CalendarDays size={12} className="text-primary-light shrink-0" />
            <span>{event.date}</span>
          </div> */}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-linear-to-r from-primary-dark via-primary to-rose-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}

export default function EventCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="events" className="relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-linear-to-b from-white via-primary-lighter/30 to-white" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-full text-center mx-auto px-5 sm:px-6" ref={ref}>
        <SectionHeader
          badge="Featured Events"
          title="Upcoming"
          highlight="Experiences"
          description="Discover our hand-picked upcoming workshops and creative sessions."
        />
        <br />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center"
        >
          <motion.div variants={fadeUp} className="w-full  max-w-7xl mx-auto">
            <Swiper
              modules={[Autoplay,Navigation, Pagination, EffectCoverflow]}
              effect="coverflow"
              coverflowEffect={{
                rotate: 0,
                stretch: 20,
                depth: 80,
                modifier: 1.6,
                slideShadows: false,
              }}
              centeredSlides={true}
              slidesPerView={3}        // ✅ exactly 2 on smallest phones
              spaceBetween={3}        // ✅ tighter gap on small screens
              loop
              autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
              navigation
              // pagination={{ clickable: true }}
              breakpoints={{
                380:  { slidesPerView: 2,   spaceBetween: 12 },  // ✅ small phones
                480:  { slidesPerView: 2.8, spaceBetween: 18 },  // larger phones
                768:  { slidesPerView: 3.5, spaceBetween: 20 },
                1024: { slidesPerView: 4.2, spaceBetween: 22 },
                1280: { slidesPerView: 5,   spaceBetween: 24 },
                1536: { slidesPerView: 5.2, spaceBetween: 26 },
                1636: { slidesPerView: 5.4, spaceBetween: 28 },
              }}
              className="pb-14"
            >
              {featuredEvents.map((event) => (
                <SwiperSlide key={event.id}>
                  <EventCard event={event} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
