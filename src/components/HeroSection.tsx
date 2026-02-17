import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => {
  return (
    <section id="home" aria-label="Introduction" className="min-h-screen flex items-center section-padding pt-32">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1">

          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Open to Opportunities</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
            Mohit{" "}
            <span className="text-gradient">Kumar</span>
            <br />
            <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">
              Full Stack Developer
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mb-4 max-w-lg">
            Developing scalable, high-performance web applications with a strong foundation in Data Structures & Algorithms.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {["Full Stack Development", "Data Structures & Algorithms", "B.Tech — Class of 2028"].map((tag) =>
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-sm border border-border text-muted-foreground">

                {tag}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">View Projects

              <ExternalLink size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground hover:border-primary transition-colors">

              Get in Touch
            </a>
          </div>

          <div className="flex gap-8 mt-12">
            <div>
              <p className="text-3xl font-heading font-bold text-gradient">5+</p>
              <p className="text-sm text-muted-foreground">Projects Built</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-gradient">DSA</p>
              <p className="text-sm text-muted-foreground">Problem Solver</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-gradient">2028</p>
              <p className="text-sm text-muted-foreground">B.Tech Grad</p>
            </div>
          </div>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center">

          <div className="relative">
            <div className="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden glow-border">
              <img
                src={profileImg}
                alt="Mohit Kumar - Full Stack Developer"
                className="w-full h-full object-cover" />

            </div>
            <div className="absolute -bottom-4 -right-4 glass-card rounded-xl px-4 py-2">
              <p className="text-sm font-medium text-foreground">B.Tech Student</p>
              <p className="text-xs text-primary">REC Banda</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">

        <ArrowDown className="text-muted-foreground" size={24} />
      </motion.div>
    </section>);

};

export default HeroSection;