import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import ContactHeader from '@/components/ContactHeader';

// Lazy load below-the-fold sections
const ContactLocation = lazy(() => import('@/components/ContactLocation'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ContactHeader />
      <Suspense fallback={<div className="h-48" />}>
        <ContactLocation />
        <FAQ />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Contact;
