import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, ExternalLink, Trophy, Target, Flame, Award } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const LEETCODE_USERNAME = "Mohit_Kumar_Rath";
const LEETCODE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

interface LeetCodeStats {
  avatar?: string;
  ranking?: number;
  totalSolved: number;
  totalQuestions?: number;
  easySolved: number;
  easyTotal?: number;
  mediumSolved: number;
  mediumTotal?: number;
  hardSolved: number;
  hardTotal?: number;
  acceptanceRate?: number;
  contestRating?: number;
  globalRanking?: number;
  attendedContests?: number;
  streak?: number;
  badges?: { name: string; icon?: string }[];
}

const fetchLeetCode = async (): Promise<LeetCodeStats> => {
  // Primary: alfa-leetcode-api (rich data)
  const base = "https://alfa-leetcode-api.onrender.com";
  const results = await Promise.allSettled([
    fetch(`${base}/${LEETCODE_USERNAME}`).then((r) => r.json()),
    fetch(`${base}/${LEETCODE_USERNAME}/solved`).then((r) => r.json()),
    fetch(`${base}/userContestRankingInfo/${LEETCODE_USERNAME}`).then((r) => r.json()),
    fetch(`${base}/${LEETCODE_USERNAME}/badges`).then((r) => r.json()),
  ]);

  const profile: any = results[0].status === "fulfilled" ? results[0].value : {};
  const solved: any = results[1].status === "fulfilled" ? results[1].value : {};
  const contest: any = results[2].status === "fulfilled" ? results[2].value : {};
  const badgesRes: any = results[3].status === "fulfilled" ? results[3].value : {};

  const cr = contest?.data?.userContestRanking;

  const stats: LeetCodeStats = {
    avatar: profile?.avatar,
    ranking: profile?.ranking,
    totalSolved: solved?.solvedProblem ?? 0,
    easySolved: solved?.easySolved ?? 0,
    mediumSolved: solved?.mediumSolved ?? 0,
    hardSolved: solved?.hardSolved ?? 0,
    acceptanceRate: profile?.acceptanceRate,
    contestRating: cr?.rating ? Math.round(cr.rating) : undefined,
    globalRanking: cr?.globalRanking,
    attendedContests: cr?.attendedContestsCount,
    badges: Array.isArray(badgesRes?.badges)
      ? badgesRes.badges.slice(0, 6).map((b: any) => ({ name: b?.displayName ?? b?.name, icon: b?.icon }))
      : undefined,
  };

  // Fallback for totals if solved endpoint missing them
  if (!stats.totalSolved) {
    // second fallback: leetcode-stats-api
    try {
      const alt = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`
      ).then((r) => r.json());
      if (alt?.status === "success") {
        stats.totalSolved = alt.totalSolved ?? 0;
        stats.easySolved = alt.easySolved ?? 0;
        stats.mediumSolved = alt.mediumSolved ?? 0;
        stats.hardSolved = alt.hardSolved ?? 0;
        stats.totalQuestions = alt.totalQuestions;
        stats.easyTotal = alt.totalEasy;
        stats.mediumTotal = alt.totalMedium;
        stats.hardTotal = alt.totalHard;
        stats.acceptanceRate ??= alt.acceptanceRate;
        stats.ranking ??= alt.ranking;
      }
    } catch {
      /* ignore */
    }
  }

  // Reasonable defaults for problem totals so bars render
  stats.easyTotal ??= 878;
  stats.mediumTotal ??= 1836;
  stats.hardTotal ??= 827;
  stats.totalQuestions ??=
    (stats.easyTotal ?? 0) + (stats.mediumTotal ?? 0) + (stats.hardTotal ?? 0);

  return stats;
};

const formatNum = (n: number) =>
  Number.isFinite(n) ? Math.round(n).toLocaleString() : "—";

const AnimatedNumber = ({
  value,
  start,
  suffix = "",
  decimals = 0,
}: {
  value?: number;
  start: boolean;
  suffix?: string;
  decimals?: number;
}) => {
  const target = Number.isFinite(value as number) ? (value as number) : 0;
  const v = useCountUp(target, 1400, start && Number.isFinite(value as number));
  if (!Number.isFinite(value as number)) return <span>—</span>;
  return (
    <span>
      {decimals > 0 ? v.toFixed(decimals) : formatNum(v)}
      {suffix}
    </span>
  );
};

const CircularProgress = ({
  solved,
  total,
  animate,
}: {
  solved: number;
  total: number;
  animate: boolean;
}) => {
  const size = 180;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = total > 0 ? Math.min(solved / total, 1) : 0;
  const dash = useCountUp(pct * circumference, 1500, animate);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="stroke-secondary fill-none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          className="fill-none stroke-[url(#lcGrad)]"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
        />
        <defs>
          <linearGradient id="lcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(145 80% 42%)" />
            <stop offset="100%" stopColor="hsl(160 70% 35%)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-heading font-bold text-foreground">
          <AnimatedNumber value={solved} start={animate} />
        </span>
        <span className="text-xs text-muted-foreground mt-1">
          / {formatNum(total)} solved
        </span>
      </div>
    </div>
  );
};

const DifficultyBar = ({
  label,
  solved,
  total,
  color,
  animate,
  delay,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
  animate: boolean;
  delay: number;
}) => {
  const pct = total > 0 ? Math.min((solved / total) * 100, 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground tabular-nums">
          <AnimatedNumber value={solved} start={animate} /> / {formatNum(total)}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={animate ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  suffix,
  animate,
  decimals,
}: {
  icon: typeof Trophy;
  label: string;
  value?: number;
  suffix?: string;
  animate: boolean;
  decimals?: number;
}) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 250, damping: 20 }}
    className="glass-card rounded-xl p-5 hover:glow-border transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="text-primary" size={18} />
      </div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
    <p className="text-2xl font-heading font-bold text-foreground tabular-nums">
      <AnimatedNumber
        value={value}
        start={animate}
        suffix={suffix}
        decimals={decimals}
      />
    </p>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="glass-card rounded-xl p-5 h-[110px] animate-pulse" />
);

const LeetCodeSection = () => {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    let alive = true;
    fetchLeetCode()
      .then((d) => {
        if (!alive) return;
        setData(d);
      })
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const animate = inView && !!data && !loading;

  return (
    <section
      id="leetcode"
      aria-label="LeetCode Statistics"
      className="section-padding"
    >
      <div className="max-w-7xl mx-auto">
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
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
                {data?.avatar ? (
                  <img
                    src={data.avatar}
                    alt={`${LEETCODE_USERNAME} avatar`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Code className="text-primary" size={22} />
                )}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  {LEETCODE_USERNAME}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {loading
                    ? "Fetching profile…"
                    : error
                    ? "Live data unavailable"
                    : data?.ranking
                    ? `Ranking #${formatNum(data.ranking)}`
                    : "LeetCode Profile"}
                </p>
              </div>
            </div>
            <a
              href={LEETCODE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LeetCode Profile (opens in new tab)"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Code size={16} /> View LeetCode Profile
              <ExternalLink size={14} />
            </a>
          </div>

          {error && !data ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Couldn't load LeetCode stats right now. Please try again later.
            </div>
          ) : (
            <>
              {/* Main grid: circular + difficulty bars */}
              <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                <div className="flex justify-center">
                  {loading || !data ? (
                    <div className="w-[180px] h-[180px] rounded-full bg-secondary/40 animate-pulse" />
                  ) : (
                    <CircularProgress
                      solved={data.totalSolved}
                      total={data.totalQuestions ?? 0}
                      animate={animate}
                    />
                  )}
                </div>

                <div className="space-y-5">
                  {loading || !data ? (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  ) : (
                    <>
                      <DifficultyBar
                        label="Easy"
                        solved={data.easySolved}
                        total={data.easyTotal ?? 0}
                        color="linear-gradient(90deg,#22c55e,#16a34a)"
                        animate={animate}
                        delay={0.1}
                      />
                      <DifficultyBar
                        label="Medium"
                        solved={data.mediumSolved}
                        total={data.mediumTotal ?? 0}
                        color="linear-gradient(90deg,#f59e0b,#d97706)"
                        animate={animate}
                        delay={0.2}
                      />
                      <DifficultyBar
                        label="Hard"
                        solved={data.hardSolved}
                        total={data.hardTotal ?? 0}
                        color="linear-gradient(90deg,#ef4444,#b91c1c)"
                        animate={animate}
                        delay={0.3}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {loading || !data ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                ) : (
                  <>
                    <StatCard
                      icon={Target}
                      label="Acceptance"
                      value={data.acceptanceRate}
                      suffix="%"
                      animate={animate}
                      decimals={1}
                    />
                    <StatCard
                      icon={Trophy}
                      label="Contest Rating"
                      value={data.contestRating}
                      animate={animate}
                    />
                    <StatCard
                      icon={Award}
                      label="Global Rank"
                      value={data.globalRanking}
                      animate={animate}
                    />
                    <StatCard
                      icon={Flame}
                      label="Contests"
                      value={data.attendedContests}
                      animate={animate}
                    />
                  </>
                )}
              </div>

              {/* Badges */}
              {data?.badges && data.badges.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-heading font-semibold text-foreground mb-4">
                    Badges
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {data.badges.map((b, i) => (
                      <motion.div
                        key={`${b.name}-${i}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={animate ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.1 * i, duration: 0.4 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-full glass-card text-xs text-foreground"
                      >
                        {b.icon ? (
                          <img
                            src={b.icon}
                            alt=""
                            className="w-5 h-5 rounded-full"
                            loading="lazy"
                          />
                        ) : (
                          <Award size={14} className="text-primary" />
                        )}
                        <span>{b.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LeetCodeSection;
