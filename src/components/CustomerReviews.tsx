import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  name: string;
  company: string;
  rating: number;
  quote: string;
  project: string;
}

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      rating: 5,
      quote: "VAMPForge transformed our business with their custom CRM solution. The team's expertise and attention to detail exceeded our expectations. Our productivity increased by 40% within the first month!",
      project: "Custom CRM Development"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "GreenEarth Logistics",
      rating: 5,
      quote: "Outstanding web development service! They created a beautiful, responsive website that perfectly represents our brand. The SEO optimization helped us reach 300% more customers online.",
      project: "E-commerce Website"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "DataFlow Analytics",
      rating: 5,
      quote: "The IT consulting services provided by VAMPForge were exceptional. They helped us modernize our entire infrastructure and reduced our operational costs by 35%. Highly recommended!",
      project: "IT Infrastructure Consulting"
    },
    {
      id: 4,
      name: "James Wilson",
      company: "FinanceFirst Bank",
      rating: 5,
      quote: "Professional, reliable, and innovative. VAMPForge delivered our mobile banking app ahead of schedule with features we didn't even know we needed. Customer satisfaction increased significantly.",
      project: "Mobile Banking Application"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      company: "HealthCare Plus",
      rating: 5,
      quote: "Working with VAMPForge was a game-changer for our healthcare management system. Their team understood our complex requirements and delivered a solution that streamlined our entire workflow.",
      project: "Healthcare Management System"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-title font-bold">
            What Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with VAMPForge.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Review Display */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="card-shadow">
                  <CardContent className="p-8 md:p-12">
                    <div className="text-center space-y-6">
                      {/* Quote Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto"
                      >
                        <Quote className="w-8 h-8 text-primary-foreground" />
                      </motion.div>

                      {/* Rating */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center space-x-1"
                      >
                        {renderStars(reviews[currentIndex].rating)}
                      </motion.div>

                      {/* Quote */}
                      <motion.blockquote
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-muted-foreground italic leading-relaxed"
                      >
                        "{reviews[currentIndex].quote}"
                      </motion.blockquote>

                      {/* Author Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                      >
                        <p className="font-semibold text-foreground">
                          {reviews[currentIndex].name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {reviews[currentIndex].company}
                        </p>
                        <p className="text-xs text-primary font-medium">
                          Project: {reviews[currentIndex].project}
                        </p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Auto-play indicator */}
          {isAutoPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4"
            >
              <p className="text-xs text-muted-foreground">
                ● Auto-playing reviews • Click arrows to pause
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;