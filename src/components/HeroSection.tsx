import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

interface TypewriterTextProps {
  phrases: string[];
  typeSpeed?: number;
  eraseSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  onComplete?: () => void;
}

const TypewriterText = ({
  phrases,
  typeSpeed = 80,
  eraseSpeed = 50,
  pauseDuration = 1500,
  loop = true,
  onComplete,
}: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const completedRef = useRef(false);

  const longestPhrase = useMemo(
    () => phrases.reduce((a, b) => (a.length >= b.length ? a : b), ""),
    [phrases]
  );

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: number | undefined;

    if (isTyping) {
      if (displayed.length < currentPhrase.length) {
        timer = window.setInterval(() => {
          setDisplayed(currentPhrase.slice(0, displayed.length + 1));
        }, typeSpeed);
      } else {
        timer = window.setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (displayed.length > 0) {
        if (loop) {
          timer = window.setInterval(() => {
            setDisplayed(displayed.slice(0, -1));
          }, eraseSpeed);
        } else if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
          timer = window.setTimeout(() => {
            setShowCursor(false);
          }, 1200);
        }
      } else {
        timer = window.setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setIsTyping(true);
        }, 300);
      }
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [
    displayed,
    isTyping,
    phraseIndex,
    phrases,
    typeSpeed,
    eraseSpeed,
    pauseDuration,
    loop,
    onComplete,
  ]);

  return (
    <span className="relative inline-block">
      {/* Hidden sizing ghost prevents layout shift while typing/erasing */}
      <span className="invisible" aria-hidden="true">
        {longestPhrase}
      </span>
      <span className="absolute left-0 top-0">
        {displayed}
        {showCursor && (
          <span
            className="inline-block w-[3px] h-[1em] bg-primary align-middle ml-1 animate-blink-cursor"
            aria-hidden="true"
          />
        )}
      </span>
    </span>
  );
};

const HeroSection = () => {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="min-h-screen flex items-center section-padding pt-32"
    >
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">
              Open to Opportunities
            </span>
          </div>

          <h1
            className="text-amber-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6"
            aria-label="Mohit Kumar, Data Structures & Algorithms and Full Stack Developer"
          >
            <span className="text-gradient">
              <TypewriterText phrases={["Mohit Kumar"]} loop={false} />
            </span>
            <br />
            <span className="text-gradient text-3xl md:text-4xl lg:text-5xl">
              <TypewriterText
                phrases={["Data Structures & Algorithms", "Full Stack Developer"]}
              />
            </span>
          </h1>

          <p className="text-lg text-muted-..."
