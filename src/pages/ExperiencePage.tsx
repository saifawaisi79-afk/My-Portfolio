import React from 'react';
import { Experience } from '../components/Experience';
import { PageTransition } from '../components/PageTransition';

export const ExperiencePage: React.FC = () => {
  return (
    <PageTransition className="flex flex-col min-h-[calc(100vh-80px)]">
      <Experience />
    </PageTransition>
  );
};
