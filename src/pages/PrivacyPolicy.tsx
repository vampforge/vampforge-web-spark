import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Database, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: [
        'Personal information such as name, email address, and phone number when you contact us or use our services',
        'Technical information including IP address, browser type, and device information',
        'Usage data about how you interact with our website and services',
        'Project-related information necessary to deliver our software development services'
      ]
    },
    {
      icon: Database,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our software development services',
        'To communicate with you about projects, updates, and support',
        'To improve our services and develop new features',
        'To comply with legal obligations and protect our rights'
      ]
    },
    {
      icon: Shield,
      title: 'Data Protection',
      content: [
        'We implement industry-standard security measures to protect your data',
        'All data transmission is encrypted using SSL/TLS protocols',
        'Access to personal information is restricted to authorized personnel only',
        'We regularly review and update our security practices'
      ]
    },
    {
      icon: FileText,
      title: 'Your Rights',
      content: [
        'Right to access your personal information',
        'Right to correct inaccurate or incomplete data',
        'Right to request deletion of your personal information',
        'Right to restrict or object to processing of your data'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-4xl lg:text-hero font-bold">
            Privacy <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how VAMPForge collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: January 2025
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">{item}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="card-gradient card-shadow">
            <CardContent className="p-8 text-center space-y-4">
              <h2 className="text-title font-bold">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> support@vampforge.site</p>
                <p><strong>Phone:</strong> 7464003631</p>
                <p><strong>Company:</strong> VAMPForge Solutions</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;