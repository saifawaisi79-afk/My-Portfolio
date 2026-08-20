import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { PageTransition } from '../components/PageTransition';

interface OutletContextType {
  theme: 'dark' | 'light';
  goToPage: (path: string) => void;
  onOpenResume?: () => void;
}

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const context = useOutletContext<OutletContextType>();

  return (
    <PageTransition className="flex flex-col min-h-[calc(100vh-80px)]">
      <Hero
        onOpenHireMe={() => navigate('/freelance')}
        onOpenResume={context?.onOpenResume || (() => {})}
      />
    </PageTransition>
  );
};
