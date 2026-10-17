import { useState, useMemo } from 'react';
import { Calculator, Sparkles, Tag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { CleaningService } from '../types';

interface InstantPriceEstimatorProps {
  onApplyEstimate: (selections: {
    services: string[];
    sizes: Record<string, string>;
    estMin: number;
    estMax: number;
  }) => void;
}

export default function InstantPriceEstimator({ onApplyEstimate }: InstantPriceEstimatorProps) {
  // Initial selections: Driveway and Trash Cans
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    'driveways-walkways',
    'trash-cans-bins'
  ]);

  // Selected size options keyed by service id
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({
    'driveways-walkways': 1, // Standard 2-car
    'trash-cans-bins': 1, // 2 Cans
    'fences-wood-vinyl': 1, // 50-100 ft
    'house-walls-siding': 1, // 1-Story
    'porches-decks': 1 // Standard Patio
  });

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSizeChange = (serviceId: string, sizeIdx: number) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [serviceId]: sizeIdx
    }));
  };

  // Calculate pricing range
  const calculation = useMemo(() => {
    let rawMin = 0;
    let rawMax = 0;

    selectedServiceIds.forEach((id) => {
      const s = SERVICES.find((item) => item.id === id);
      if (s) {
        const sizeIdx = selectedSizes[id] ?? 0;
        const opt = s.sizeOptions[sizeIdx] || s.sizeOptions[0];
        rawMin += opt.minPrice;
        rawMax += opt.maxPrice;
      }
    });

    // Bundle Discount: 2 services = 10% off, 3+ services = 15% off
    let discountPercent = 0;
    if (selectedServiceIds.length >= 3) {
      discountPercent = 15;
    } else if (selectedServiceIds.length === 2) {
      discountPercent = 10;
    }

    const discountMin = Math.round(rawMin * (discountPercent / 100));
    const discountMax = Math.round(rawMax * (discountPercent / 100));

    const finalMin = rawMin - discountMin;
    const finalMax = rawMax - discountMax;

    return {
      rawMin,
      rawMax,
      discountPercent,
      discountMin,
      discountMax,
      finalMin,
      finalMax
    };
  }, [selectedServiceIds, selectedSizes]);

  const handleApply = () => {
    const selectedServiceNames = selectedServiceIds
      .map((id) => SERVICES.find((s) => s.id === id)?.name)
      .filter((name): name is string => Boolean(name));

    const sizeLabels: Record<string, string> = {};
    selectedServiceIds.forEach((id) => {
      const s = SERVICES.find((item) => item.id === id);
      if (s) {
        const sizeIdx = selectedSizes[id] ?? 0;
        sizeLabels[s.name] = s.sizeOptions[sizeIdx]?.label || '';
      }
    });

    onApplyEstimate({
      services: selectedServiceNames,
      sizes: sizeLabels,
      estMin: calculation.finalMin,
      estMax: calculation.finalMax
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 mb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1.5">
            <Calculator className="w-4 h-4" />
            <span>Interactive Instant Estimator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Estimated Price in Real Time
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pick your services and rough property size below to see estimated pricing with instant multi-service discounts.
          </p>
        </div>

        {/* Live Price Display Box */}
        <div className="bg-gradient-to-br from-slate-900 to-sky-950 text-white p-5 rounded-2xl border border-slate-800 shadow-md min-w-[280px] flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Estimated Ballpark Range</span>
              {calculation.discountPercent > 0 && (
                <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[11px]">
                  {calculation.discountPercent}% Bundle Off
                </span>
              )}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono tabular-nums">
              ${calculation.finalMin} – ${calculation.finalMax}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {selectedServiceIds.length} service{selectedServiceIds.length > 1 ? 's' : ''} selected · Free on-site verification
            </p>
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="mt-4 w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Apply to Quote Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Services Selection Grid with Dynamic Size Selectors */}
      <div className="pt-8 space-y-6">
        <label className="block text-sm font-bold text-slate-900">
          Step 1: Choose Your Services & Property Specifications
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service: CleaningService) => {
            const isChecked = selectedServiceIds.includes(service.id);
            const currentSizeIdx = selectedSizes[service.id] ?? 0;

            return (
              <div
                key={service.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isChecked
                    ? 'bg-sky-50/60 border-sky-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header row with toggle */}
                <div
                  onClick={() => toggleService(service.id)}
                  className="flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${
                        isChecked
                          ? 'bg-sky-600 text-white'
                          : 'border border-slate-300 bg-white text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{service.name}</h4>
                      <p className="text-xs text-slate-500">{service.tagline}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-700 whitespace-nowrap">
                    {service.startingPrice}
                  </span>
                </div>

                {/* Sub-selector for property size (visible when checked) */}
                {isChecked && (
                  <div className="mt-3 pt-3 border-t border-sky-200/60 space-y-2">
                    <label className="block text-[11px] font-semibold text-sky-900 uppercase tracking-wide">
                      Select approximate size:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {service.sizeOptions.map((opt, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => handleSizeChange(service.id, idx)}
                          className={`p-2 rounded-lg text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                            currentSizeIdx === idx
                              ? 'bg-sky-600 text-white font-bold shadow-xs'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          <span className="truncate pr-1">{opt.label}</span>
                          <span className="font-mono text-[11px] shrink-0 opacity-90 tabular-nums">
                            ${opt.minPrice}-${opt.maxPrice}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bundle incentive callout */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              <strong>Smart Bundle Savings:</strong> Combine 2 services for 10% off; combine 3 or more services for 15% off entire job!
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>Guaranteed flat rates</span>
          </div>
        </div>
      </div>
    </div>
  );
}
