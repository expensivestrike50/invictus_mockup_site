import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import AboutHeader from '@/components/AboutHeader';

// Lazy load below-the-fold sections
const AboutMission = lazy(() => import('@/components/AboutMission'));
const AboutValues = lazy(() => import('@/components/AboutValues'));
const AboutTeam = lazy(() => import('@/components/AboutTeam'));
const AboutAdvisors = lazy(() => import('@/components/AboutAdvisors'));
const AboutPartners = lazy(() => import('@/components/AboutPartners'));
const CallToAction = lazy(() => import('@/components/CallToAction'));
const Footer = lazy(() => import('@/components/Footer'));

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AboutHeader />
      <Suspense fallback={<div className="h-48" />}>
        <AboutMission />
        <AboutValues />
        <AboutTeam />
        <AboutAdvisors />
        <AboutPartners />
        <CallToAction />
        <Footer />
      </Suspense>
    </div>
  );
};

export default About;
