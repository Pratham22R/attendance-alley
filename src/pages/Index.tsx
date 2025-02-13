
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ChartBar, Users, Clock, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Easy Student Management",
    description: "Effortlessly manage student records and attendance data in one place"
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Real-time Tracking",
    description: "Track attendance in real-time with instant updates and notifications"
  },
  {
    icon: <ChartBar className="w-6 h-6 text-primary" />,
    title: "Detailed Analytics",
    description: "Generate comprehensive reports and analyze attendance patterns"
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    title: "Academic Integration",
    description: "Seamlessly integrate with your existing academic management system"
  }
];

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            Attendance Made Simple
          </span>
          <h1 className="mt-8 text-5xl font-bold leading-tight">
            Modern Student Attendance Management System
          </h1>
          <p className="mt-6 text-lg text-neutral-600">
            Streamline your attendance tracking process with our intuitive and powerful management system.
            Save time, reduce errors, and focus on what matters most - education.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button className="button-primary flex items-center gap-2 group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="button-secondary">Learn More</button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold">Everything you need to manage attendance</h2>
            <p className="mt-4 text-neutral-600">
              Powerful features to make attendance tracking effortless and accurate
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-primary rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-90" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to transform your attendance management?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of educational institutions that trust our system for their attendance management needs.
            </p>
            <button 
              className="bg-white text-primary hover:bg-neutral-100 px-8 py-4 rounded-lg font-medium transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
