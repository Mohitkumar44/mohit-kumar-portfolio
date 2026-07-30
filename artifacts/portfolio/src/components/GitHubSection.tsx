import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, GitCommitHorizontal } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

const GITHUB_USERNAME = "Mohitkumar44";
const GITHUB_URL = "https://github.com/Mohitkumar44";

// Theme-aware activity graph URLs
const ACTIVITY_GRAPH_DARK = `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=github-compact&hide_border=true&bg_color=0d1117`;
const ACTIVITY_GRAPH_LIGHT = `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=github&hide_border=true&bg_color=f6f8fa`;

// Portfolio green palette: dark = hsl(145 80% 42%), light = hsl(145 70% 32%)
const calendarTheme = {
  dark: ["#161b22", "#0e4429", "#116a37", "#22c55e", "#39d353"],
  light: ["#eaf5ec", "#bbf7d0", "#4ade80", "#16a34a", "#166534"],
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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const activityGraphUrl = isDark ? ACTIVITY_GRAPH_DARK : ACTIVITY_GRAPH_LIGHT;

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

        {/* Contribution calendar card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden"
        >
          {/* Card header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                <Github className="text-primary" size={18} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground leading-tight">
                  @{GITHUB_USERNAME}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <GitCommitHorizontal size={11} />
                  Live contribution graph
                </p>
              </div>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub Profile (opens in new tab)"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                         border border-border bg-secondary/60 text-foreground text-sm font-medium
                         hover:bg-primary hover:text-primary-foreground hover:border-primary
                         transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/20"
            >
              <Github size={15} />
              View Profile
              <ExternalLink size={13} className="opacity-70" />
            </a>
          </div>

          {/* Graph area — tinted inner container */}
          <div className="px-6 py-6">
            <div className="rounded-xl border border-border/60 bg-secondary/30 dark:bg-secondary/20 px-5 py-6 overflow-x-auto flex justify-center">
              <GitHubCalendar
                username={GITHUB_USERNAME}
                theme={calendarTheme}
                colorScheme={isDark ? "dark" : "light"}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                errorMessage="Unable to load GitHub contributions right now."
              />
            </div>
          </div>
        </motion.div>

        {/* Activity graph card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden mt-6"
        >
          <div className="px-6 py-5 border-b border-border">
            <h3 className="font-heading font-semibold text-foreground">
              Activity Graph
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Commit frequency over the past year
            </p>
          </div>
          <div className="p-4">
            <div className="relative w-full min-h-[200px] rounded-xl overflow-hidden bg-secondary/20 dark:bg-secondary/30">
              {!graphLoaded && !graphError && (
                <div className="absolute inset-0 bg-secondary/40 animate-pulse rounded-xl" />
              )}
              {graphError ? (
                <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">
                  Activity graph is temporarily unavailable.
                </div>
              ) : (
                <img
                  key={activityGraphUrl}
                  src={activityGraphUrl}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
