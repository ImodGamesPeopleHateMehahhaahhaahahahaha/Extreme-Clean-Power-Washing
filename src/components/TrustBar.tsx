import { AlertTriangle, FileCheck, DollarSign, UserCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

export default function TrustBar() {
  const pillars = [
    {
      icon: UserCheck,
      title: '16-Year-Old Student',
      description: `${BUSINESS_INFO.owner} personally does every job after school & weekends to make extra money.`
    },
    {
      icon: AlertTriangle,
      title: 'Not Insured (Explicit Notice)',
      description: 'Not an official business or LLC, and not insured whatsoever. Extremely careful and respectful.'
    },
    {
      icon: DollarSign,
      title: 'Affordable Youth Pricing',
      description: 'Get your driveway, bins, and fence looking great without expensive corporate markups.'
    },
    {
      icon: FileCheck,
      title: '100% Free Estimates',
      description: 'Text photos to (210) 326-6306 for a quick, no-pressure estimate within hours.'
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-10 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isAlert = pillar.title.includes('Not Insured');
            return (
              <div
                key={idx}
                className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${
                  isAlert
                    ? 'bg-amber-950/40 border border-amber-600/50 hover:border-amber-500'
                    : 'bg-slate-800/60 border border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                    isAlert
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                      : 'bg-sky-500/15 border border-sky-500/30 text-sky-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                    <span>{pillar.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
