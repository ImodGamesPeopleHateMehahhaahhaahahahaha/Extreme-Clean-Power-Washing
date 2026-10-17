import { AlertTriangle, Award, HeartHandshake, Sparkles, Phone, CheckCircle2, User } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export default function AboutSection({ onOpenQuote }: AboutSectionProps) {
  const reasons = [
    {
      icon: HeartHandshake,
      title: 'Direct Personal Effort on Every Job',
      description:
        'When you hire me, you get me — Robert Thompson. I do every single job myself after school and on weekends. No random subcontractors or careless workers.'
    },
    {
      icon: AlertTriangle,
      title: '100% Upfront: Not an Official Business & Not Insured',
      description:
        'I believe in absolute honesty. I am a 16-year-old high school student earning extra money. I am NOT an official corporation or LLC, and I am NOT insured whatsoever. I work very slowly and carefully to protect your property.'
    },
    {
      icon: Sparkles,
      title: 'Quality Equipment & Safe Pressure',
      description:
        'I use high-pressure surface spinners on hard concrete driveways so there are no zebra lines, and gentle low-pressure for wood fences and house siding so nothing gets damaged.'
    },
    {
      icon: Award,
      title: 'Affordable Rates & Free Estimates',
      description:
        'Big power washing companies have huge corporate overhead and high fees. As a local student, I keep prices fair, clear, and affordable for my San Antonio neighbors.'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Personal Commitment */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <span>About Robert</span>
              <span aria-hidden="true">·</span>
              <span>16-Year-Old San Antonio Student</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Meet Robert: A Hardworking 16-Year-Old Earning Honest Money
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Hi, I’m <strong className="text-slate-900 font-semibold">{BUSINESS_INFO.owner}</strong>. I go to high school here in San Antonio.
              I started <strong className="text-slate-900 font-semibold">{BUSINESS_INFO.name}</strong> as an informal neighborhood hustle to work hard,
              earn my own money, and help neighbors keep their driveways, trash cans, patios, and fences looking sharp.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              I invested in a great pressure washer and rotary surface cleaner because I wanted to do the job right.
              I take real pride in my work, show up on time, communicate clearly, and make sure you’re happy before taking payment.
            </p>

            {/* Direct owner quote box */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <p className="text-sm italic text-slate-700 leading-relaxed">
                “I’m 16 and doing this to earn my own money and build a great reputation in my community.
                Because I am not an official corporation and am not insured whatsoever, I treat your property with extra care,
                respect, and caution—just like I would my own parents' home. If you're not thrilled, I will redo it on the spot.”
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">{BUSINESS_INFO.owner}</p>
                  <p className="text-xs text-sky-700 font-medium">{BUSINESS_INFO.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    Not Insured • Youth Service
                  </span>
                </div>
              </div>
            </div>

            {/* Contact quick actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Get a Free Estimate
              </button>
              <a
                href={`tel:${BUSINESS_INFO.rawPhone}`}
                className="flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-sky-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>Call or Text {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Key Pillars Grid */}
          <div className="lg:col-span-6 space-y-4">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              const isAlert = reason.title.includes('Not Insured');
              return (
                <div
                  key={index}
                  className={`p-5 rounded-xl border shadow-sm transition-all flex items-start gap-4 ${
                    isAlert
                      ? 'bg-amber-50/80 border-amber-300'
                      : 'bg-white border-slate-200 hover:shadow-md'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 ${
                      isAlert
                        ? 'bg-amber-100 border-amber-300 text-amber-700'
                        : 'bg-sky-50 border-sky-100 text-sky-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{reason.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Quick Badges Strip */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-around gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                16-Yr-Old Student
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Fair Neighborhood Pricing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Zero Corporate Markups
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
