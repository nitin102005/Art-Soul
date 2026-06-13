import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, CalendarDays } from "lucide-react";
import { lightboxImage } from "../../utils/animations";

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  direction = 0,
}) {
  const item = items[currentIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-100 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label={`Viewing ${item.title}`}
      >
        {/* Backdrop */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-text-primary/90 backdrop-blur-md cursor-pointer"
          onClick={onClose}
          aria-label="Close lightbox"
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 rounded-full glass-dark flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* Navigation */}
        {items.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-3 md:left-6 z-10 w-11 h-11 rounded-full glass-dark flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-3 md:right-6 z-10 w-11 h-11 rounded-full glass-dark flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={item.id}
              custom={direction}
              variants={lightboxImage}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center"
            >
              <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-h-[65vh] object-contain bg-black/20"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mt-6 text-center max-w-lg"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-semibold uppercase tracking-wider mb-3">
                  {item.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} className="text-primary" />
                    {item.date}
                  </span>
                </div>
                <p className="mt-4 text-white/40 text-xs tabular-nums">
                  {currentIndex + 1} / {items.length}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
