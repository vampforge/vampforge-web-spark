import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { emailService } from '@/components/EmailService';
import { useCMSData } from '@/hooks/useCMSData';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

const quoteSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  companyName: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  serviceNeeded: z.string().min(1, 'Please select a service'),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  projectDescription: z.string().min(10, 'Project description must be at least 10 characters'),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface RequestQuoteFormProps {
  onClose?: () => void;
}

export const RequestQuoteForm = ({ onClose }: RequestQuoteFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addFormResponse } = useCMSData();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const serviceNeeded = watch('serviceNeeded');
  const budgetRange = watch('budgetRange');

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      // Store in CMS
      addFormResponse({
        name: data.fullName,
        email: data.email,
        type: 'quote',
        status: 'unread',
        data: {
          companyName: data.companyName,
          serviceNeeded: data.serviceNeeded,
          budgetRange: data.budgetRange,
          projectDescription: data.projectDescription,
        },
      });

      // Send emails using EmailJS
      const emailData = {
        name: data.fullName,
        email: data.email,
        message: `Quote Request Details:
        
Company: ${data.companyName || 'Not specified'}
Service Needed: ${data.serviceNeeded}
Budget Range: ${data.budgetRange}
Project Description: ${data.projectDescription}`,
        formType: 'quote' as const,
      };

      await emailService.sendEmail(emailData);

      toast({
        title: "Quote Request Submitted!",
        description: "We'll get back to you within 24 hours with a detailed quote.",
      });

      reset();
      onClose?.();
    } catch (error) {
      console.error('Quote submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center gradient-text">
          Request a Quote
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Tell us about your project and we'll provide a detailed quote
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              {...register('fullName')}
              placeholder="Enter your full name"
              className="glass-input"
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              {...register('companyName')}
              placeholder="Your company name (optional)"
              className="glass-input"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your.email@example.com"
              className="glass-input"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Service Needed */}
          <div className="space-y-2">
            <Label htmlFor="serviceNeeded">Service Needed *</Label>
            <Select
              value={serviceNeeded}
              onValueChange={(value) => setValue('serviceNeeded', value)}
            >
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="glass-dropdown">
                <SelectItem value="website-development">Website Development</SelectItem>
                <SelectItem value="app-development">App Development</SelectItem>
                <SelectItem value="automation">Automation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.serviceNeeded && (
              <p className="text-sm text-destructive">{errors.serviceNeeded.message}</p>
            )}
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <Label htmlFor="budgetRange">Budget Range *</Label>
            <Select
              value={budgetRange}
              onValueChange={(value) => setValue('budgetRange', value)}
            >
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent className="glass-dropdown">
                <SelectItem value="below-10k">Below ₹10k</SelectItem>
                <SelectItem value="10k-50k">₹10k – ₹50k</SelectItem>
                <SelectItem value="50k-plus">₹50k+</SelectItem>
              </SelectContent>
            </Select>
            {errors.budgetRange && (
              <p className="text-sm text-destructive">{errors.budgetRange.message}</p>
            )}
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="projectDescription">Project Description *</Label>
            <Textarea
              id="projectDescription"
              {...register('projectDescription')}
              placeholder="Describe your project requirements, goals, and any specific features you need..."
              className="glass-input min-h-[120px]"
            />
            {errors.projectDescription && (
              <p className="text-sm text-destructive">{errors.projectDescription.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full glass-button primary-gradient"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Quote Request...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Request Quote
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestQuoteForm;