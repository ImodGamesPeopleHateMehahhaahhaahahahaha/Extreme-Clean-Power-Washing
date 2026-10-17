import { Phone, MessageSquare, Send } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

interface FloatingMobileBarProps {
  onOpenQuote: () => void;
}

export default function FloatingMobileBar({ onOpenQuote }: FloatingMobileBarProps) {
  const smsBody = encodeURIComponent(
    `Hi Robert! I visited Extreme Clean Power Washing website and would like a free estimate on my property in San Antonio.`
  );

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 shadow-2xl">
      <div className="flex items-center gap-2 max-w-lg mx-auto">
        {/* 1-Tap Call */}
        <a
          href={`tel:${BUSINESS_INFO.rawPhone}`}
          className="flex-1 py-2.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-sky-400" />
          <span>Call (210) 326-6306</span>
        </a>

        {/* 1-Tap Text */}
        <a
          href={`sms:${BUSINESS_INFO.rawPhone}?&body=${smsBody}`}
          className="flex-1 py-2.5 px-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all whitespace-nowrap"
        >
          <MessageSquare className="w-3.5 h-3.5 text-white" />
          <span>Text Robert</span>
        </a>

        {/* Quick Quote Icon */}
        <button
          onClick={onOpenQuote}
          className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          title="Instant Quote Form"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Free Quote</span>
        </button>
      </div>
    </div>
  );
}
