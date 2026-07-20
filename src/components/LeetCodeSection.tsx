import { motion, useInView } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const USERNAME = "Mohitkumar44";
const PROFILE_URL = `https://leetcode.com/u/${USERNAME}/`;

interface LeetStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints?: number;
  reputation?: number;
  contestRating?: number;
  contestsAttended?: number;
  avatar?: string;
}

const useCountUp = (target: number, active: boolean, duration = 1200) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || !Number.isFinite(target)) return;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
};

const StatCard = ({
  label,
  value,
  suffix = "",
  active,
}: {
  label: string;
  value: number;
  suffix?: string;
  active: boolean;
}) => {
  const n = useCountUp(value, active);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card rounded-xl p-5 text-center transition-all duration-300 hover:glow-border"
    >
      <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
        {value > 0 ? n.toLocaleString() : "—"}
        {value > 0 ? suffix : ""}
      </p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
};

const CircularProgress = ({
  solved,
  total,
  active,
}: {
  solved: number;
  total: number;
  active: boolean;
}) => {
  const pct = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
  const animatedPct = useCountUp(Math.round(pct), active);
  const size = 160;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (animatedPct / 100) * c;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--primary))"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-heading font-bold text-foreground">
          {useCountUp(solved, active).toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">
          / {total > 0 ? total.toLocaleString() : "—"} solved
        </p>
      </div>
    </div>
  );
};

const DifficultyBar = ({
  label,
  solved,
  total,
  color,
  active,
  delay = 0,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
  active: boolean;
  delay?: number;
}) => {
  const pct = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
  const n = useCountUp(solved, active);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-muted-foreground">
          {n} / {total > 0 ? total : "—"}
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={active ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-muted/40 ${className}`} />
);

const LeetCodeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [stats, setStats] = useState<LeetStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const base = "https://alfa-leetcode-api.onrender.com";
        const [solvedRes, profileRes, contestRes] = await Promise.allSettled([
          fetch(`${base}/${USERNAME}/solved`).then((r) => r.json()),
          fetch(`${base}/${USERNAME}`).then((r) => r.json()),
          fetch(`${base}/${USERNAME}/contest`).then((r) => r.json()),
        ]);

        const solved = solvedRes.status === "fulfilled" ? solvedRes.value : {};
        const profile = profileRes.status === "fulfilled" ? profileRes.value : {};
        const contest = contestRes.status === "fulfilled" ? contestRes.value : {};

        if (cancelled) return;

        if (!solved || (solved.errors && !solved.solvedProblem)) {
          throw new Error("No data");
        }

        setStats({
          totalSolved: solved.solvedProblem ?? 0,
          totalQuestions:
            (solved.easySolved ?? 0) +
              (solved.mediumSolved ?? 0) +
              (solved.hardSolved ?? 0) >
            0
              ? 3579
              : 0,
          easySolved: solved.easySolved ?? 0,
          totalEasy: 878,
          mediumSolved: solved.mediumSolved ?? 0,
          totalMedium: 1852,
          hardSolved: solved.hardSolved ?? 0,
          totalHard: 849,
          acceptanceRate: Number(profile.acceptanceRate ?? 0),
          ranking: Number(profile.ranking ?? 0),
          avatar: profile.avatar,
          contestRating: contest?.contestRating
            ? Math.round(contest.contestRating)
            : 0,
          contestsAttended: contest?.contestAttend ?? 0,
        });
      } catch {
        if (!cancelled) setError("Unable to load LeetCode stats right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const active = inView && !!stats;

  return (
    <section
      id="leetcode"
      aria-label="LeetCode Statistics"
      className="section-padding"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium mb-2">Problem Solving</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-3">
            Leet<span className="text-gradient">Code</span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            My competitive programming journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 md:p-10"
        >
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              <SkeletonBlock className="h-56" />
              <div className="space-y-4">
                <SkeletonBlock className="h-6" />
                <SkeletonBlock className="h-6" />
                <SkeletonBlock className="h-6" />
              </div>
            </div>
          ) : error || !stats ? (
            <p className="text-center text-muted-foreground py-10">
              {error ?? "Stats unavailable."}
            </p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="flex flex-col items-center gap-4">
                  {stats.avatar ? (
                    <img
                      src={stats.avatar}
                      alt={`${USERNAME} avatar`}
                      loading="lazy"
                      className="w-20 h-20 rounded-full border border-border object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Code className="text-primary" size={28} />
                    </div>
                  )}
                  <p className="font-heading font-semibold text-foreground">
                    @{USERNAME}
                  </p>
                  <CircularProgress
                    solved={stats.totalSolved}
                    total={stats.totalQuestions}
                    active={active}
                  />
                </div>

                <div className="space-y-5">
                  <DifficultyBar
                    label="Easy"
                    solved={stats.easySolved}
                    total={stats.totalEasy}
                    color="hsl(145 70% 50%)"
                    active={active}
                  />
                  <DifficultyBar
                    label="Medium"
                    solved={stats.mediumSolved}
                    total={stats.totalMedium}
                    color="hsl(40 90% 55%)"
                    active={active}
                    delay={0.15}
                  />
                  <DifficultyBar
                    label="Hard"
                    solved={stats.hardSolved}
                    total={stats.totalHard}
                    color="hsl(0 75% 60%)"
                    active={active}
                    delay={0.3}
                  />
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  label="Acceptance Rate"
                  value={Math.round(stats.acceptanceRate)}
                  suffix="%"
                  active={active}
                />
                <StatCard
                  label="Contest Rating"
                  value={stats.contestRating ?? 0}
                  active={active}
                />
                <StatCard
                  label="Global Ranking"
                  value={stats.ranking}
                  active={active}
                />
                <StatCard
                  label="Contests Attended"
                  value={stats.contestsAttended ?? 0}
                  active={active}
                />
              </div>
            </>
          )}

          <div className="mt-8 flex justify-center">
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LeetCode Profile (opens in new tab)"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Code size={16} />
              View LeetCode Profile
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeetCodeSection;
