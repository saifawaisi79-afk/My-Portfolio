import React from 'react';
import { StatsBar } from '../components/StatsBar';
import { PageTransition } from '../components/PageTransition';

export const OverviewPage: React.FC = () => {
  return (
    <PageTransition className="flex flex-col min-h-[calc(100vh-80px)]">
      <StatsBar fullPage />
    </PageTransition>
  );
};
