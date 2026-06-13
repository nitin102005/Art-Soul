import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItem, ease } from "../utils/animations";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Categories", href: "#categories" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#community" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
      className={`fixed top-0 left-4 right-4 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav shadow-lg shadow-primary/8 py-3" : "bg-transparent py-3"
      }`}
    >
      <div className="w-full mx-auto flex items-center justify-between px-6">
        {/* Logo - Increased Size */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNav("#hero")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-18 w-auto  transition-all duration-300 group-hover:scale-105"
          />
        </motion.button>

        {/* Desktop Navigation - Increased Gap */}
        <motion.ul
          initial="hidden"
          animate="visible"
          className="hidden lg:flex items-center gap-8" // Increased gap
        >
          {navLinks.map((link, i) => (
            <motion.li key={link.href} custom={i} variants={navItem}>
              <button
                onClick={() => handleNav(link.href)}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 cursor-pointer ${
                  activeSection === link.href.slice(1)
                    ? "text-rose-gold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/15 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </motion.li>
          ))}
        </motion.ul>

        {/* Desktop CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleNav("#community")}
          className="hidden lg:flex btn-primary py-3 px-7 text-sm"
        >
          Join Community
        </motion.button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-3 rounded-xl text-text-primary hover:bg-primary/10 transition-colors cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="lg:hidden glass border-t border-white/20 overflow-hidden mt-2"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease }}
                  onClick={() => handleNav(link.href)}
                  className={`w-full text-left px-6 py-4 rounded-2xl text-base font-medium transition-all cursor-pointer ${
                    activeSection === link.href.slice(1)
                      ? "bg-primary/15 text-rose-gold"
                      : "text-text-secondary hover:bg-primary/5 hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04 + 0.1 }}
                onClick={() => handleNav("#community")}
                className="mt-4 w-full btn-primary py-4 rounded-2xl text-base"
              >
                Join Community
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}