import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';

export const ContactPage: React.FC = () => {
  return (
    <PageTransition className="flex flex-col min-h-[calc(100vh-80px)]">
      <div className="flex-1">
        <ContactSection />
      </div>
      <Footer />
    </PageTransition>
  );
};
