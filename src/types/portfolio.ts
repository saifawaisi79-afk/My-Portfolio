export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Enterprise SaaS' | 'E-Commerce' | 'Web Apps & SEO' | 'CRM & Portals';
  description: string;
  longDescription: string;
  technologies: string[];
  liveUrl?: string;
  highlights: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    features: string[];
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  featured: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  type: string;
  summary: string;
  responsibilities: string[];
  techStack: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: string; // 'Expert' | 'Advanced' | 'Proficient'
    tag?: string;
  }[];
}

export interface ServiceOffer {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  deliverables: string[];
  startingPrice: string;
  deliveryTime: string;
  badge?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  projectType: string;
  year: string;
}
