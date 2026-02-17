import { Github, Linkedin, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer aria-label="Footer" className="border-t border-border section-padding py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mohit Kumar. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://leetcode.com/u/Mohit_Kumar_Rath/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Code size={18} />
          </a>
          <a
            href="https://github.com/Mohitkumar44"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/mohit-kumar-84354032a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
