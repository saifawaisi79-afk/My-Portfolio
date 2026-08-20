import React from 'react';
import { Projects } from '../components/Projects';
import { PageTransition } from '../components/PageTransition';

export const ProjectsPage: React.FC = () => {
  return (
    <PageTransition className="flex flex-col min-h-[calc(100vh-80px)]">
      <Projects />
    </PageTransition>
  );
};
