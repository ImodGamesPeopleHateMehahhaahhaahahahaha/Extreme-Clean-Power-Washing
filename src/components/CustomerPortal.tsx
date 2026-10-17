import { useState } from 'react';
import {
  User,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Phone,
  MessageSquare,
  MapPin,
  Sparkles,
  Plus
} from 'lucide-react';
import { QuoteRecord, QuoteStatus } from '../types';
import { getStoredQuotes } from '../services/store';
import { useAuth } from '../context/AuthContext';
import { BUSINESS_INFO } from '../data/servicesData';

interface CustomerPortalProps {
  onBackToSite: () => void;
  onRequestNewQuote: () => void;
}

export default function CustomerPortal({ onBackToSite, onRequestNewQuote }: CustomerPortalProps) {
  const { user, logout } = useAuth();
  const [quotes] = useState<QuoteRecord[]>(() => getStoredQuotes());

  // Filter quotes belonging to customer (or demo customer quotes)
  const customerQuotes = quotes.filter(
    (q) =>
      q.fullName.toLowerCase().includes('david') ||
      q.email.toLowerCase() === user?.email.toLowerCase() ||
      quotes.length <= 2 // fallback demo
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToSite}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Website</span>
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-xs">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-sm sm:text-base font-extrabold text-white">
                    Customer Account Hub
                  </h1>
                  <p className="text-[11px] text-slate-400">Extreme Clean Power Washing</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right text-xs">
                <span className="text-white font-bold block">{user?.fullName || 'Customer'}</span>
                <span className="text-emerald-400 text-[11px]">San Antonio Homeowner</span>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1.5 bg-slate-800 hover:bg-rose-900 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Welcome Banner */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Customer Estimate Dashboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome back, {user?.fullName}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Track your property cleaning estimates, review Robert Thompson's quotes, and view scheduled service dates.
            </p>
          </div>

          <button
            onClick={onRequestNewQuote}
            className="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Request New Cleaning Quote</span>
          </button>
        </div>

        {/* Customer Quotes List */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Your Quotes & Cleanings ({customerQuotes.length})
          </h3>

          {customerQuotes.map((q) => (
            <div
              key={q.id}
              className="p-6 bg-white rounded-3xl border border-slate-200 shadow-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block font-bold">
                    Ref ID: {q.id}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">{q.selectedServices.join(' + ')}</h4>
                </div>

                <div>
                  {q.status === 'scheduled' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
                      Scheduled: {q.scheduledDate || 'This Week'}
                    </span>
                  )}
                  {q.status === 'completed' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Completed & Satisfied
                    </span>
                  )}
                  {q.status === 'pending' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      Pending Robert's Review
                    </span>
                  )}
                  {q.status === 'reviewing' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      Estimate Ready for Review
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[11px]">Pricing Quote</span>
                  <p className="text-xl font-mono font-extrabold text-slate-900">
                    {q.finalQuoteAmount
                      ? `$${q.finalQuoteAmount} (Confirmed Flat-Rate)`
                      : `$${q.estimatedMin} – $${q.estimatedMax} (Estimated)`}
                  </p>
                  <p className="text-[11px] text-slate-500">100% Satisfaction or Re-Clean Guarantee</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[11px]">Service Address</span>
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>
                      {q.address}, San Antonio, TX {q.zipCode}
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-500">Assigned Tech: {q.assignedTo || 'Robert Thompson'}</p>
                </div>
              </div>

              {/* Photos attached */}
              {q.photos.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Property Photos ({q.photos.length}):
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {q.photos.map((p) => (
                      <img
                        key={p.id}
                        src={p.dataUrl}
                        alt="Property view"
                        className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${BUSINESS_INFO.rawPhone}`}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-sky-600" />
                    <span>Call Robert (210) 326-6306</span>
                  </a>

                  <a
                    href={`sms:${BUSINESS_INFO.rawPhone}?&body=${encodeURIComponent(
                      `Hi Robert! I'm checking in on my quote ${q.id} for ${q.address}.`
                    )}`}
                    className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3 h-3 text-sky-600" />
                    <span>Text Robert</span>
                  </a>
                </div>

                <span className="text-[11px] text-slate-400">Payment due upon completion</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
