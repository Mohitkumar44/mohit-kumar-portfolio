import { motion } from "framer-motion";
import { Code2, Target, Lightbulb } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <p className="text-primary text-sm font-medium mb-2">About Me</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12">
            Know Who I <span className="text-gradient">Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>

            <p className="text-muted-foreground leading-relaxed mb-6">Mohit is a B.Tech student at Rajkiya Engineering College Banda, passionate about Full Stack Development and problem solving using Data Structures & Algorithms. He is focused on building efficient, scalable web applications while continuously improving his programming expertise.




            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a strong foundation in C++, Python, and web technologies, Mohit aims to become a
              skilled Full Stack Engineer. He is constantly exploring new technologies and frameworks
              to stay ahead in the ever-evolving tech landscape.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-4">

            {[
            {
              icon: Code2,
              title: "Full Stack Development",
              desc: "Building end-to-end web applications with modern technologies."
            },
            {
              icon: Target,
              title: "DSA Expert",
              desc: "Strong problem-solving skills with Data Structures & Algorithms in C++."
            },
            {
              icon: Lightbulb,
              title: "Continuous Learner",
              desc: "Always exploring new frameworks, tools, and best practices."
            }].
            map((item) =>
            <div key={item.title} className="glass-card rounded-xl p-5 flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>);

};

export default AboutSection;