import { motion } from "framer-motion";
import {
  Code2,
  Braces,
  FileCode,
  Terminal,
  FileType,
  Palette,
  Atom,
  Wind,
  GitBranch,
  Github,
  MonitorPlay,
  ServerCog,
  LucideIcon,
} from "lucide-react";

interface Skill {
  name: string;
  Icon: LucideIcon;
}

interface SkillGroup {
  category: string;
  items: Skill[];
}

const groups: SkillGroup[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "C++", Icon: Code2 },
      { name: "C", Icon: Terminal },
      { name: "Python", Icon: FileCode },
      { name: "JavaScript", Icon: Braces },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "HTML", Icon: FileType },
      { name: "CSS", Icon: Palette },
      { name: "React", Icon: Atom },
      { name: "Tailwind CSS", Icon: Wind },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", Icon: GitBranch },
      { name: "GitHub", Icon: Github },
      { name: "VS Code", Icon: MonitorPlay },
      { name: "Linux", Icon: ServerCog },
    ],
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
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 tracking-tight">
            My <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:glow-border transition-all duration-300"
            >
              <h3 className="font-heading font-semibold text-foreground mb-5 text-lg">
                {group.category}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {group.items.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-secondary/50 border border-border hover:border-primary/60 hover:bg-primary/5 transition-all cursor-default"
                  >
                    <skill.Icon className="text-primary shrink-0" size={16} />
                    <span className="text-sm font-medium text-foreground truncate">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
