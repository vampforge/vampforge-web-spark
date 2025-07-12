export interface CMSUser {
  email: string;
  password: string;
  name?: string;
}

export interface CMSSettings {
  whatsapp: {
    phoneNumber: string;
    message: string;
    enabled: boolean;
  };
  admin: {
    email: string;
    password: string;
  };
}

export interface PageContent {
  id: string;
  type: 'text' | 'image' | 'button' | 'section' | 'hero' | 'testimonial' | 'form';
  content: any;
  position: number;
  styles?: Record<string, string>;
}

export interface CMSPage {
  id: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  content: PageContent[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

export interface FormResponse {
  id: string;
  name: string;
  email: string;
  type: 'contact' | 'call' | 'project';
  data: Record<string, any>;
  timestamp: string;
  status: 'read' | 'unread';
}

export interface CMSData {
  pages: CMSPage[];
  formResponses: FormResponse[];
  settings: CMSSettings;
  reviews: Array<{
    id: string;
    name: string;
    content: string;
    rating: number;
    position: number;
  }>;
}