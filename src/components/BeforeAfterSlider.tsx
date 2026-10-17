import { useState } from 'react';
import { Eye, Sparkles, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

interface BeforeAfterItem {
  id: string;
  title: string;
  service: string;
  image: string;
  beforeDesc: string;
  afterDesc: string;
  keyHighlight: string;
}

const ITEMS: BeforeAfterItem[] = [
  {
    id: 'driveway',
    title: 'Concrete Driveway & Stone Pavers Restoration',
    service: 'Driveways & Walkways',
    image: '/src/assets/images/service_driveway_walkway_1792255999162.jpg',
    beforeDesc: 'Stained with black oak tree tannins, vehicle oil drips, and embedded Texas red clay.',
    afterDesc: 'Rotary surface scrubber lifted deeply embedded grime evenly without wand stripes.',
    keyHighlight: 'Even 4,000 PSI cleaning with zero streaking or etched concrete'
  },
  {
    id: 'siding',
    title: 'Two-Story House Walls & Siding Soft Wash',
    service: 'Outside House Walls / Siding',
    image: '/src/assets/images/service_house_siding_1792256000115.jpg',
    beforeDesc: 'Heavy green algae on north-facing siding and dark spiderweb clusters under roof eaves.',
    afterDesc: 'Low-pressure soft-wash detergent dissolved organic spores and killed mildew at root.',
    keyHighlight: 'Safe low-pressure (<300 PSI) soft wash protecting paint & window caulking'
  },
  {
    id: 'fence',
    title: 'Weathered Cedar Privacy Fence Restoration',
    service: 'Fences (Wood & Vinyl)',
    image: '/src/assets/images/service_fence_cleaning_1792256000201.jpg',
    beforeDesc: 'Severe gray UV sun bleaching, mold patches, and sprinkler hard-water staining.',
    afterDesc: 'Controlled pressure lifted dead wood cells to restore rich natural golden cedar grain.',
    keyHighlight: 'Brings aged wood back to life, perfectly prepped for staining or sealing'
  },
  {
    id: 'trash-cans',
    title: 'Curbside Trash & Recycling Bin Deep Sanitization',
    service: 'Trash Cans & Bins',
    image: '/src/assets/images/service_trash_bins_1792256000221.jpg',
    beforeDesc: 'Grease buildup, foul rotting Texas heat odors, and bacteria breeding inside bins.',
    afterDesc: 'High-temp 200°F sanitizing wash blasted away residues and left a fresh citrus scent.',
    keyHighlight: 'Eliminates bacteria, maggots, and noxious odors'
  }
];

interface BeforeAfterSliderProps {
  onSelectService: (serviceName: string) => void;
}

export default function BeforeAfterSlider({ onSelectService }: BeforeAfterSliderProps) {
  const [activeItem, setActiveItem] = useState<BeforeAfterItem>(ITEMS[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <section id="results" className="py-16 sm:py-24 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 mb-2">
            <Sliders className="w-4 h-4" />
            <span>Interactive Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See the Before & After Difference
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Drag the slider handle across the photos below to witness the dramatic results Robert delivers
            on San Antonio neighborhood driveways, siding, fences, and trash bins.
          </p>
        </div>

        {/* Tab Buttons to switch surfaces */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeItem.id === item.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {item.service}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Slider Container */}
            <div className="lg:col-span-8 relative bg-slate-950 select-none min-h-[360px] sm:min-h-[440px] flex items-center justify-center overflow-hidden">
              {/* Clean "After" Image (Full background) */}
              <img
                src={activeItem.image}
                alt={`${activeItem.title} - Freshly cleaned after`}
                className="w-full h-full object-cover min-h-[360px] sm:min-h-[440px]"
                referrerPolicy="no-referrer"
              />

              {/* Dirty "Before" Image (Clipped by slider position) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeItem.image}
                  alt={`${activeItem.title} - Dirty weathered before`}
                  className="w-full h-full object-cover min-h-[360px] sm:min-h-[440px] filter contrast-125 brightness-75 sepia-[0.35]"
                  style={{
                    width: '100%',
                    maxWidth: 'none',
                    minWidth: '100%'
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-amber-950/20 mix-blend-multiply" />
                <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 shadow-md">
                  BEFORE (Dirty / Weathered)
                </div>
              </div>

              {/* After Badge on the Right */}
              <div className="absolute top-4 right-4 bg-sky-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 shadow-md pointer-events-none">
                AFTER (Extreme Clean)
              </div>

              {/* Vertical Divider Line with Grab Handle */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-2xl cursor-ew-resize pointer-events-none z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-sky-700 shadow-2xl flex items-center justify-center font-bold text-sm border-2 border-sky-400">
                  <span className="text-xs tracking-tighter">◀ ▶</span>
                </div>
              </div>

              {/* Range Input for fluid dragging across all devices */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                aria-label={`Drag to compare before and after for ${activeItem.title}`}
              />

              {/* Bottom Quick Jump Buttons */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={() => setSliderPosition(100)}
                  className="pointer-events-auto text-[11px] font-bold px-2.5 py-1 bg-slate-900/80 hover:bg-slate-900 text-white rounded-md backdrop-blur-sm transition-colors cursor-pointer"
                >
                  View 100% Before
                </button>

                <div className="bg-slate-900/80 backdrop-blur-sm text-slate-200 text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  <span>Drag slider left/right</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSliderPosition(0)}
                  className="pointer-events-auto text-[11px] font-bold px-2.5 py-1 bg-sky-600/90 hover:bg-sky-600 text-white rounded-md backdrop-blur-sm transition-colors cursor-pointer"
                >
                  View 100% After
                </button>
              </div>
            </div>

            {/* Sidebar Details & Booking Callout */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                    {activeItem.service}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 leading-snug">
                    {activeItem.title}
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Common Problem:</span>
                    <span className="text-slate-600 leading-relaxed">{activeItem.beforeDesc}</span>
                  </div>

                  <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-100">
                    <span className="font-bold text-sky-900 block mb-1">The Extreme Clean Fix:</span>
                    <span className="text-slate-700 leading-relaxed">{activeItem.afterDesc}</span>
                  </div>

                  <div className="flex items-start gap-2 text-xs font-semibold text-emerald-800 pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{activeItem.keyHighlight}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onSelectService(activeItem.service)}
                  className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Estimate for {activeItem.service}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
