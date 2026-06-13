import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-[75vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-0 bg-linear-to-br from-white via-primary-lighter to-primary-light/40"
    >
      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center w-full">
        {/* Badge */}
        <div className=" text-sm font-medium flex justify-center gap-1.5">
          <Sparkles size={16} className="text-accent" />
          Welcome to Art & Soul
        </div>

        {/* Headline */}
        <h1 className="font-display text-display-xl font-bold tracking-tight mb-6">
          <span className="inline-block">Where</span>
          <span className="inline-block">
            <span className="gradient-text whitespace-pre"> Creativity</span>
          </span>
          <br />
          <span className="inline-block">Meets</span>
          <span className="inline-block">
            <span className="gradient-text whitespace-pre"> Community</span>
          </span>
        </h1>
<br />
        {/* Subtext */}
        <div className="flex justify-center">

        <p className="text-body-lg text-center text-text-secondary max-w-2xl  mb-10">
          Explore inspiring workshops, artistic experiences, exhibitions, and
          events hosted by Art & Soul.
        </p>
        </div>
<br />
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleScroll("#events")}
            className="btn-primary group"
          >
            Explore Events
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => handleScroll("#community")}
            className="btn-glass"
          >
            Join Community
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 md:mt-20">
          <button
            onClick={() => handleScroll("#about")}
            className="w-6 h-10 mx-auto rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5 cursor-pointer hover:border-primary/60 transition-colors"
            aria-label="Scroll to about section"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </button>
        </div>
      </div>
    </section>
  );
}