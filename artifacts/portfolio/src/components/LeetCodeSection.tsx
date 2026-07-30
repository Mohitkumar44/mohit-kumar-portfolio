import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  ExternalLink,
  Trophy,
  Target,
  Flame,
  Award,
  TrendingUp,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const LEETCODE_USERNAME = "Mohit_Kumar_Rath";
const LEETCODE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

interface ContestInfo {
  rating: number;
  globalRanking: number;
  totalParticipants?: number;
  topPercentage: number;
  attendedContests: number;
  badge?: string | null;
}

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
  submissionCalendar?: Record<string, number>;
  contest?: ContestInfo | null;
  badges?: { name: string; icon?: string }[];
}

const safeJson = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
};

const fetchLeetCode = async (): Promise<LeetCodeStats> => {
  const [mainRes, contestRes, profileRes, badgesRes] = await Promise.allSettled([
    safeJson(`https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`),
    safeJson(`https://alfa-leetcode-api.onrender.com/userContestRankingInfo/${LEETCODE_USERNAME}`),
    safeJson(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`),
    safeJson(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/badges`),
  ]);

  const main: any = mainRes.status === "fulfilled" ? mainRes.value : {};
  const contestRaw: any = contestRes.status === "fulfilled" ? contestRes.value : {};
  const profile: any = profileRes.status === "fulfilled" ? profileRes.value : {};
  const badgesData: any = badgesRes.status === "fulfilled" ? badgesRes.value : {};

  let calendar: Record<string, number> | undefined;
  const rawCal = main?.submissionCalendar;
  if (rawCal) {
    if (typeof rawCal === "string") {
      try { calendar = JSON.parse(rawCal); } catch { calendar = undefined; }
    } else if (typeof rawCal === "object") {
      calendar = rawCal;
    }
  }

  const cr =
    contestRaw?.userContestRanking ??
    contestRaw?.data?.userContestRanking ??
    null;

  const contest: ContestInfo | null =
    cr && typeof cr.rating === "number"
      ? {
          rating: cr.rating,
          globalRanking: cr.globalRanking,
          totalParticipants: cr.totalParticipants,
          topPercentage: cr.topPercentage,
          attendedContests: cr.attendedContestsCount,
          badge: cr.badge?.name ?? cr.badge ?? null,
        }
      : null;

  return {
    avatar: profile?.avatar,
    ranking: main?.ranking ?? profile?.ranking,
    totalSolved: main?.totalSolved ?? 0,
    easySolved: main?.easySolved ?? 0,
    mediumSolved: main?.mediumSolved ?? 0,
    hardSolved: main?.hardSolved ?? 0,
    totalQuestions: main?.totalQuestions,
    easyTotal: main?.totalEasy,
    mediumTotal: main?.totalMedium,
    hardTotal: main?.totalHard,
    acceptanceRate: profile?.acceptanceRate,
    submissionCalendar: calendar,
    contest,
    badges: Array.isArray(badgesData?.badges)
      ? badgesData.badges.slice(0, 8).map((b: any) => ({
          name: b?.displayName ?? b?.name,
          icon: b?.icon,
        }))
      : undefined,
  };
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
            {/* CSS custom properties work inside SVG style attributes */}
            <stop offset="0%"   style={{ stopColor: "hsl(var(--primary))" }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.65 }} />
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
  colorVar,
  animate,
  delay,
}: {
  label: string;
  solved: number;
  total: number;
  /** CSS custom property name pair, e.g. "easy" → uses --diff-easy and --diff-easy-end */
  colorVar: "easy" | "medium" | "hard";
  animate: boolean;
  delay: number;
}) => {
  const pct = total > 0 ? Math.min((solved / total) * 100, 100) : 0;
  const bg = `linear-gradient(90deg, var(--diff-${colorVar}), var(--diff-${colorVar}-end))`;
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
          style={{ background: bg }}
        />
      </div>
    </div>
  );
};

/* Rating tier — uses Tailwind dark-mode variants so contrast is right on both themes */
const getRatingTier = (rating: number): { label: string; color: string } => {
  if (rating < 1400) return { label: "Newcomer",         color: "text-muted-foreground" };
  if (rating < 1600) return { label: "Pupil",            color: "text-emerald-600 dark:text-emerald-400" };
  if (rating < 1900) return { label: "Specialist",       color: "text-sky-600 dark:text-sky-400" };
  if (rating < 2100) return { label: "Expert",           color: "text-violet-600 dark:text-violet-400" };
  if (rating < 2400) return { label: "Candidate Master", color: "text-orange-600 dark:text-orange-400" };
  return               { label: "Guardian",              color: "text-red-600 dark:text-red-400" };
};

