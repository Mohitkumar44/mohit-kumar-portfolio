import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";

const theme = {
  light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const GitHubContributionsSection = () => {
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
          <p className="text-primary text-sm font-medium mb-2">Activity</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-3">
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-muted-foreground mb-12">
            My daily coding activity on GitHub.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl p-6 md:p-10 flex justify-center overflow-x-auto"
        >
          <div className="min-w-[300px] text-foreground">
            <GitHubCalendar
              username="Mohitkumar44"
              colorScheme="dark"
              theme={theme}
              fontSize={14}
              blockSize={12}
              blockMargin={4}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubContributionsSection;
