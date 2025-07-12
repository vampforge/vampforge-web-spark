import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCMSData } from '@/hooks/useCMSData';

interface CallFormData {
  name: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

const CallDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CallFormData>({
    name: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { addFormResponse } = useCMSData();

  const handleInputChange = (field: keyof CallFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      // Add to CMS
      addFormResponse({
        name: formData.name,
        email: formData.email,
        type: 'call',
        data: formData,
        status: 'unread'
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Call Scheduled!",
        description: "We'll contact you within 24 hours to confirm your appointment.",
      });

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
        setIsOpen(false);
      }, 3000);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer" size="lg" variant="outline">
          Schedule a Call
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Schedule a Call</span>
          </DialogTitle>
        </DialogHeader>
        
        {isSubmitted ? (
          <div className="p-8 text-center space-y-6">
            <CheckCircle className="w-16 h-16 text-success mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Call Scheduled!</h3>
              <p className="text-muted-foreground">
                We'll contact you within 24 hours to confirm your appointment.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                required
                className="cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time *</Label>
                <Input
                  id="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  required
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Tell us what you'd like to discuss..."
                rows={3}
                className="cursor-pointer"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full cursor-pointer"
              variant="default"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  Schedule Call
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;