/* ── Shared premium stat card ───────────────────────────── */
const StatCard = ({
  icon: Icon,
  label,
  value,
  suffix,
  animate,
  decimals,
  valueClass,
}: {
  icon: typeof Trophy;
  label: string;
  value?: number;
  suffix?: string;
  animate: boolean;
  decimals?: number;
  valueClass?: string;
}) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
    className="stat-card"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 shrink-0">
        <Icon className="text-primary" size={16} />
      </div>
      <p className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
        {label}
      </p>
    </div>
    <p className={`text-2xl font-heading font-bold tabular-nums ${valueClass ?? "text-foreground"}`}>
      <AnimatedNumber value={value} start={animate} suffix={suffix} decimals={decimals} />
    </p>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="stat-card h-[110px] animate-pulse bg-secondary/30" />
);

/* ── Activity Heatmap ────────────────────────────────────── */
type DayCell = { date: Date; key: string; count: number };

const buildYearCells = (calendar: Record<string, number>): DayCell[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay()));
  const start = new Date(end);
  start.setDate(start.getDate() - 52 * 7 - 6);
  const cells: DayCell[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const ts = Math.floor(cursor.getTime() / 1000);
    const key = cursor.toISOString().slice(0, 10);
    const count =
      calendar[String(ts)] ?? calendar[String(ts - (ts % 86400))] ?? 0;
    cells.push({ date: new Date(cursor), key, count });
    cursor.setDate(cursor.getDate() + 1);
  }
  return cells;
};

const bucketClass = (count: number) => {
  if (!count)  return "bg-secondary/60";
  if (count < 2) return "bg-primary/25";
  if (count < 4) return "bg-primary/45";
  if (count < 7) return "bg-primary/70";
  return "bg-primary";
};

