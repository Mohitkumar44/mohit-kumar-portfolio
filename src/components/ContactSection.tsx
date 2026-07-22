import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, CheckCircle, Code, MapPin, Copy, Check } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_n64gr5j";
const TEMPLATE_ID = "template_n3j9roc";
const PUBLIC_KEY = "vDp6zV3u-flS-iBiH";

const EMAIL = "mohitkumar.rec@gmail.com";
const LOCATION = "Banda, Uttar Pradesh, India";
const LINKEDIN = "https://www.linkedin.com/in/mohit-kumar-84354032a/";
const GITHUB = "https://github.com/Mohitkumar44";
const LEETCODE = "https://leetcode.com/u/Mohit_Kumar_Rath/";

interface ContactItem {
  Icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  copyValue?: string;
}

const contactItems: ContactItem[] = [
  { Icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, copyValue: EMAIL },
  { Icon: MapPin, label: "Location", value: LOCATION, copyValue: LOCATION },
  { Icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/mohit-kumar", href: LINKEDIN, copyValue: LINKEDIN },
  { Icon: Github, label: "GitHub", value: "github.com/Mohitkumar44", href: GITHUB, copyValue: GITHUB },
  { Icon: Code, label: "LeetCode", value: "leetcode.com/u/Mohit_Kumar_Rath", href: LEETCODE, copyValue: LEETCODE },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      /* ignore */
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" aria-label="Contact Information" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium mb-2">Contact</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 tracking-tight">
            Get In <span className="text-gradient">Touch</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I welcome inquiries regarding internships, collaborations, and discussions on software engineering.
              Reach out via any channel below — I&apos;ll respond promptly.
            </p>

            <ul className="space-y-3">
              {contactItems.map(({ Icon, label, value, href, copyValue }) => {
                const key = label;
                const copied = copiedKey === key;
                const inner = (
                  <>
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <Icon className="text-primary" size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="text-sm text-foreground truncate">{value}</p>
                    </div>
                  </>
                );
                return (
                  <li key={key} className="flex items-stretch gap-2">
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 flex-1 glass-card rounded-xl p-4 hover:glow-border hover:-translate-y-0.5 transition-all"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 flex-1 glass-card rounded-xl p-4">
                        {inner}
                      </div>
                    )}
                    {copyValue && (
                      <button
                        type="button"
                        onClick={() => copy(key, copyValue)}
                        aria-label={`Copy ${label}`}
                        className="shrink-0 px-3 rounded-xl border border-border bg-secondary/40 text-muted-foreground hover:text-primary hover:border-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 md:p-8 space-y-5"
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="contact-name" className="text-sm font-medium text-foreground mb-2 block">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-sm font-medium text-foreground mb-2 block">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="text-sm font-medium text-foreground mb-2 block">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                placeholder="Tell me about the role or project..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {sent ? (
                <>
                  Message Sent! <CheckCircle size={16} />
                </>
              ) : sending ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
