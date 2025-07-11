import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code, 
  Globe, 
  Server, 
  Smartphone, 
  Database, 
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'Bespoke software solutions tailored to your business requirements using modern technologies and best practices.',
      features: [
        'Full-stack web applications',
        'Desktop application development',
        'API development and integration',
        'Legacy system modernization'
      ],
      technologies: ['React', 'Node.js', 'Python', 'Java', '.NET']
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Professional websites and web applications that deliver exceptional user experiences and drive business growth.',
      features: [
        'Responsive web design',
        'E-commerce solutions',
        'Content management systems',
        'Progressive web apps (PWA)'
      ],
      technologies: ['React', 'Vue.js', 'Angular', 'WordPress', 'Shopify']
    },
    {
      icon: Server,
      title: 'IT Consulting',
      description: 'Strategic technology consulting to help your business leverage the right solutions for optimal performance.',
      features: [
        'Technology strategy planning',
        'System architecture design',
        'Performance optimization',
        'Digital transformation guidance'
      ],
      technologies: ['Cloud Platforms', 'DevOps', 'Microservices', 'Scalability']
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that engage users and expand your business reach.',
      features: [
        'iOS and Android development',
        'Cross-platform solutions',
        'Mobile UI/UX design',
        'App store optimization'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
    },
    {
      icon: Database,
      title: 'Database Solutions',
      description: 'Robust database design, optimization, and management services to ensure data integrity and performance.',
      features: [
        'Database design and modeling',
        'Performance optimization',
        'Data migration services',
        'Backup and recovery solutions'
      ],
      technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis']
    },
    {
      icon: Shield,
      title: 'Security & Maintenance',
      description: 'Comprehensive security audits and ongoing maintenance to keep your systems secure and up-to-date.',
      features: [
        'Security audits and testing',
        'Regular updates and patches',
        '24/7 monitoring and support',
        'Disaster recovery planning'
      ],
      technologies: ['SSL/TLS', 'OAuth', 'Encryption', 'Monitoring Tools']
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-hero font-bold">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            Comprehensive software development and IT solutions designed to accelerate your business growth and digital transformation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="card-shadow hover-scale">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{service.description}</p>
                
                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Technologies */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <Card className="card-gradient card-shadow">
          <CardContent className="p-12">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-title font-bold">Our Development Process</h2>
              <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
                We follow a proven methodology to ensure project success and client satisfaction.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Discovery', description: 'Understanding your requirements and goals' },
                { step: '02', title: 'Planning', description: 'Creating detailed project roadmap and timeline' },
                { step: '03', title: 'Development', description: 'Building your solution with regular updates' },
                { step: '04', title: 'Delivery', description: 'Testing, deployment, and ongoing support' }
              ].map((phase, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary-foreground font-bold">{phase.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="tech-gradient card-shadow">
            <CardContent className="p-12 space-y-6">
              <h2 className="text-title font-bold text-card-dark-foreground">
                Ready to Get Started?
              </h2>
              <p className="text-subtitle text-card-dark-foreground/80 max-w-2xl mx-auto">
                Let's discuss your project requirements and create a solution that drives your business forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" variant="accent">
                  Request a Quote
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="xl" variant="glass">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;