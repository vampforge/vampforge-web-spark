import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, CheckCircle, ArrowRight, Calendar } from 'lucide-react';

interface ServiceDetails {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  detailedFeatures?: string[];
  benefits?: string[];
  process?: string[];
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetails | null;
  onScheduleCall: () => void;
}

const ServiceModal = ({ isOpen, onClose, service, onScheduleCall }: ServiceModalProps) => {
  if (!service) return null;

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3 text-2xl">
                  <div className="w-10 h-10 primary-gradient rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span>{service.title}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>

                {/* Detailed Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="card-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">What's Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="card-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">Technologies We Use</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {service.technologies.map((tech, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                            className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Custom Solutions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="card-gradient card-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Custom Solutions for {service.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Project Examples:</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {service.title.includes('Software') && (
                              <>
                                <li>• Custom CRM systems</li>
                                <li>• Enterprise management tools</li>
                                <li>• API integrations</li>
                                <li>• Database optimization</li>
                              </>
                            )}
                            {service.title.includes('Web') && (
                              <>
                                <li>• E-commerce platforms</li>
                                <li>• Corporate websites</li>
                                <li>• Progressive web apps</li>
                                <li>• Content management systems</li>
                              </>
                            )}
                            {service.title.includes('Consulting') && (
                              <>
                                <li>• Technology audits</li>
                                <li>• Architecture design</li>
                                <li>• Performance optimization</li>
                                <li>• Migration strategies</li>
                              </>
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Timeline:</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Discovery: 1-2 weeks</li>
                            <li>• Planning: 1-2 weeks</li>
                            <li>• Development: 4-12 weeks</li>
                            <li>• Testing & Launch: 1-2 weeks</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Button 
                    onClick={onScheduleCall}
                    className="flex-1" 
                    variant="hero"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule a Call
                  </Button>
                  <Button 
                    onClick={onClose}
                    className="flex-1" 
                    variant="outline"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;