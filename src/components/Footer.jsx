import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { fadeUp, staggerContainer } from "../utils/animations";
import logo from "../assets/logo.png";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Categories", href: "#categories" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
];

const socialLinks = [
  { 
    icon: FaInstagram, 
    href: "https://www.instagram.com/art._.soul__?igsh=bTljeXNxc3V6dnF4", 
    label: "Instagram" 
  },
  { 
    icon: FaFacebookF, 
    href: "https://www.facebook.com/share/1DyTvbc666/", 
    label: "Facebook" 
  },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-text-primary text-white overflow-hidden">
      <div className="h-1 bg-linear-to-r from-primary-dark via-primary to-rose-gold" />
      <br />
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-gold/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      {/* Centered Wrapper */}
      <div className="flex justify-center">
        <div 
          className="relative z-10 w-full max-w-7xl px-5 sm:px-6 pt-16 md:pt-20 pb-8"
          ref={ref}
        >
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14"
          >
            {/* Brand - Now Clickable */}
            <motion.div variants={fadeUp} className="lg:col-span-4">
              <a 
                href="https://www.instagram.com/art._.soul__?igsh=bTljeXNxc3V6dnF4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 mb-5 group"
              >
                <img
                           src={logo}
                           alt="Logo"
                           className="h-18 bg-primary-light/90 rounded-full w-auto transition-all duration-300 group-hover:scale-105"
                         />
              </a>

              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
                A creative platform dedicated to bringing artists, learners, and art
                enthusiasts together through immersive workshops.
              </p>

              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors duration-300"
                  >
                    <s.icon size={18} className="text-white/70" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <h3 className="font-display font-semibold text-lg mb-5 text-white/90">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNav(link.href)}
                      className="group inline-flex items-center gap-1 text-white/60 hover:text-primary text-sm transition-colors cursor-pointer"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Art &amp; Soul. All rights reserved.
            </p>
            <p className="text-white/40 text-sm flex items-center gap-1.5">
              Made with <Heart size={14} className="text-primary fill-primary" /> for the creative community
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}