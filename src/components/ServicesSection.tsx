import { useState } from 'react';
import { ArrowRight, Check, Sparkles, Clock, CalendarCheck } from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { CleaningService } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'exterior' | 'sanitizing'>('all');

  const filteredServices = SERVICES.filter((service) => {
    if (activeFilter === 'popular') return service.popular;
    if (activeFilter === 'exterior') {
      return (
        service.id === 'driveways-walkways' ||
        service.id === 'house-walls-siding' ||
        service.id === 'fences-wood-vinyl' ||
        service.id === 'porches-decks'
      );
    }
    if (activeFilter === 'sanitizing') {
      return service.id === 'trash-cans-bins' || service.id === 'porches-decks';
    }
    return true;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 mb-2">
              <span>Our Capabilities</span>
              <span aria-hidden="true">·</span>
              <span>Professional Equipment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Neighborhood Exterior Cleaning Services
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Every job is performed by 16-year-old Robert Thompson using high-performance pressure and soft-wash equipment,
              clean rotary scrubbers, and safe detergents to protect your Texas home.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveFilter('popular')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'popular'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Most Popular
            </button>
            <button
              onClick={() => setActiveFilter('exterior')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'exterior'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Surfaces & Siding
            </button>
            <button
              onClick={() => setActiveFilter('sanitizing')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'sanitizing'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sanitizing & Deodorizing
            </button>
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service: CleaningService) => (
            <div
              key={service.id}
              className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden"
            >
              {/* Service Card Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Quiet unboxed title kicker overlay */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-slate-800 border border-slate-200/60 shadow-sm">
                  {service.startingPrice}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                    {service.tagline}
                  </p>
                  <h3 className="text-xl font-bold text-white tracking-tight">{service.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Highlights checklist */}
                  <ul className="space-y-2 text-xs text-slate-700">
                    {service.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timing & Action Row */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{service.typicalTime}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>{service.recommendedFrequency}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(service.name)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-sky-700 bg-sky-50 hover:bg-sky-600 hover:text-white border border-sky-200/80 hover:border-sky-600 transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <span>Request Quote for This Service</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Custom Estimate Callout Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-950 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Need Multiple Areas Washed?</span>
            </div>
            <h4 className="text-xl font-bold text-white">
              Bundle Services & Save up to 20% on Full-Property Cleanings
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Combine your driveway, house wash, and trash cans into a single visit with Robert Thompson.
            </p>
          </div>
          <button
            onClick={() => onSelectService('Multi-Service Bundle')}
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            Get Multi-Service Discount
          </button>
        </div>
      </div>
    </section>
  );
}
