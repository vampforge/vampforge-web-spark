import { useState, useEffect } from 'react';
import { CMSData, CMSPage, FormResponse, CMSSettings } from '../types/cms';

const DEFAULT_CMS_DATA: CMSData = {
  pages: [
    {
      id: 'home',
      name: 'Home',
      slug: '/',
      title: 'VAMPForge - Software Development & IT Solutions',
      description: 'Leading software development company delivering innovative solutions',
      content: [],
      seo: {
        metaTitle: 'VAMPForge - Software Development & IT Solutions',
        metaDescription: 'Professional software development, web development, and IT consulting services',
        keywords: 'software development, web development, IT consulting, VAMPForge'
      }
    },
    {
      id: 'services',
      name: 'Services',
      slug: '/services',
      title: 'Our Services - VAMPForge',
      description: 'Comprehensive software and IT services',
      content: [],
      seo: {
        metaTitle: 'Services - VAMPForge',
        metaDescription: 'Custom software development, web development, and IT consulting services',
        keywords: 'software services, web development, IT consulting, custom software'
      }
    },
    {
      id: 'about',
      name: 'About',
      slug: '/about',
      title: 'About Us - VAMPForge',
      description: 'Learn about VAMPForge and our mission',
      content: [],
      seo: {
        metaTitle: 'About VAMPForge',
        metaDescription: 'Learn about VAMPForge, our leadership team, and our mission',
        keywords: 'about VAMPForge, software company, mission, team'
      }
    },
    {
      id: 'contact',
      name: 'Contact',
      slug: '/contact',
      title: 'Contact Us - VAMPForge',
      description: 'Get in touch with VAMPForge',
      content: [],
      seo: {
        metaTitle: 'Contact VAMPForge',
        metaDescription: 'Contact VAMPForge for software development and IT consulting services',
        keywords: 'contact VAMPForge, software development contact, IT consulting'
      }
    }
  ],
  formResponses: [],
  settings: {
    whatsapp: {
      phoneNumber: '7464003631',
      message: 'Hello, I have a query about VAMPForge services',
      enabled: true
    },
    admin: {
      email: 'admin@vampforge.site',
      password: 'VampForge2025'
    }
  },
  reviews: [
    {
      id: '1',
      name: 'Sarah Johnson',
      content: 'VAMPForge delivered an exceptional software solution that transformed our business operations. Their attention to detail and technical expertise is unmatched.',
      rating: 5,
      position: 1
    },
    {
      id: '2',
      name: 'Michael Chen',
      content: 'Professional, reliable, and innovative. The team at VAMPForge exceeded our expectations and delivered on time.',
      rating: 5,
      position: 2
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      content: 'Outstanding web development services. The modern design and functionality they created has significantly improved our online presence.',
      rating: 5,
      position: 3
    }
  ]
};

export const useCMSData = () => {
  const [cmsData, setCMSData] = useState<CMSData>(() => {
    const stored = localStorage.getItem('vampforge_cms_data');
    return stored ? JSON.parse(stored) : DEFAULT_CMS_DATA;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('vampforge_cms_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('vampforge_cms_data', JSON.stringify(cmsData));
  }, [cmsData]);

  const authenticate = (email: string, password: string): boolean => {
    if (email === cmsData.settings.admin.email && password === cmsData.settings.admin.password) {
      setIsAuthenticated(true);
      localStorage.setItem('vampforge_cms_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('vampforge_cms_auth');
  };

  const updatePage = (pageId: string, updatedPage: Partial<CMSPage>) => {
    setCMSData(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId ? { ...page, ...updatedPage } : page
      )
    }));
  };

  const addFormResponse = (response: Omit<FormResponse, 'id' | 'timestamp'>) => {
    const newResponse: FormResponse = {
      ...response,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setCMSData(prev => ({
      ...prev,
      formResponses: [newResponse, ...prev.formResponses]
    }));
  };

  const updateFormResponse = (responseId: string, updates: Partial<FormResponse>) => {
    setCMSData(prev => ({
      ...prev,
      formResponses: prev.formResponses.map(response =>
        response.id === responseId ? { ...response, ...updates } : response
      )
    }));
  };

  const deleteFormResponse = (responseId: string) => {
    setCMSData(prev => ({
      ...prev,
      formResponses: prev.formResponses.filter(response => response.id !== responseId)
    }));
  };

  const updateSettings = (newSettings: Partial<CMSSettings>) => {
    setCMSData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const updateReviews = (reviews: CMSData['reviews']) => {
    setCMSData(prev => ({
      ...prev,
      reviews
    }));
  };

  const resetCMS = () => {
    setCMSData(DEFAULT_CMS_DATA);
    localStorage.removeItem('vampforge_cms_auth');
    setIsAuthenticated(false);
  };

  const exportData = () => {
    return JSON.stringify(cmsData, null, 2);
  };

  const importData = (jsonData: string) => {
    try {
      const importedData = JSON.parse(jsonData);
      setCMSData(importedData);
      return true;
    } catch {
      return false;
    }
  };

  return {
    cmsData,
    isAuthenticated,
    authenticate,
    logout,
    updatePage,
    addFormResponse,
    updateFormResponse,
    deleteFormResponse,
    updateSettings,
    updateReviews,
    resetCMS,
    exportData,
    importData
  };
};