import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Video } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  gradient: string;
  Icon: typeof Video;
}

const projects: Project[] = [
  {
    title: "Video Downloader Tools",
    description:
      "Cross-platform video downloader utilities supporting multiple sources. Focused on performance, simple UI, and broad format compatibility.",
    tech: ["Python", "C++", "GUI"],
    github: "https://github.com/Mohitkumar44",
    gradient: "from-primary/30 via-primary/10 to-transparent",
    Icon: Video,
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
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
            >
              {/* Animated border */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/40 transition-colors duration-300"
              />

              {/* Image / preview */}
              <div className={`relative h-44 md:h-52 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <project.Icon
                    className="text-primary/70 transition-transform duration-500 group-hover:scale-110"
                    size={72}
                    strokeWidth={1.2}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              <div className="p-6 md:p-7">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary font-medium border border-primary/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary/40 text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <Github size={15} /> GitHub
                    </a>
                  )}
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                      Demo coming soon
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}

          {/* Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:glow-border transition-all duration-300 min-h-[320px]"
          >
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <Sparkles className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              More Projects Coming Soon
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              I&apos;m actively building new full-stack and DSA-driven projects. Check back soon or follow my
              GitHub for updates.
            </p>
            <a
              href="https://github.com/Mohitkumar44"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary text-sm transition-colors"
            >
              <Github size={15} /> View GitHub
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
