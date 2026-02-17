import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Video Downloader Tools",
    description:
      "Developed multiple video downloader applications that allow users to download videos from various platforms efficiently. Focused on performance, user interface simplicity, and file format compatibility.",
    tech: ["Python", "C++", "GUI"],
    github: "https://github.com/Mohitkumar44",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" aria-label="Featured Projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium mb-2">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 group hover:glow-border transition-all duration-300"
            >
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={16} /> GitHub
                </a>
              </div>
            </motion.div>
          ))}

          {/* Services placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center"
          >
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <ExternalLink className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              More Coming Soon
            </h3>
            <p className="text-muted-foreground text-sm">
              Services and freelance offerings will be available soon as I expand my professional
              portfolio.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
