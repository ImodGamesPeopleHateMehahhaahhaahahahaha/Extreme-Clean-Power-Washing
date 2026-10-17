import { Phone, ArrowRight, AlertTriangle, Sparkles, CheckCircle2, User, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

interface HeroProps {
  onOpenQuote: () => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200">
      {/* Background ambient water glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Transparent Identity Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold tracking-wide">
              <span>👋 16-Year-Old Student Earning Extra Money</span>
              <span aria-hidden="true">·</span>
              <span>San Antonio, TX</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              Hardworking Neighborhood{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
                Power Washing
              </span>{' '}
              at Fair, Affordable Prices
            </h1>

            {/* Subhead / Value description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Hi! I'm <strong className="text-slate-900 font-bold">Robert Thompson</strong>. I am a 16-year-old
              high school student here in San Antonio washing driveways, trash cans, fences, and porches after school
              and on weekends to make some extra money. I work hard, take my time, and treat every property with huge respect.
            </p>

            {/* Explicit Disclosure Box */}
            <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-slate-800 text-xs sm:text-sm space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Important Transparency & Insurance Disclosure</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>I am NOT an official company or LLC, and I am NOT insured whatsoever.</strong> I am an independent 16-year-old
                doing neighborhood work to save money. I am extremely careful, polite, and detail-oriented, but I believe in 100% honesty
                so every homeowner knows what to expect before hiring me!
              </p>
            </div>

            {/* Quick Contact & Selling Points Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-1 text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Affordable Student Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>100% Free Upfront Quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Polite & Careful Service</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-sky-600 rounded-xl hover:bg-sky-500 active:bg-sky-700 shadow-lg shadow-sky-600/25 hover:shadow-xl transition-all whitespace-nowrap cursor-pointer group"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.rawPhone}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 shadow-sm transition-all whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>Call or Text {BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Trust Note */}
            <div className="pt-1 flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1 text-amber-600">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-semibold">Support Local Youth:</span>
              </div>
              <span>Fast text response · Text photos for a quick price</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
              <img
                src="/src/assets/images/hero_power_washing_1792255998488.jpg"
                alt="Pressure washing a residential driveway in San Antonio"
                className="w-full h-80 sm:h-96 lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* In-image caption overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-white/40 shadow-lg text-slate-900">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                      16-Year-Old Student Operator
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      Robert Thompson · Hard Working & Dedicated
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      Uninsured Service
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick floating trust card */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xl text-slate-800">
              <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">Honest Neighborhood Work</p>
                <p className="text-sm font-bold text-slate-900">100% Dedicated to Doing It Right</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
