import React from 'react';
import { Skills } from '../components/Skills';
import { PageTransition } from '../components/PageTransition';

export const SkillsPage: React.FC = () => {
  return (
    <PageTransition className="flex flex-col min-h-[calc(100vh-80px)]">
      <Skills />
    </PageTransition>
  );
};
