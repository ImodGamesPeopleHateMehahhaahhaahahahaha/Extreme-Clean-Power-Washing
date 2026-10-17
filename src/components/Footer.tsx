import { Phone, Mail, MapPin, Clock, AlertTriangle, Droplets, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/servicesData';

interface FooterProps {
  onSelectService: (serviceName: string) => void;
}

export default function Footer({ onSelectService }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-24 lg:pb-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-900">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-xl tracking-tight">
              <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <span>{BUSINESS_INFO.name}</span>
                <span className="block text-[10px] font-bold text-amber-500 tracking-wider uppercase">
                  16-Year-Old Student · Neighborhood Hustle
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Neighborhood power washing and trash can cleaning operated by 16-year-old student Robert Thompson
              in San Antonio, Texas. Honest hard work at affordable neighborhood rates.
            </p>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-amber-900/60 text-xs space-y-1.5">
              <p className="text-white font-bold flex items-center gap-1.5">
                <span>{BUSINESS_INFO.owner}</span>
                <span className="text-amber-400 font-mono text-[11px]">(Age 16 · Student Operator)</span>
              </p>
              <p className="text-amber-300 font-semibold flex items-center gap-1.5 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span>Not an official business · Not insured whatsoever</span>
              </p>
            </div>
          </div>

          {/* Col 2: Services List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Neighborhood Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s.name)}
                    className="hover:text-sky-400 transition-colors cursor-pointer text-left"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onSelectService('Multi-Service Bundle')}
                  className="text-sky-400 hover:text-sky-300 font-semibold transition-colors cursor-pointer"
                >
                  Multi-Service Combo & Save
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Contact & Schedule
            </h4>

            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${BUSINESS_INFO.rawPhone}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="font-bold text-sm text-white">{BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.serviceArea}</span>
              </div>

              <div className="flex items-start gap-2.5 text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200">After School & Weekends: 7:00 AM – 7:00 PM</p>
                  <p className="text-slate-400">Sunday: Flexible Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transparent Legal Disclaimer Banner */}
        <div className="mt-8 p-4 bg-slate-900/90 rounded-2xl border border-amber-800/50 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-amber-300 font-semibold flex items-center gap-1.5 mb-1 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Important Notice & Uninsured Disclosure:</span>
          </strong>
          Extreme Clean Power Washing is an informal neighborhood service operated by Robert Thompson, a 16-year-old student residing in San Antonio, Texas, working to make extra money. This is <strong>NOT an official registered corporate entity, licensed contractor, or LLC</strong>, and Robert is <strong>NOT insured whatsoever</strong>. All cleanings are performed on a friendly neighborhood basis with homeowner consent.
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. San Antonio, Texas.</p>
          <div className="flex items-center gap-4">
            <span className="text-amber-500 font-medium">16-Year-Old Student · Uninsured Service</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
