import { Phone, Mail, MapPin, ShieldCheck, Clock, Lock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { UserRole } from '../types';

interface TopContactBarProps {
  onOpenLogin: (role?: UserRole) => void;
  currentUserRole?: UserRole;
  onOpenPortal?: () => void;
}

export default function TopContactBar({
  onOpenLogin,
  currentUserRole,
  onOpenPortal
}: TopContactBarProps) {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Phone, Email, Location */}
        <div className="flex items-center flex-wrap gap-4 md:gap-6">
          <a
            href={`tel:${BUSINESS_INFO.rawPhone}`}
            className="flex items-center gap-1.5 hover:text-white font-medium text-slate-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>{BUSINESS_INFO.email}</span>
          </a>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>San Antonio & Surrounding Areas</span>
          </div>
        </div>

        {/* Right: Badges & Portal Login Links */}
        <div className="flex items-center gap-4 text-slate-300">
          <div className="hidden sm:flex items-center gap-1.5 text-amber-300 font-semibold bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded-md text-[11px]">
            <span>16-Year-Old Student • Not Insured</span>
          </div>

          {/* Portal Authentication Links */}
          <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
            {currentUserRole ? (
              <button
                type="button"
                onClick={onOpenPortal}
                className="px-2.5 py-0.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Open {currentUserRole.toUpperCase()} Hub</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => onOpenLogin('customer')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Login
                </button>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => onOpenLogin('employee')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Employee Login
                </button>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => onOpenLogin('admin')}
                  className="text-sky-400 hover:text-sky-300 font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Login</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
