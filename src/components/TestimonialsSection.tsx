import { useState } from 'react';
import { Star, CheckCircle, ExternalLink, ThumbsUp, MessageSquareHeart, Check, Copy } from 'lucide-react';
import { TESTIMONIALS, BUSINESS_INFO } from '../data/servicesData';

export default function TestimonialsSection() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyReviewLink = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.googleReviewUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Google Rating Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 mb-2">
              <span>Verified Homeowner Feedback</span>
              <span aria-hidden="true">·</span>
              <span>San Antonio, TX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Loved by San Antonio Homeowners
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Read real reviews from your neighbors in Stone Oak, Alamo Heights, and Helotes. Every job is
              inspected and approved by owner Robert Thompson before final payment.
            </p>
          </div>

          {/* Google Review Badge & Action */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-5 shrink-0">
            <div className="flex items-center gap-3">
              {/* Google G icon representation */}
              <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-lg text-slate-800 shadow-xs">
                <span className="text-blue-500 font-extrabold">G</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold text-slate-900 font-mono">4.9</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500">Based on 78+ San Antonio Google Reviews</p>
              </div>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>Leave a Google Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Service Tag */}
                <span className="text-xs font-bold text-sky-700 block">
                  {review.service}
                </span>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">{review.clientName}</p>
                  <p className="text-[11px] text-slate-500">
                    {review.neighborhood}, {review.city}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Client</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Review Encouragement Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-slate-50 to-blue-50 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Are you an existing client of Robert's?</p>
              <p className="text-xs text-slate-600">
                Your feedback helps our local San Antonio family business grow. Please consider leaving a review!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReviewLink}
              className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Review Link Copied!' : 'Copy Review Link'}</span>
            </button>
            <a
              href={BUSINESS_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              <span>Open Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Leave a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Leave a Google Review for Robert
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Thank you for choosing Extreme Clean Power Washing! As an independent owner-operator,
                your 5-star review means everything to my business.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <p className="font-bold text-slate-900">Helpful things to mention in your review:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Which service Robert completed (Driveway, Fence, House, Bins)</li>
                <li>Your San Antonio neighborhood (Stone Oak, Alamo Heights, etc.)</li>
                <li>Punctuality, equipment quality, and before-and-after results</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={BUSINESS_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowReviewModal(false)}
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl text-center shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Write a 5-Star Review on Google</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
