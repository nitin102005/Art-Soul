import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import { galleryImages } from "../data/galleryImages";
import { ZoomIn, MousePointerClick } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import Lightbox from "./ui/Lightbox";
import { imageReveal, staggerContainer } from "../utils/animations";

// Assign alternating aspect ratios for masonry feel
const getAspect = (index) => (index % 3 === 0 ? "tall" : "wide");

// Build image items from plain array
const buildItems = (images) =>
  images.map((src, i) => ({
    id: i,
    image: src,
    aspect: getAspect(i),
  }));

function GalleryCard({ item, index, onOpen }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      layout
      variants={imageReveal}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay: index * 0.06 }}
    >
      <motion.button
        layout
        style={{ y, scale }}
        onClick={() => onOpen(item.id)}
        className="group relative w-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-transform duration-500 hover:-translate-y-1"
      >
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            loading="lazy"
            decoding="async"
            className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
              item.aspect === "tall" ? "aspect-3/4" : "aspect-4/3"
            }`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-1 ring-inset ring-white/0 group-hover:ring-white/20 transition-all duration-500 pointer-events-none" />
        </div>
      </motion.button>
    </motion.div>
  );
}

export default function Gallery() {
  const sectionRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  const items = buildItems(galleryImages);

  const openLightbox = (id) => {
    const idx = items.findIndex((e) => e.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goTo = (newIndex) => {
    setDirection(newIndex > lightboxIndex ? 1 : -1);
    setLightboxIndex(newIndex);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    goTo(lightboxIndex === 0 ? items.length - 1 : lightboxIndex - 1);
  };

  const goNext = () => {
    if (lightboxIndex === null) return;
    goTo(lightboxIndex === items.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <div className="flex justify-center">   {/* ← Centered wrapper */}
      <div className="w-full max-w-7xl">     {/* Optional: constrain max width */}
        <section
          id="gallery"
          className="relative py-20 md:py-28 overflow-hidden"
        >
          {/* Background blobs */}
          <div className="absolute inset-0 bg-linear-to-b from-white via-primary-lighter/20 to-white pointer-events-none" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent-light/15 rounded-full blur-3xl pointer-events-none" />

          <div
            className="relative z-10 px-5 sm:px-6"
            ref={sectionRef}
          >
            {/* Section header */}
            <div className="text-center mb-12 md:mb-14">
              <SectionHeader
                badge="Past Events"
                title="Our Creative"
                highlight="Journey"
                description="Relive the magic of past workshops, exhibitions, and community events — tap any moment to explore."
              />
            </div>

            {/* Masonry grid */}
            <br />
            <AnimatePresence mode="popLayout">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="masonry-grid"
              >
                {items.map((item, i) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    index={i}
                    onOpen={openLightbox}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Footer hint */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-center text-text-muted text-sm mt-10"
            >
              <MousePointerClick
                size={15}
                className="text-primary/50 shrink-0"
              />
              Click any image to open the full gallery viewer
            </motion.p>
          </div>

          {/* Lightbox */}
          {lightboxIndex !== null && (
            <Lightbox
              items={items}
              currentIndex={lightboxIndex}
              direction={direction}
              onClose={closeLightbox}
              onPrev={goPrev}
              onNext={goNext}
            />
          )}
        </section>
      </div>
    </div>
  );
}