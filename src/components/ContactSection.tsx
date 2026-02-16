import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:mohit.kumar162534@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium mb-2">Contact</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12">
            Get In <span className="text-gradient">Touch</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground mb-8">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat
              about technology and development!
            </p>

            <div className="space-y-4">
              <a
                href="mailto:mohit.kumar162534@gmail.com"
                className="flex items-center gap-4 glass-card rounded-xl p-4 hover:glow-border transition-all"
              >
                <Mail className="text-primary" size={20} />
                <span className="text-foreground text-sm">mohit.kumar162534@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mohit-kumar-84354032a/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card rounded-xl p-4 hover:glow-border transition-all"
              >
                <Linkedin className="text-primary" size={20} />
                <span className="text-foreground text-sm">LinkedIn Profile</span>
              </a>
              <a
                href="https://github.com/Mohitkumar44"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card rounded-xl p-4 hover:glow-border transition-all"
              >
                <Github className="text-primary" size={20} />
                <span className="text-foreground text-sm">GitHub Profile</span>
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 space-y-5"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Send Message <Send size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
