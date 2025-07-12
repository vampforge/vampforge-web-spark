import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FloatingCard } from '@/components/ui/floating-card';
import { ArrowRight, Code, Zap, Shield, Users, Star, ChevronDown, Rocket, CheckCircle, Clock, Briefcase } from 'lucide-react';
import CustomerReviews from '@/components/CustomerReviews';
import heroImage from '@/assets/hero-image.jpg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !ctaRef.current || !gradientRef.current) return;

    // Hero gradient animation
    gsap.to(gradientRef.current, {
      backgroundPosition: "200% center",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom center",
        scrub: true
      }
    });

    // Hero title animation
    gsap.fromTo(titleRef.current, 
      {
        opacity: 0,
        y: 30,
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: 0.2,
        ease: "power2.out"
      }
    );

    // CTA buttons animation
    gsap.fromTo(ctaRef.current, 
      {
        opacity: 0,
        scale: 0.95,
        y: 20
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out"
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
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
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div 
          ref={gradientRef}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"
          style={{ backgroundSize: "400% 400%", backgroundPosition: "0% center" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_50%)]" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-pulse delay-500" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 glass-card rounded-full text-sm font-medium text-primary">
                <Star className="w-4 h-4 mr-2" />
                Welcome to the Future of Software Development
              </div>
              
              <h1 ref={titleRef} className="text-4xl lg:text-hero font-bold bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent leading-tight drop-shadow-lg">
                Building Tomorrow's
                <br />
                <span className="neon-text">Digital Solutions</span>
              </h1>
              
              <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto drop-shadow-sm">
                VAMPForge delivers cutting-edge software development and IT consulting services 
                that transform your ideas into powerful digital experiences.
              </p>
            </div>
            
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/contact">
                <Button size="lg" className="glass-button text-lg px-8 py-4 group shadow-lg hover:shadow-primary/25">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link to="/services">
                <Button variant="outline" size="lg" className="glass-button text-lg px-8 py-4 shadow-lg">
                  Explore Services
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-8 pt-12"
            >
              <div className="flex items-center space-x-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary drop-shadow-sm" />
                <span className="text-sm drop-shadow-sm">5+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Star className="w-5 h-5 text-primary drop-shadow-sm" />
                <span className="text-sm drop-shadow-sm">50+ Projects Delivered</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users className="w-5 h-5 text-primary drop-shadow-sm" />
                <span className="text-sm drop-shadow-sm">100% Client Satisfaction</span>
              </div>
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
          
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center"
            >
              {[
                { name: 'Security Certified', icon: Shield },
                { name: '24/7 Support', icon: Clock },
                { name: 'Quality Assured', icon: CheckCircle },
                { name: 'Professional Service', icon: Briefcase },
              ].map((cert, index) => (
                <div key={cert.name} className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <cert.icon className="w-8 h-8 text-primary drop-shadow-sm" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground text-center drop-shadow-sm">
                    {cert.name}
                  </span>
                </div>
              ))}
            </motion.div>
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