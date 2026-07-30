import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Target } from "lucide-react";

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    desc: "B.Tech in Information Technology at Rajkiya Engineering College, Banda — Class of 2028.",
  },
  {
    icon: Sparkles,
    title: "Interests",
    desc: "Competitive programming in C++, DSA problem-solving, and building performant frontend interfaces.",
  },
  {
    icon: Target,
    title: "Career Goal",
    desc: "Secure a Software Engineering internship and grow into a full-time SDE role at a product-driven company.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" aria-label="About Mohit Kumar" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium mb-2">About Me</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 tracking-tight">
            Know Who I <span className="text-gradient">Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-5">
              I&apos;m an Information Technology undergraduate at Rajkiya Engineering College, Banda, focused on
              competitive programming and full-stack web development.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              I write clean, efficient C++ for algorithmic problems and build responsive React interfaces with
              Tailwind CSS. I care about scalable code, thoughtful UX, and continuous learning.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Actively seeking internship and SDE opportunities where I can contribute, ship real products, and grow
              alongside strong engineering teams.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-4"
          >
            {cards.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="glass-card rounded-xl p-5 flex gap-4 items-start hover:glow-border transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                  <item.icon className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
