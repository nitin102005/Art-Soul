import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import EventCarousel from "./components/EventCarousel";
import EventCategories from "./components/EventCategories";
import Highlights from "./components/Highlights";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import CommunityCTA from "./components/CommunityCTA";
import Footer from "./components/Footer";
import { pageTransition } from "./utils/animations";

function App() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageTransition}
      className="min-h-screen w-screen bg-white"
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <br />
        <EventCarousel />
        <br />
        <Gallery />
        <br />
        <EventCategories />
        <br />
        <Highlights />
        <br />
        
        <Testimonials />
        <CommunityCTA />
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;
