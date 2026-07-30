import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen } from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    period: "2024 — 2028 (Expected)",
    title: "B.Tech, Information Technology",
    place: "Rajkiya Engineering College, Banda",
    desc: "Core coursework in Data Structures & Algorithms, Object-Oriented Programming, DBMS, and Full Stack Web Development. Actively engaged in competitive programming.",
  },
  {
    icon: School,
    period: "2022 — 2023",
    title: "Senior Secondary (12th)",
    place: "PCM with Computer Science",
    desc: "Strong foundation in Mathematics, Physics, and introductory programming — laid the base for engineering studies.",
  },
  {
    icon: BookOpen,
    period: "2020 — 2021",
    title: "Secondary (10th)",
    place: "CBSE Curriculum",
    desc: "Consistent academic performance with an early interest in computers, logic, and problem-solving.",
  },
];

const EducationSection = () => {
  return (
    <section id="education" aria-label="Education Timeline" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium mb-2">Education</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 tracking-tight">
            Academic <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
          />

          <ol className="space-y-8">
            {timeline.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-14 md:pl-20"
              >
                {/* Dot / Icon */}
                <div className="absolute left-0 top-0 flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary shadow-lg shadow-primary/20">
                  <item.icon className="text-primary" size={18} />
                </div>

                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className="glass-card rounded-2xl p-6 hover:glow-border transition-all duration-300"
                >
                  <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1.5">
                    {item.period}
                  </p>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-primary/90 text-sm font-medium mt-1">{item.place}</p>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
