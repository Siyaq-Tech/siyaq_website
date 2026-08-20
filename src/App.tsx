import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Process from './components/Process';
import CaseStudies from './components/CaseStudies';
import Technologies from './components/Technologies';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Footer from './components/Footer';

const AppContent: React.FC = () => {
  const { lang, isRTL, toggleLang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [lang, isRTL]);

  return (
    <div className={`min-h-screen ${isRTL ? 'font-arabic' : ''}`}>
      <Navbar onToggleLang={toggleLang} />
      <main>
        <Hero />
        {/* Dark marquee immediately after hero — creates strong visual break */}
        <Marquee variant="dark" />
        <Services />
        {/* Light marquee after services — reinforces tech stack */}
        <Marquee variant="light" />
        <Process />
        <CaseStudies />
        <Technologies />
        <Team />
        <Testimonials />
        <CTA />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
