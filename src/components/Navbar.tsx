import { useState } from 'react';
import { Menu, X, Droplets, ShieldCheck, User, LogOut } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { UserRole } from '../types';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenLogin: (role?: UserRole) => void;
  currentUserRole?: UserRole;
  currentUserName?: string;
  onOpenPortal?: () => void;
  onLogout?: () => void;
}

export default function Navbar({
  onOpenQuote,
  onOpenLogin,
  currentUserRole,
  currentUserName,
  onOpenPortal,
  onLogout
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-slate-900 font-extrabold tracking-tight text-xl sm:text-2xl whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="leading-tight">
                Extreme Clean <span className="text-sky-600 font-normal">Power Washing</span>
              </div>
              <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                16-Year-Old Student • Neighborhood Service
              </div>
            </div>
          </a>

          {/* Zone 2: 4-5 single-line clean text links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('results')}
              className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0"
            >
              Before & After
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => scrollToSection('coverage')}
              className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0"
            >
              Service Area
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {currentUserRole && onOpenPortal ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenPortal}
                  className="px-4 py-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                  <span>{currentUserRole.toUpperCase()} HUB</span>
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Log Out"
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : null}

            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 text-sm font-bold text-white bg-sky-600 rounded-xl hover:bg-sky-500 active:bg-sky-700 shadow-md shadow-sky-600/20 hover:shadow-lg transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-sky-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-4">
          <div className="flex flex-col space-y-2 text-base font-semibold text-slate-800">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('results')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Before & After Gallery
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              About Robert Thompson
            </button>
            <button
              onClick={() => scrollToSection('coverage')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Service Area & ZIP Check
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* Mobile Portal Login Toggles */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Account & Portals
            </p>
            {currentUserRole && onOpenPortal ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-2.5 px-3 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Open {currentUserRole.toUpperCase()} Portal ({currentUserName})</span>
              </button>
            ) : (
              <div className="grid grid-cols-3 gap-2 px-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin('customer');
                  }}
                  className="py-2 text-xs font-bold bg-slate-100 rounded-lg text-slate-800"
                >
                  Customer
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin('employee');
                  }}
                  className="py-2 text-xs font-bold bg-slate-100 rounded-lg text-slate-800"
                >
                  Employee
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin('admin');
                  }}
                  className="py-2 text-xs font-bold bg-sky-100 text-sky-800 rounded-lg"
                >
                  Admin
                </button>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 text-center text-sm font-bold text-white bg-sky-600 rounded-xl hover:bg-sky-500 shadow-md transition-colors"
            >
              Get a Free Quote
            </button>
            <a
              href={`tel:${BUSINESS_INFO.rawPhone}`}
              className="w-full py-2.5 text-center text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Call {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
