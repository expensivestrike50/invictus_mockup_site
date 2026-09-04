import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// Lazy load below-the-fold sections
const LogoCloud = lazy(() => import('@/components/LogoCloud'));
const Features = lazy(() => import('@/components/Features'));
const CaseStudies = lazy(() => import('@/components/CaseStudies'));
const HowItWorks = lazy(() => import('@/components/HowItWorks'));
const Pricing = lazy(() => import('@/components/Pricing'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const FAQ = lazy(() => import('@/components/FAQ'));
const CallToAction = lazy(() => import('@/components/CallToAction'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-48" aria-hidden="true" />}>
          <LogoCloud />
          <Features />
          <CaseStudies />
          <HowItWorks />
          <Pricing />
          <Testimonials />
          <FAQ />
          <CallToAction />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
