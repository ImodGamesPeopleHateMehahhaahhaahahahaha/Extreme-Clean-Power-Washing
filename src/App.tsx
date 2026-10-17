import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import TopContactBar from './components/TopContactBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import QuoteSection from './components/QuoteSection';
import CoverageSection from './components/CoverageSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import FloatingMobileBar from './components/FloatingMobileBar';
import LoginModal from './components/LoginModal';
import AdminPortal from './components/AdminPortal';
import EmployeePortal from './components/EmployeePortal';
import CustomerPortal from './components/CustomerPortal';
import { UserRole } from './types';

function AppContent() {
  const { user, logout } = useAuth();
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);

  // View state: 'website' or 'portal'
  const [viewMode, setViewMode] = useState<'website' | 'portal'>('website');

  // Login Modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalDefaultRole, setLoginModalDefaultRole] = useState<UserRole>('admin');

  const handleOpenLogin = (role: UserRole = 'admin') => {
    setLoginModalDefaultRole(role);
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = (role: UserRole) => {
    setViewMode('portal');
  };

  const handleOpenQuote = () => {
    setViewMode('website');
    setTimeout(() => {
      const quoteElement = document.getElementById('quote');
      if (quoteElement) {
        quoteElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectService = (serviceName: string) => {
    setViewMode('website');
    setSelectedServiceForQuote(serviceName);
    setTimeout(() => {
      const quoteElement = document.getElementById('quote');
      if (quoteElement) {
        quoteElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // If user is in Portal Mode, render corresponding role portal
  if (viewMode === 'portal' && user) {
    if (user.role === 'admin') {
      return <AdminPortal onBackToSite={() => setViewMode('website')} />;
    }
    if (user.role === 'employee') {
      return <EmployeePortal onBackToSite={() => setViewMode('website')} />;
    }
    if (user.role === 'customer') {
      return (
        <CustomerPortal
          onBackToSite={() => setViewMode('website')}
          onRequestNewQuote={handleOpenQuote}
        />
      );
    }
  }

  // Public High-Converting Website View
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top utility contact info strip with direct portal login links */}
      <TopContactBar
        onOpenLogin={handleOpenLogin}
        currentUserRole={user?.role}
        onOpenPortal={() => setViewMode('portal')}
      />

      {/* Main navigation with 3-zone contract */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        onOpenLogin={handleOpenLogin}
        currentUserRole={user?.role}
        currentUserName={user?.fullName}
        onOpenPortal={() => setViewMode('portal')}
        onLogout={logout}
      />

      {/* Logged in notification banner if on website */}
      {user && (
        <div className="bg-sky-900 text-white px-4 py-2 text-xs flex items-center justify-between border-b border-sky-800">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span>
              Logged in as <strong className="font-bold text-sky-200">{user.fullName}</strong> ({user.role.toUpperCase()} mode)
            </span>
            <button
              onClick={() => setViewMode('portal')}
              className="px-3 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
            >
              Go to {user.role.toUpperCase()} Dashboard →
            </button>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenQuote={handleOpenQuote} />

        {/* 4 Core Pillars */}
        <TrustBar />

        {/* Services Grid (Trash Cans, Driveways, Fences, House Walls, Porches & Decks) */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Interactive Before & After Visual Slider */}
        <BeforeAfterSlider onSelectService={handleSelectService} />

        {/* About & Why Choose Us (Robert Thompson, Owner/Operator) */}
        <AboutSection onOpenQuote={handleOpenQuote} />

        {/* Interactive Quote Request Form with Photo Upload & Instant Estimator */}
        <QuoteSection
          preselectedService={selectedServiceForQuote}
          onClearPreselectedService={() => setSelectedServiceForQuote(undefined)}
        />

        {/* Service Area & Interactive ZIP Checker */}
        <CoverageSection onOpenQuote={handleOpenQuote} />

        {/* Real San Antonio Customer Testimonials & Google Review Link */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Comprehensive Business Footer */}
      <Footer onSelectService={handleSelectService} />

      {/* Floating 1-tap mobile bar (within 15% mobile viewport cap) */}
      <FloatingMobileBar onOpenQuote={handleOpenQuote} />

      {/* Login Modal supporting Admin, Employee, and Customer */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        defaultRole={loginModalDefaultRole}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
