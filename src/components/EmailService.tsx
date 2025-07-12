import emailjs from '@emailjs/browser';

export interface EmailData {
  name: string;
  email: string;
  message: string;
  projectType?: string;
  preferredDate?: string;
  formType: 'contact' | 'schedule';
}

class EmailService {
  private serviceId = 'service_vampforge'; // Replace with your EmailJS service ID
  private templateId = 'template_vampforge'; // Replace with your EmailJS template ID
  private publicKey = 'your_public_key'; // Replace with your EmailJS public key

  async sendEmail(data: EmailData): Promise<boolean> {
    try {
      // Initialize EmailJS if not already done
      emailjs.init(this.publicKey);
      
      // Prepare email template parameters
      const templateParams = {
        to_email: 'support@vampforge.site',
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        project_type: data.projectType || 'General Inquiry',
        preferred_date: data.preferredDate || 'Not specified',
        form_type: data.formType,
        reply_to: data.email
      };

      // Send email to admin
      await emailjs.send(this.serviceId, this.templateId, templateParams);
      
      // Send auto-response to user
      await this.sendAutoResponse(data);
      
      return true;
    } catch (error) {
      console.error('Email send failed:', error);
      return false;
    }
  }

  private async sendAutoResponse(data: EmailData): Promise<void> {
    const autoResponseTemplate = {
      to_email: data.email,
      to_name: data.name,
      subject: 'Your Query Has Been Received – VAMPForge',
      message: `Hi ${data.name},

Thank you for reaching out to VAMPForge.

We've successfully received your query and will get back to you shortly.

For urgent concerns, feel free to contact us at +91 7464003631.

Best regards,
Team VAMPForge
support@vampforge.site`
    };

    try {
      await emailjs.send(this.serviceId, 'template_autoresponse', autoResponseTemplate);
    } catch (error) {
      console.error('Auto-response failed:', error);
    }
  }

  // Simulate email sending for demo purposes
  async simulateEmailSend(data: EmailData): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success/failure (95% success rate for demo)
    return Math.random() > 0.05;
  }
}

export const emailService = new EmailService();