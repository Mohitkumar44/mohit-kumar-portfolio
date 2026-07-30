import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen, Award } from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    period: "2024 – Present",
    title: "Bachelor of Technology (B.Tech) in Information Technology",
    place: "Rajkiya Engineering College, Banda (AKTU)",
    board: "AKTU",
    desc: "Pursuing a Bachelor of Technology in Information Technology with a strong focus on Data Structures & Algorithms, Competitive Programming, Object-Oriented Programming, and Web Development. Continuously building problem-solving skills through LeetCode and hands-on development projects.",
  },
  {
    icon: School,
    period: "2022 – 2023",
    title: "Senior Secondary Education (Class XII)",
    place: "Shri Makhan Lal Dayawati Public Inter College, Hathras, Uttar Pradesh",
    board: "CBSE",
    stream: "Physics, Chemistry and Mathematics (PCM)",
    desc: "Completed Senior Secondary education with a strong foundation in Mathematics, Physics, Chemistry, analytical thinking, and logical problem-solving, which laid the groundwork for pursuing Information Technology and Software Engineering.",
  },
  {
    icon: BookOpen,
    period: "2020 – 2021",
    title: "Secondary Education (Class X)",
    place: "M.L.D.V.P. Inter College, Hathras, Uttar Pradesh",
    board: "UP Board",
    desc: "Completed secondary education with a solid academic foundation in Mathematics, Science, and English, developing strong analytical, reasoning, and learning skills that continue to support my engineering education.",
  },
];

const EducationSection = () => {
  return (
    <section id="education" aria-label="Education Timeline" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
            Education
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">
            Academic <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
          />

          <ol className="space-y-10 md:space-y-12">
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
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                      {item.period}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      <Award className="w-3 h-3" />
                      {item.board}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-heading font-bold text-foreground leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-primary/90 text-sm font-medium mt-1.5">
                    {item.place}
                  </p>

                  {item.stream && (
                    <p className="text-muted-foreground text-xs mt-1.5 font-medium">
                      Stream: {item.stream}
                    </p>
                  )}

                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
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
