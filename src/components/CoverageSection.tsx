import { useState } from 'react';
import { MapPin, CheckCircle, Search, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

interface CoverageSectionProps {
  onOpenQuote: () => void;
}

export default function CoverageSection({ onOpenQuote }: CoverageSectionProps) {
  const [zipInput, setZipInput] = useState('');
  const [checkResult, setCheckResult] = useState<{
    status: 'initial' | 'covered' | 'custom';
    neighborhood?: string;
    zip?: string;
    message: string;
  }>({
    status: 'initial',
    message: ''
  });

  const runZipCheck = (zipCode: string) => {
    const cleanZip = zipCode.trim();
    if (!cleanZip) return;

    const matchedNeighborhood = BUSINESS_INFO.sanAntonioZipMap[cleanZip];

    if (
      matchedNeighborhood ||
      cleanZip.startsWith('782') ||
      cleanZip.startsWith('780') ||
      cleanZip.startsWith('781')
    ) {
      setCheckResult({
        status: 'covered',
        zip: cleanZip,
        neighborhood: matchedNeighborhood || 'Greater San Antonio Metro Area',
        message: `We provide regular daily routes in your area with zero travel fees. Free on-site and remote photo estimates are available today!`
      });
    } else {
      setCheckResult({
        status: 'custom',
        zip: cleanZip,
        message: `ZIP ${cleanZip} is outside my standard daily route, but Robert takes on neighborhood cleaning jobs across surrounding areas on weekends. Call or text (210) 326-6306 to check availability!`
      });
    }
  };

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    runZipCheck(zipInput);
  };

  const quickZips = [
    { zip: '78258', label: 'Stone Oak' },
    { zip: '78209', label: 'Alamo Heights' },
    { zip: '78249', label: 'UTSA / NW' },
    { zip: '78255', label: 'Dominion' },
    { zip: '78254', label: 'Helotes' },
    { zip: '78006', label: 'Boerne' },
    { zip: '78154', label: 'Schertz' },
    { zip: '78130', label: 'New Braunfels' }
  ];

  return (
    <section id="coverage" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Info & Interactive ZIP Search */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <MapPin className="w-4 h-4" />
              <span>San Antonio Neighborhood Coverage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Check If Robert Can Wash In Your Neighborhood
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Based right here in San Antonio, 16-year-old Robert Thompson brings his pressure washer
              and surface cleaner directly to driveways, fences, and trash bins across Bexar, Comal, and Kendall counties.
            </p>

            {/* Interactive ZIP Code Checker Box */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-md space-y-4">
              <label className="block text-sm font-bold text-slate-900">
                Enter Your 5-Digit San Antonio ZIP Code:
              </label>

              <form onSubmit={handleZipCheck} className="flex items-stretch gap-2">
                <input
                  type="text"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="e.g. 78258"
                  maxLength={5}
                  className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>Check ZIP</span>
                </button>
              </form>

              {/* Quick Click ZIP Suggestions */}
              <div>
                <p className="text-[11px] text-slate-500 font-medium mb-1.5">Or tap a popular area:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickZips.map((item) => (
                    <button
                      key={item.zip}
                      type="button"
                      onClick={() => {
                        setZipInput(item.zip);
                        runZipCheck(item.zip);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                    >
                      {item.zip} ({item.label})
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Result Box */}
              {checkResult.status === 'covered' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm rounded-2xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <p className="font-extrabold text-emerald-800">
                        ✓ Service Confirmed in {checkResult.neighborhood}!
                      </p>
                      <span className="font-mono text-xs text-emerald-700 font-bold">
                        ZIP {checkResult.zip}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-700 leading-relaxed">{checkResult.message}</p>
                    <button
                      onClick={onOpenQuote}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-900 underline hover:text-emerald-950 cursor-pointer"
                    >
                      <span>Lock in your free estimate for this area</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {checkResult.status === 'custom' && (
                <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm rounded-2xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">Extended Central Texas Coverage</p>
                    <p className="text-xs text-amber-800">{checkResult.message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Key Communities Grid */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Primary Daily Coverage Locations
              </h3>
              <p className="text-xs text-slate-500">
                Scheduled weekly routes across the greater San Antonio metropolitan area:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-medium text-slate-700">
              {BUSINESS_INFO.coverageLocations.map((loc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                  <span className="truncate">{loc}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-between gap-4">
              <div className="text-xs text-sky-950">
                <span className="font-bold block">Need same-day or weekend service?</span>
                <span>Call Robert directly to check today's route openings.</span>
              </div>
              <a
                href={`tel:${BUSINESS_INFO.rawPhone}`}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
              >
                (210) 326-6306
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
