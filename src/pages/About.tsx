import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Target, 
  Award, 
  Users, 
  Code, 
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import ProjectDialog from '@/components/ProjectDialog';
import CallDialog from '@/components/CallDialog';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Quality is at the core of everything we do, from code to customer service.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with clients as partners in their digital transformation journey.'
    },
    {
      icon: Lightbulb,
      title: 'Creativity',
      description: 'We think outside the box to solve complex problems with elegant solutions.'
    }
  ];

  const achievements = [
    { number: '50+', label: 'Successful Projects' },
    { number: '30+', label: 'Happy Clients' },
    { number: '5+', label: 'Years of Experience' },
    { number: '24/7', label: 'Support Available' }
  ];

  const skills = [
    'Full-Stack Development',
    'Cloud Architecture',
    'DevOps & CI/CD',
    'Mobile Development',
    'Database Design',
    'API Development',
    'UI/UX Design',
    'Security Implementation'
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-hero font-bold">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">VAMPForge</span>
          </h1>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            Founded on the principle of delivering innovative software solutions that transform businesses and drive growth in the digital age.
          </p>
        </div>

        {/* Founder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Aman Jaiswal</h2>
                <p className="text-muted-foreground">Founder & Lead Developer</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                With over 5 years of experience in software development and technology consulting, 
                Aman founded VAMPForge with a vision to bridge the gap between innovative technology 
                and practical business solutions.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                His expertise spans across full-stack development, cloud architecture, and emerging 
                technologies. Aman is passionate about creating scalable, secure, and user-friendly 
                solutions that help businesses thrive in the digital landscape.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="card-gradient card-shadow">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Technical Leadership</h3>
                  <p className="text-muted-foreground text-sm">
                    Leading by example with hands-on development and mentoring
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-primary">{achievement.number}</div>
                      <div className="text-xs text-muted-foreground">{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Section */}
        <Card className="tech-gradient card-shadow mb-16">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-title font-bold text-card-dark-foreground">Our Mission</h2>
            <p className="text-subtitle text-card-dark-foreground/90 max-w-4xl mx-auto leading-relaxed">
              To empower businesses with innovative software solutions that not only meet today's challenges 
              but also prepare them for tomorrow's opportunities. We believe technology should be an enabler, 
              not a barrier, and strive to make complex solutions simple and accessible.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="space-y-8 mb-16">
          <div className="text-center">
            <h2 className="text-title font-bold mb-4">Our Core Values</h2>
            <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define our relationship with clients and technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-shadow hover-scale">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 primary-gradient rounded-xl flex items-center justify-center mx-auto">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-title font-bold">Why Choose VAMPForge?</h2>
            <div className="space-y-4">
              {[
                'Personalized approach to every project',
                'Cutting-edge technology expertise',
                'Transparent communication throughout development',
                'Ongoing support and maintenance',
                'Competitive pricing with no hidden costs',
                'Agile development methodology'
              ].map((reason, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-muted-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="card-gradient card-shadow">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-xl font-semibold text-center">Ready to Work Together?</h3>
              <p className="text-muted-foreground text-center">
                Let's discuss how we can help transform your ideas into powerful digital solutions.
              </p>
              <div className="space-y-4">
                <ProjectDialog />
                <CallDialog />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;