import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { ArrowDown, ArrowRight, Download, Github, Linkedin, Code } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

interface TypewriterTextProps {
  phrases: string[];
  typeSpeed?: number;
  eraseSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  className?: string;
}

const TypewriterText = ({
  phrases,
  typeSpeed = 55,
  eraseSpeed = 30,
  pauseDuration = 1500,
  loop = true,
  className = "",
}: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timerRef = useRef<number>();

  const longestPhrase = useMemo(
    () => phrases.reduce((a, b) => (a.length >= b.length ? a : b), ""),
    [phrases]
  );

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    if (isTyping) {
      if (displayed.length < currentPhrase.length) {
        timerRef.current = window.setTimeout(() => {
          setDisplayed(currentPhrase.slice(0, displayed.length + 1));
        }, typeSpeed);
      } else {
        timerRef.current = window.setTimeout(() => setIsTyping(false), pauseDuration);
      }
    } else {
      if (displayed.length > 0 && loop) {
        timerRef.current = window.setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, eraseSpeed);
      } else {
        timerRef.current = window.setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setIsTyping(true);
        }, 300);
      }
    }
    return () => window.clearTimeout(timerRef.current);
  }, [displayed, isTyping, phraseIndex, phrases, typeSpeed, eraseSpeed, pauseDuration, loop]);

  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="invisible whitespace-nowrap" aria-hidden="true">
        {longestPhrase}
      </span>
      <span className={`absolute left-0 top-0 whitespace-nowrap ${className}`}>
        {displayed}
        <span
          className="inline-block w-[3px] h-[1em] bg-primary align-middle ml-1 animate-blink-cursor"
          aria-hidden="true"
        />
      </span>
    </span>
  );
};

const socials = [
  { href: "https://github.com/Mohitkumar44", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/mohit-kumar-84354032a/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://leetcode.com/u/Mohit_Kumar_Rath/", label: "LeetCode", Icon: Code },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-dvh flex items-center section-padding pt-32 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs text-primary font-medium">Open to Internships & SDE Roles</span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-6 tracking-tight"
            aria-label="Mohit Kumar — Information Technology Student and Competitive Programmer"
          >
            <span className="text-foreground">Mohit </span>
            <span className="text-primary">Kumar</span>
            <br />
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold">
              <TypewriterText
                phrases={["Data Structures & Algorithms", "Full Stack Developer", "AI Engineer"]}
                className="text-muted-foreground"
              />
            </span>
          </h1>

          <p className="text-base md:text-lg text-foreground/90 mb-3 max-w-xl font-medium">
            Information Technology Student · Competitive Programmer · C++ · Data Structures &amp; Algorithms · Frontend Development
          </p>
          <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-xl leading-relaxed">
            I enjoy solving algorithmic problems, building responsive web applications, and continuously improving my software engineering skills.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-secondary/40 text-foreground font-semibold hover:border-primary hover:bg-secondary/60 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} profile (opens in new tab)`}
                className="p-2.5 rounded-lg border border-border bg-secondary/40 text-muted-foreground hover:text-primary hover:border-primary hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl"
            />
            <div className="relative w-64 h-72 md:w-80 md:h-96 rounded-2xl overflow-hidden glow-border">
              <img
                src={profileImg}
                alt="Mohit Kumar — B.Tech IT Student and Full Stack Developer"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 glass-card rounded-xl px-4 py-2 shadow-lg">
              <p className="text-sm font-semibold text-foreground">B.Tech Student</p>
              <p className="text-xs text-primary">REC Banda · 2028</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        aria-hidden="true"
      >
        <ArrowDown className="text-muted-foreground" size={22} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