const ActivityHeatmap = ({
  calendar,
  animate,
}: {
  calendar: Record<string, number>;
  animate: boolean;
}) => {
  const cells = useMemo(() => buildYearCells(calendar), [calendar]);
  const weeks: DayCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const monthLabels = useMemo(() => {
    const labels: { index: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const m = week[0]?.date.getMonth();
      if (m !== undefined && m !== lastMonth) {
        labels.push({ index: i, label: week[0]!.date.toLocaleString("en-US", { month: "short" }) });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  const totalSubmissions = cells.reduce((a, c) => a + c.count, 0);
  const activeDays = cells.filter((c) => c.count > 0).length;
  let currentStreak = 0;
  for (let i = cells.length - 1; i >= 0; i--) {
    if (cells[i].date > new Date()) continue;
    if (cells[i].count > 0) currentStreak++;
    else break;
  }
  let maxStreak = 0, run = 0;
  cells.forEach((c) => { if (c.count > 0) { run++; maxStreak = Math.max(maxStreak, run); } else run = 0; });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon size={16} className="text-primary" />
          <span>
            <span className="text-foreground font-semibold">{formatNum(totalSubmissions)}</span>{" "}
            submissions in the past year
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Active days: <span className="text-foreground font-semibold">{activeDays}</span></span>
          <span className="flex items-center gap-1">
            <Flame size={12} className="text-primary" />
            Streak: <span className="text-foreground font-semibold ml-1">{currentStreak}</span>
          </span>
          <span className="hidden sm:inline">
            Max: <span className="text-foreground font-semibold">{maxStreak}</span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          <div
            className="grid text-[10px] text-muted-foreground mb-1 ml-6"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, 12px)`, columnGap: 3 }}
          >
            {weeks.map((_, i) => {
              const label = monthLabels.find((m) => m.index === i);
              return <div key={i} className="h-3">{label ? label.label : ""}</div>;
            })}
          </div>

          <div className="flex gap-[3px]">
            <div className="flex flex-col gap-[3px] mr-1 text-[10px] text-muted-foreground w-4">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <div key={i} className="h-3 leading-3">{d}</div>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => {
                  const cell = week[di];
                  if (!cell) return <div key={di} className="w-3 h-3 rounded-[3px]" />;
                  const dateLabel = cell.date.toLocaleDateString("en-US", {
                    weekday: "short", month: "short", day: "numeric", year: "numeric",
                  });
                  return (
                    <motion.div
                      key={di}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(wi * 0.008, 0.6) }}
                      title={`${cell.count} submission${cell.count === 1 ? "" : "s"} on ${dateLabel}`}
                      className={`w-3 h-3 rounded-[3px] ${bucketClass(cell.count)} hover:ring-1 hover:ring-primary/60 transition`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground ml-6">
            <span>Less</span>
            {[0, 1, 3, 5, 9].map((c, i) => (
              <span key={i} className={`w-3 h-3 rounded-[3px] ${bucketClass(c)}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Contest Section ─────────────────────────────────────── */
const ContestSection = ({
  contest,
  animate,
}: {
  contest: ContestInfo | null | undefined;
  animate: boolean;
}) => {
  if (!contest) {
    return (
      <div className="stat-card text-center py-8">
        <Trophy className="mx-auto text-primary mb-3" size={24} />
        <p className="text-sm text-muted-foreground">Contest rating is not available yet.</p>
      </div>
    );
  }

  const tier = getRatingTier(contest.rating);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Contest rating — uses tier color for the number */}
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="stat-card"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 shrink-0">
            <Trophy className="text-primary" size={16} />
          </div>
          <p className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
            Contest Rating
          </p>
        </div>
        <p className={`text-2xl font-heading font-bold tabular-nums ${tier.color}`}>
          <AnimatedNumber value={contest.rating} start={animate} />
        </p>
        <p className={`text-[11px] mt-1 font-medium ${tier.color} opacity-75`}>
          {tier.label}
        </p>
      </motion.div>

      <StatCard icon={Award}     label="Global Rank"     value={contest.globalRanking}  animate={animate} />
      <StatCard icon={TrendingUp} label="Top Percentage" value={contest.topPercentage}  animate={animate} suffix="%" decimals={2} />
      <StatCard icon={Flame}     label="Contests"        value={contest.attendedContests} animate={animate} />

      {contest.badge && (
        <div className="col-span-2 md:col-span-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20">
          <Award size={16} className="text-primary" />
          <span className="text-sm text-foreground">
            Contest Badge: <span className="font-semibold">{contest.badge}</span>
          </span>
        </div>
      )}
    </div>
  );
};

/* ── Main Section ────────────────────────────────────────── */
const LeetCodeSection = () => {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    let alive = true;
    fetchLeetCode()
      .then((d) => { if (alive) setData(d); })
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const animate = inView && !!data && !loading;

  return (
    <section id="leetcode" aria-label="LeetCode Statistics" className="section-padding">
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
          className="bg-card border border-border rounded-2xl overflow-hidden"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Card header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center shrink-0">
                {data?.avatar ? (
                  <img
                    src={data.avatar}
                    alt={`${LEETCODE_USERNAME} avatar`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Code className="text-primary" size={20} />
                )}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground leading-tight">
                  {LEETCODE_USERNAME}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
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
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                         border border-border bg-secondary/60 text-foreground text-sm font-medium
                         hover:bg-primary hover:text-primary-foreground hover:border-primary
                         transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/20"
            >
              <Code size={15} /> View Profile
              <ExternalLink size={13} className="opacity-70" />
            </a>
          </div>

          <div className="p-6 md:p-8">
            {error && !data ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                Couldn't load LeetCode stats right now. Please try again later.
              </div>
            ) : (
              <>
                {/* Main grid: circular + difficulty bars */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
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
                        <DifficultyBar label="Easy"   solved={data.easySolved}   total={data.easyTotal ?? 0}   colorVar="easy"   animate={animate} delay={0.1} />
                        <DifficultyBar label="Medium" solved={data.mediumSolved} total={data.mediumTotal ?? 0} colorVar="medium" animate={animate} delay={0.2} />
                        <DifficultyBar label="Hard"   solved={data.hardSolved}   total={data.hardTotal ?? 0}   colorVar="hard"   animate={animate} delay={0.3} />
                      </>
                    )}
                  </div>
                </div>

                {/* Activity Heatmap */}
                <div className="mb-10">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Activity Calendar</h4>
                  {loading || !data ? (
                    <div className="h-40 rounded-xl bg-secondary/30 animate-pulse" />
                  ) : data.submissionCalendar && Object.keys(data.submissionCalendar).length > 0 ? (
                    <div className="rounded-xl border border-border/60 bg-secondary/20 px-4 py-5">
                      <ActivityHeatmap calendar={data.submissionCalendar} animate={animate} />
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border p-6 text-center text-sm text-muted-foreground">
                      Submission activity is not available right now.
                    </div>
                  )}
                </div>

                {/* Contest section */}
                <div className="mb-8">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Contest Performance</h4>
                  {loading || !data ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                  ) : (
                    <ContestSection contest={data.contest} animate={animate} />
                  )}
                </div>

                {/* Acceptance + Total */}
                {data?.acceptanceRate ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StatCard icon={Target} label="Acceptance" value={data.acceptanceRate} suffix="%" animate={animate} decimals={1} />
                    <StatCard icon={Code}   label="Total Solved" value={data.totalSolved}  animate={animate} />
                  </div>
                ) : null}

                {/* Badges */}
                {data?.badges && data.badges.length > 0 && (
                  <div className="mt-8">
                    <h4 className="font-heading font-semibold text-foreground mb-4">Badges</h4>
                    <div className="flex flex-wrap gap-3">
                      {data.badges.map((b, i) => (
                        <motion.div
                          key={`${b.name}-${i}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={animate ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.1 * i, duration: 0.4 }}
                          className="flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-secondary/40 text-xs text-foreground"
                        >
                          {b.icon ? (
                            <img src={b.icon} alt="" className="w-5 h-5 rounded-full" loading="lazy" />
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeetCodeSection;
