import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const skills = [
  {
    category: "Frontend Development",
    items: ["HTML", "CSS", "JavaScript"],
  },
  {
    category: "Programming Languages",
    items: ["C++", "Python", "C", "Java"],
  },
  {
    category: "Core Expertise",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Problem Solving"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" aria-label="Technical Skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium mb-2">Skills</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12">
            My <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="font-heading font-semibold text-foreground mb-6">{group.category}</h3>
              <ul className="space-y-3">
                {group.items.map((skill, index) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
