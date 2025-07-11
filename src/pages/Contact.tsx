import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '7464003631',
      description: 'Call us for immediate assistance'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'support@vampforge.site',
      description: 'Drop us a line anytime'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Remote Services Worldwide',
      description: 'Serving clients globally'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 9AM - 6PM',
      description: '24/7 support available'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-hero font-bold">
            Contact <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            Ready to start your next project? Get in touch with our team and let's discuss how we can help bring your vision to life.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="card-shadow hover-scale">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 primary-gradient rounded-xl flex items-center justify-center mx-auto">
                  <info.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                  <p className="text-primary font-medium">{info.details}</p>
                  <p className="text-sm text-muted-foreground mt-2">{info.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>Founder Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Aman Jaiswal</h4>
                  <p className="text-muted-foreground text-sm">Founder & Lead Developer</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-sm">7464003631</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm">support@vampforge.site</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Feel free to reach out directly for project discussions, technical consultations, 
                  or any questions about our services.
                </p>
              </CardContent>
            </Card>

            <Card className="tech-gradient card-shadow">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-bold text-card-dark-foreground">
                  What Happens Next?
                </h3>
                <div className="space-y-3 text-card-dark-foreground/90">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                      1
                    </div>
                    <p className="text-sm">We'll review your message within 24 hours</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                      2
                    </div>
                    <p className="text-sm">Schedule a consultation call to discuss your needs</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                      3
                    </div>
                    <p className="text-sm">Provide a detailed proposal with timeline and pricing</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                      4
                    </div>
                    <p className="text-sm">Begin development with regular progress updates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Quick Response Guarantee</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We understand that time is valuable. That's why we guarantee a response to all 
                  inquiries within 24 hours during business days. For urgent matters, feel free 
                  to call us directly.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium">Average response time: 4 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;