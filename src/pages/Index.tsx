
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ChartBar, Users, Clock, ArrowRight, Github, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

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

const NavLink = ({ children }: { children: React.ReactNode }) => (
  <a href="#" className="text-neutral-600 hover:text-primary transition-colors duration-200">
    {children}
  </a>
);

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl">AttendanceAlley</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <NavLink>Home</NavLink>
              <NavLink>Features</NavLink>
              <NavLink>Pricing</NavLink>
              <NavLink>Contact</NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow grid lg:grid-cols-2 gap-12 container mx-auto px-4 py-12">
        <div className="flex items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
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
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <AuthForm />
        </div>
      </main>

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

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-8 h-8 text-primary" />
                <span className="font-bold text-xl">AttendanceAlley</span>
              </div>
              <p className="text-neutral-600">
                Simplifying attendance management for educational institutions worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><NavLink>Features</NavLink></li>
                <li><NavLink>Pricing</NavLink></li>
                <li><NavLink>Integration</NavLink></li>
                <li><NavLink>Documentation</NavLink></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><NavLink>About Us</NavLink></li>
                <li><NavLink>Careers</NavLink></li>
                <li><NavLink>Blog</NavLink></li>
                <li><NavLink>Legal</NavLink></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <NavLink>support@attendancealley.com</NavLink>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <NavLink>+1 (555) 123-4567</NavLink>
                </li>
                <li className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <NavLink>Github</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-100 text-center text-neutral-600">
            <p>&copy; 2024 AttendanceAlley. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
