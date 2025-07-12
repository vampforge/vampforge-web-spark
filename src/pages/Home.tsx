import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FloatingCard } from '@/components/ui/floating-card';
import { ArrowRight, Code, Zap, Shield, Users, Star, ChevronDown, Rocket } from 'lucide-react';
import CustomerReviews from '@/components/CustomerReviews';
import heroImage from '@/assets/hero-image.jpg';
import vampforgeLogo from '@/assets/vampforge-logo.png';

const Home = () => {
  const features = [
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'Tailored solutions built with cutting-edge technologies to meet your specific business needs.',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Rapid development cycles with agile methodologies ensuring quick time-to-market.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and reliability built into every solution we deliver.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced developers and consultants dedicated to your project success.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/30 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 glass-card rounded-full text-sm font-medium text-primary">
                <Star className="w-4 h-4 mr-2" />
                Welcome to the Future of Software Development
              </div>
              
              <h1 className="text-4xl lg:text-hero font-bold bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent leading-tight">
                Building Tomorrow's
                <br />
                <span className="neon-text">Digital Solutions</span>
              </h1>
              
              <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
                VAMPForge delivers cutting-edge software development and IT consulting services 
                that transform your ideas into powerful digital experiences.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/contact">
                <Button size="lg" className="glass-button text-lg px-8 py-4 group">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link to="/services">
                <Button variant="outline" size="lg" className="glass-button text-lg px-8 py-4">
                  Explore Services
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {[
                { number: '100+', label: 'Projects Delivered' },
                { number: '50+', label: 'Happy Clients' },
                { number: '24/7', label: 'Support Available' },
                { number: '99.9%', label: 'Uptime Guarantee' }
              ].map((stat, index) => (
                <FloatingCard key={index} variant="glass" className="text-center p-4">
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </FloatingCard>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-title font-bold">Why Choose VAMPForge?</h2>
            <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
              We combine technical expertise with innovative thinking to deliver solutions that exceed expectations.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="card-shadow hover-scale">
                  <CardContent className="p-6 text-center space-y-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 primary-gradient rounded-xl flex items-center justify-center mx-auto"
                    >
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Credentials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-title font-bold contrast-heading">
              Trusted & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Certified</span>
            </h2>
            <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards of quality and security in our development processes.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'ISO 9001 Certified', icon: Shield },
              { name: 'Security Compliant', icon: Shield },
              { name: '24/7 Support', icon: Zap },
              { name: 'Agile Methodology', icon: Rocket }
            ].map((credential, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 primary-gradient rounded-xl flex items-center justify-center mx-auto glass-card"
                >
                  <credential.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <p className="text-sm font-medium contrast-text">{credential.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="tech-gradient card-shadow">
              <CardContent className="p-12 text-center space-y-6">
                <h2 className="text-title font-bold text-card-dark-foreground">
                  Ready to Start Your Next Project?
                </h2>
                <p className="text-subtitle text-card-dark-foreground/80 max-w-2xl mx-auto">
                  Let's discuss your ideas and turn them into reality. Contact our team today for a free consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="xl" variant="accent" className="hover-scale">
                    <Link to="/contact">
                      Start Your Project
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="xl" variant="glass" className="hover-scale">
                    <Link to="/about">
                      Learn More About Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;