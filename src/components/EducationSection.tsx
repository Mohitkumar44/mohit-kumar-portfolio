import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium mb-2">Education</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12">
            Academic <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="glass-card rounded-2xl p-8 glow-border">
            <div className="flex items-start gap-5">
              <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                <GraduationCap className="text-primary" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  B.Tech — Bachelor of Technology
                </h3>
                <p className="text-primary font-medium mt-1">
                  Rajkiya Engineering College Banda
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Expected Graduation: 2028
                </p>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  Focusing on Computer Science fundamentals, Data Structures & Algorithms, and Full
                  Stack Web Development alongside the core engineering curriculum.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
