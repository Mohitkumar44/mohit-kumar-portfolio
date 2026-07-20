import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Suspense, lazy, useState } from "react";

const GitHubCalendar = lazy(async () => {
  const mod: any = await import("react-github-calendar");
  return { default: mod.default ?? mod };
});

const USERNAME = "Mohitkumar44";

const calendarTheme = {
  light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const CalendarSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="h-4 w-40 bg-muted rounded mb-4" />
    <div className="grid grid-cols-[repeat(52,minmax(0,1fr))] gap-1">
      {Array.from({ length: 52 * 7 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-sm bg-muted/60" />
      ))}
    </div>
  </div>
);

const GitHubSection = () => {
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
          className="glass-card rounded-2xl p-6 md:p-10 hover:glow-border transition-all duration-300"
        >
          <div className="flex flex-col items-center overflow-x-auto">
            <Suspense fallback={<CalendarSkeleton />}>
              <GitHubCalendar
                username={USERNAME}
                theme={calendarTheme}
                colorScheme="dark"
                fontSize={13}
                blockSize={12}
                blockMargin={4}
                errorMessage="Unable to load GitHub contributions right now."
              />
            </Suspense>
          </div>

          <div className="mt-10 w-full">
            {!graphError ? (
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}&theme=github-compact&bg_color=00000000&hide_border=true&line=39d353&point=39d353&color=39d353`}
                alt={`${USERNAME} GitHub activity graph`}
                loading="lazy"
                onError={() => setGraphError(true)}
                className="w-full rounded-xl border border-border"
              />
            ) : (
              <p className="text-center text-sm text-muted-foreground py-6">
                Activity graph is temporarily unavailable.
              </p>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub Profile (opens in new tab)"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Github size={16} />
              View GitHub Profile
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
