import { motion } from "framer-motion";
import { Code2, Target, Lightbulb } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" aria-label="About Mohit Kumar" className="section-padding">
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

            <p className="text-muted-foreground leading-relaxed mb-6">
              Mohit Kumar is a B.Tech undergraduate at Rajkiya Engineering College, Banda, specializing in Computer Science. His primary areas of focus include Full Stack Web Development and algorithmic problem-solving using Data Structures & Algorithms. He is committed to engineering efficient, scalable, and maintainable web applications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With proficiency in C++, Python, and modern web technologies, Mohit is dedicated to advancing his expertise as a Full Stack Engineer. He actively pursues emerging technologies, frameworks, and industry best practices to remain at the forefront of the software development landscape.
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
              desc: "Architecting and developing end-to-end web applications using modern technology stacks."
            },
            {
              icon: Target,
              title: "Algorithmic Problem Solving",
              desc: "Proficient in Data Structures & Algorithms with a focus on optimized solutions in C++."
            },
            {
              icon: Lightbulb,
              title: "Continuous Professional Development",
              desc: "Actively researching and adopting emerging frameworks, tools, and engineering best practices."
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