import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CreditCard, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Service Description',
      content: [
        'VAMPForge provides custom software development, web development, and IT consulting services',
        'All services are delivered according to agreed specifications and timelines',
        'We maintain professional standards and follow industry best practices',
        'Support and maintenance services are available as per service agreements'
      ]
    },
    {
      icon: CreditCard,
      title: 'Payment Terms',
      content: [
        'Payment terms are specified in individual project agreements',
        'Invoices are typically due within 30 days of issuance',
        'Late payments may incur additional charges as specified in agreements',
        'All prices are quoted in the currency specified in the project proposal'
      ]
    },
    {
      icon: Shield,
      title: 'Intellectual Property',
      content: [
        'Client retains ownership of their data and custom-developed solutions',
        'VAMPForge retains rights to general methodologies and frameworks',
        'Third-party software and libraries are subject to their respective licenses',
        'Confidentiality agreements protect both parties\' proprietary information'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Limitations of Liability',
      content: [
        'Our liability is limited to the value of services provided',
        'We are not liable for indirect, consequential, or incidental damages',
        'Force majeure events are excluded from liability',
        'Client is responsible for data backup and recovery procedures'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Service Level Agreement',
      content: [
        'We aim to provide 99.9% uptime for hosted services',
        'Response times for support requests are defined in service agreements',
        'Regular maintenance windows are scheduled with advance notice',
        'Emergency support is available for critical issues'
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
            Terms of <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
            These terms govern your use of VAMPForge services. Please read them carefully before engaging our services.
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
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 space-y-6"
        >
          <Card className="card-shadow">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-4">Agreement Acceptance</h2>
              <p className="text-muted-foreground mb-4">
                By using VAMPForge services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <p className="text-muted-foreground">
                These terms may be updated from time to time. Continued use of our services constitutes acceptance of any changes.
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient card-shadow">
            <CardContent className="p-8 text-center space-y-4">
              <h2 className="text-title font-bold">Questions?</h2>
              <p className="text-muted-foreground">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> support@vampforge.site</p>
                <p><strong>Phone:</strong> 7464003631</p>
                <p><strong>Founder:</strong> Aman Jaiswal</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;