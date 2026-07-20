import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const GitHubCalendar = lazy(async () => {
  const mod: any = await import("react-github-calendar");
  return { default: mod.default ?? mod };
});

const GITHUB_USERNAME = "Mohitkumar44";
const GITHUB_URL = "https://github.com/Mohitkumar44";
const ACTIVITY_GRAPH_URL = `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=github-compact&hide_border=true&bg_color=15191F`;

// Match portfolio green palette (primary: hsl(145 80% 42%))
const calendarTheme = {
  light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  dark: ["#161b22", "#0e4429", "#116a37", "#22c55e", "#39d353"],
};

const CalendarSkeleton = () => (
  <div
    className="w-full h-[180px] rounded-xl bg-secondary/40 animate-pulse"
    aria-hidden="true"
  />
);

const GitHubSection = () => {
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [graphError, setGraphError] = useState(false);

  return (
    <section
      id="github"
      aria-label="GitHub Contributions"
      className="section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium mb-2">Open Source</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-3">
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            My daily coding activity and open-source contributions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 md:p-8 hover:glow-border transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Github className="text-primary" size={22} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  @{GITHUB_USERNAME}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Live contribution graph
                </p>
              </div>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub Profile (opens in new tab)"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Github size={16} /> View GitHub Profile
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="overflow-x-auto flex justify-center">
            <Suspense fallback={<CalendarSkeleton />}>
              <GitHubCalendar
                username={GITHUB_USERNAME}
                theme={calendarTheme}
                colorScheme="dark"
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                errorMessage="Unable to load GitHub contributions right now."
              />
            </Suspense>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-4 md:p-6 mt-8 hover:glow-border transition-all duration-300"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4 px-2">
            Activity Graph
          </h3>
          <div className="relative w-full min-h-[200px] rounded-xl overflow-hidden">
            {!graphLoaded && !graphError && (
              <div className="absolute inset-0 bg-secondary/40 animate-pulse rounded-xl" />
            )}
            {graphError ? (
              <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">
                Activity graph is temporarily unavailable.
              </div>
            ) : (
              <img
                src={ACTIVITY_GRAPH_URL}
                alt={`${GITHUB_USERNAME} GitHub activity graph`}
                loading="lazy"
                decoding="async"
                onLoad={() => setGraphLoaded(true)}
                onError={() => setGraphError(true)}
                className={`w-full h-auto rounded-xl transition-opacity duration-500 ${
                  graphLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
