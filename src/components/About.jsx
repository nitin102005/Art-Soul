import { Heart, Users, Palette, Star } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Creative Workshops",
    desc: "Hands-on sessions guided by expert artists",
  },
  {
    icon: Users,
    title: "Vibrant Community",
    desc: "Connect with like-minded art enthusiasts",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    desc: "Every event crafted with love and artistry",
  },
  {
    icon: Star,
    title: "All Skill Levels",
    desc: "From curious beginners to seasoned artists",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left — Image Side */}
          <div className="flex justify-center lg:justify-start w-full lg:w-auto">
            <div className="w-full max-w-md lg:max-w-lg">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 ring-1 ring-white/50">
                <img
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1000&fit=crop"
                  alt="Artist creating artwork"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex-1 max-w-xl lg:max-w-2xl flex gap-3 flex-col">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
              About Us
            </h2>
            

            <p className="text-text-secondary leading-relaxed text-[15px] lg:text-[17px] mb-2">
              Art &amp; Soul is a creative platform dedicated to bringing
              artists, learners, and art enthusiasts together through immersive
              workshops and meaningful artistic experiences.
            </p>

            <p className="text-text-secondary leading-relaxed text-[15px] lg:text-[17px] mb-10">
              We believe that art has the power to heal, connect, and
              transform. Whether you're picking up a brush for the first time
              or you're a seasoned creator, our community welcomes you with
              open arms and endless inspiration.
            </p>
            {/* <br /> */}
            <br />

            {/* Features — Using Flex instead of Grid */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-8 mt-10">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex-1 min-w-[280px] p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-300 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-linear-to-br group-hover:from-primary group-hover:to-rose-gold transition-all duration-300">
                    <feature.icon
                      size={28}
                      className="text-rose-gold group-hover:text-white transition-colors"
                    />
                  </div>

                  <h3 className="font-semibold text-xl text-text-primary mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-text-muted leading-relaxed flex-1">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}