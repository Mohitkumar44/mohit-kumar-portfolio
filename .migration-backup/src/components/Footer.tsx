import { Github, Linkedin, Code, ArrowUp, Heart } from "lucide-react";

const Footer = () => {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer aria-label="Footer" className="relative border-t border-border/60 mt-10">
      <div className="section-padding !py-12">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3 items-start">
          <div>
            <p className="text-lg font-heading font-bold text-gradient">Mohit Kumar</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Information Technology student, competitive programmer, and aspiring Software Engineer.
            </p>
          </div>

          <div className="flex md:justify-center">
            <div className="flex items-center gap-3">
              <a
                href="https://leetcode.com/u/Mohit_Kumar_Rath/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode profile"
                className="p-2.5 rounded-lg border border-border bg-secondary/40 text-muted-foreground hover:text-primary hover:border-primary hover:-translate-y-0.5 transition-all"
              >
                <Code size={16} />
              </a>
              <a
                href="https://github.com/Mohitkumar44"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-2.5 rounded-lg border border-border bg-secondary/40 text-muted-foreground hover:text-primary hover:border-primary hover:-translate-y-0.5 transition-all"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/mohit-kumar-84354032a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-2.5 rounded-lg border border-border bg-secondary/40 text-muted-foreground hover:text-primary hover:border-primary hover:-translate-y-0.5 transition-all"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div className="flex md:justify-end">
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary/40 text-sm text-foreground hover:text-primary hover:border-primary hover:-translate-y-0.5 transition-all"
            >
              <ArrowUp size={14} /> Back to Top
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Mohit Kumar. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart size={12} className="text-primary fill-primary" /> using React + TypeScript + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
