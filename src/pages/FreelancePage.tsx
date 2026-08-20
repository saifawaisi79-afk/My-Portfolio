import React from 'react';
import { FreelancerPortal } from '../components/FreelancerPortal';
import { PageTransition } from '../components/PageTransition';

export const FreelancePage: React.FC = () => {
  return (
    <PageTransition className="flex flex-col min-h-[calc(100vh-80px)]">
      <FreelancerPortal />
    </PageTransition>
  );
};
