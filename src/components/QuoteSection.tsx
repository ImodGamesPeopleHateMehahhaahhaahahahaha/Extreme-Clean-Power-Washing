import { useState, useEffect, useRef } from 'react';
import {
  Send,
  CheckCircle,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Camera,
  Upload,
  X,
  Image as ImageIcon,
  Calculator,
  Tag
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/servicesData';
import { QuoteFormData, UploadedPhoto } from '../types';
import { addQuoteRecord } from '../services/store';
import InstantPriceEstimator from './InstantPriceEstimator';

interface QuoteSectionProps {
  preselectedService?: string;
  onClearPreselectedService?: () => void;
}

export default function QuoteSection({
  preselectedService,
  onClearPreselectedService
}: QuoteSectionProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    zipCode: '',
    selectedServices: ['Driveways & Walkways'],
    serviceSizes: {
      'Driveways & Walkways': '2-Car Driveway (Standard)'
    },
    propertyType: 'residential',
    jobSize: 'Standard 2-Car Driveway',
    urgency: 'this_week',
    notes: '',
    photos: []
  });

  const [estimatedRange, setEstimatedRange] = useState<{ min: number; max: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle incoming preselected service from cards
  useEffect(() => {
    if (preselectedService) {
      if (preselectedService === 'Multi-Service Bundle') {
        setFormData((prev) => ({
          ...prev,
          selectedServices: [
            'Driveways & Walkways',
            'Outside House Walls / Siding',
            'Trash Cans & Bins'
          ]
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          selectedServices: prev.selectedServices.includes(preselectedService)
            ? prev.selectedServices
            : [...prev.selectedServices, preselectedService]
        }));
      }
    }
  }, [preselectedService]);

  const toggleService = (serviceName: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(serviceName);
      if (exists) {
        if (prev.selectedServices.length === 1) return prev; // Keep at least one
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter((s) => s !== serviceName)
        };
      } else {
        return {
          ...prev,
          selectedServices: [...prev.selectedServices, serviceName]
        };
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrorMsg('');
  };

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newPhotos: UploadedPhoto[] = [];
    const maxPhotos = 4;
    const remainingSlots = maxPhotos - formData.photos.length;

    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    let processedCount = 0;
    filesToProcess.forEach((file) => {
      // Check size (under 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg(`Photo "${file.name}" exceeds 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotos.push({
            id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            dataUrl: event.target.result as string,
            sizeKb: Math.round(file.size / 1024)
          });
        }
        processedCount++;
        if (processedCount === filesToProcess.length) {
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, ...newPhotos]
          }));
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input value so same file can be re-selected if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id)
    }));
  };

  // Receiver for InstantPriceEstimator selections
  const handleApplyEstimate = (data: {
    services: string[];
    sizes: Record<string, string>;
    estMin: number;
    estMax: number;
  }) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: data.services,
      serviceSizes: data.sizes
    }));
    setEstimatedRange({ min: data.estMin, max: data.estMax });

    // Smooth scroll down to form
    const formElement = document.getElementById('quote-form-fields');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter a phone number where Robert can reach you.');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg('Please enter your property street address or neighborhood.');
      return;
    }
    if (formData.selectedServices.length === 0) {
      setErrorMsg('Please select at least one service needed.');
      return;
    }

    // Save to persistent store for Admin and Customer Portals
    addQuoteRecord({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      zipCode: formData.zipCode,
      selectedServices: formData.selectedServices,
      serviceSizes: formData.serviceSizes,
      propertyType: formData.propertyType,
      jobSize: formData.jobSize || `${formData.selectedServices.length} service(s) requested`,
      urgency: formData.urgency,
      notes: formData.notes,
      photos: formData.photos,
      estimatedMin: estimatedRange ? estimatedRange.min : 125,
      estimatedMax: estimatedRange ? estimatedRange.max : 210,
      assignedTo: 'Robert Thompson'
    });

    setSubmitted(true);
  };

  // Generate pre-filled message text for SMS / Email
  const getSummaryMessage = () => {
    const sizeDetails = Object.entries(formData.serviceSizes)
      .filter(([service]) => formData.selectedServices.includes(service))
      .map(([service, size]) => `${service} (${size})`)
      .join(', ');

    return `Hi Robert! I would like a free power washing estimate from Extreme Clean Power Washing:
- Name: ${formData.fullName}
- Phone: ${formData.phone}
- Email: ${formData.email || 'N/A'}
- Service Address: ${formData.address}, ${formData.zipCode || 'San Antonio area'}
- Property: ${formData.propertyType === 'residential' ? 'Residential Home' : 'Commercial Facility'}
- Services: ${formData.selectedServices.join(', ')}
${sizeDetails ? `- Specifications: ${sizeDetails}\n` : ''}${
      estimatedRange ? `- Online Estimated Range: $${estimatedRange.min} - $${estimatedRange.max}\n` : ''
    }- Timeframe: ${
      formData.urgency === 'asap'
        ? 'As soon as possible'
        : formData.urgency === 'this_week'
        ? 'This week'
        : formData.urgency === 'next_two_weeks'
        ? 'Within next 2 weeks'
        : 'Getting pricing estimate'
    }
${formData.photos.length > 0 ? `- Photos Attached: ${formData.photos.length} photo(s) ready to send\n` : ''}- Notes: ${formData.notes || 'None'}`;
  };

  const copySummary = () => {
    navigator.clipboard.writeText(getSummaryMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const smsUrl = `sms:${BUSINESS_INFO.rawPhone}?&body=${encodeURIComponent(getSummaryMessage())}`;
  const mailtoUrl = `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
    `Free Estimate Request from ${formData.fullName} - San Antonio`
  )}&body=${encodeURIComponent(getSummaryMessage())}`;

  return (
    <section id="quote" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 mb-2">
              <span>Fast & Accurate</span>
              <span aria-hidden="true">·</span>
              <span>100% Free Estimates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get an Instant Estimate & Quote
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Use our interactive estimator to calculate pricing, or snap and attach photos from your
              phone for an exact quote within 2 hours.
            </p>
          </div>

          {/* Interactive Price Estimator Component */}
          {!submitted && <InstantPriceEstimator onApplyEstimate={handleApplyEstimate} />}

          {!submitted ? (
            <form
              id="quote-form-fields"
              onSubmit={handleSubmit}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8"
            >
              {/* Important Youth & Uninsured Disclosure Banner */}
              <div className="p-4 sm:p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl text-xs sm:text-sm text-slate-800 space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Notice: 16-Year-Old Student • Uninsured Neighborhood Service</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Robert is a 16-year-old high school student doing pressure washing to make extra money. Extreme Clean is
                  <strong> NOT an official business entity or LLC, and is NOT insured whatsoever</strong>. Robert takes immense care
                  and respects every property, but please make sure you acknowledge this before requesting an estimate.
                </p>
              </div>

              {errorMsg && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Estimated Price Banner if applied from Estimator */}
              {estimatedRange && (
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-sky-900 uppercase tracking-wide">
                        Applied Online Estimate
                      </span>
                      <p className="text-lg font-extrabold text-slate-900 font-mono tabular-nums">
                        ${estimatedRange.min} – ${estimatedRange.max}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">
                    *Final price confirmed with photos or on-site walk-through
                  </span>
                </div>
              )}

              {/* Step 1: Services Needed */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-900">
                  1. Which Services Do You Need? <span className="text-sky-600 font-medium">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SERVICES.map((service) => {
                    const isSelected = formData.selectedServices.includes(service.name);
                    return (
                      <button
                        type="button"
                        key={service.id}
                        onClick={() => toggleService(service.name)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-semibold">{service.name}</span>
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center text-xs shrink-0 ${
                            isSelected
                              ? 'bg-white text-sky-600 font-bold'
                              : 'border border-slate-300 text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Contact Details */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-900">
                  2. Your Contact Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Robert / Sarah Johnson"
                      required
                      className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(210) 000-0000"
                      required
                      className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(For estimate & invoice)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@gmail.com"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900"
                    >
                      <option value="residential">Residential Home</option>
                      <option value="commercial">Small Local Shop / Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Location / Address */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-900">
                  3. Property Address & San Antonio ZIP Code
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Address or Neighborhood <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. 14202 Stone Oak Pkwy"
                      required
                      className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ZIP Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="e.g. 78258"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Photo Upload Feature */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-slate-900">
                    4. Snap & Attach Photos of Dirty Areas{' '}
                    <span className="text-emerald-700 font-semibold">(Recommended for Fast Quote)</span>
                  </label>
                  <span className="text-xs text-slate-500">Up to 4 photos</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Snap quick photos of your driveway, stained concrete, house siding, or fence from
                  your phone. This lets Robert calculate square footage and send an exact quote
                  without you waiting around for an on-site visit.
                </p>

                {/* Upload Drop Zone / Camera Trigger */}
                <div className="p-6 bg-white border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl text-center transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    capture="environment"
                    onChange={handlePhotoUpload}
                    id="photo-upload-input"
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-upload-input"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-sky-700 hover:text-sky-800 underline">
                        Tap here to snap photo with camera
                      </span>{' '}
                      <span className="text-slate-600 text-xs sm:text-sm">or choose from library</span>
                    </div>
                    <p className="text-[11px] text-slate-400">JPG, PNG, WEBP (Max 10MB each)</p>
                  </label>
                </div>

                {/* Photo Previews */}
                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {formData.photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 h-28"
                      >
                        <img
                          src={photo.dataUrl}
                          alt="Uploaded area photo"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-rose-600 transition-colors cursor-pointer"
                          aria-label="Remove photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-[10px] text-white px-2 py-0.5 truncate pointer-events-none">
                          {photo.name} ({photo.sizeKb}KB)
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 5: Urgency & Notes */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Timeframe
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                    >
                      <option value="asap">As soon as possible / Emergency</option>
                      <option value="this_week">This week</option>
                      <option value="next_two_weeks">Within next 2 weeks</option>
                      <option value="just_pricing">Just gathering pricing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Specific Problem Areas
                    </label>
                    <input
                      type="text"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g. Oil stains, HOA violation letter, back fence moss"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-sky-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Free Quote Request to Robert</span>
                </button>
                <div className="text-center text-xs text-slate-500 mt-3 space-y-1">
                  <p className="flex items-center justify-center gap-1.5 text-amber-700 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Informal neighborhood service by a 16-year-old student · Not insured</span>
                  </p>
                  <p className="text-[11px] text-slate-400">Zero spam · Robert will text or call you directly with a fair price</p>
                </div>
              </div>
            </form>
          ) : (
            /* Submission Confirmation Screen with Direct Text / Call / Email Actions */
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Request Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mt-2 leading-relaxed">
                  Robert Thompson has received your estimate request for{' '}
                  <strong className="text-slate-900">{formData.selectedServices.join(', ')}</strong> at{' '}
                  <strong className="text-slate-900">{formData.address}</strong>.
                  {formData.photos.length > 0 && (
                    <span className="block mt-1 text-emerald-700 font-medium">
                      ✓ {formData.photos.length} photo(s) attached for fast pricing review.
                    </span>
                  )}
                </p>
              </div>

              {/* Quick Communication Box */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-xl mx-auto space-y-4">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Want an immediate reply? Send your details to Robert directly:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={smsUrl}
                    className="p-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via SMS Text</span>
                  </a>

                  <a
                    href={`tel:${BUSINESS_INFO.rawPhone}`}
                    className="p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call (210) 326-6306</span>
                  </a>

                  <a
                    href={mailtoUrl}
                    className="p-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors sm:col-span-2"
                  >
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span>Email directly to {BUSINESS_INFO.email}</span>
                  </a>
                </div>
              </div>

              {/* Secondary utility actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={copySummary}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Summary!' : 'Copy Estimate Summary'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setEstimatedRange(null);
                    if (onClearPreselectedService) onClearPreselectedService();
                  }}
                  className="px-4 py-2 text-sky-600 hover:text-sky-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Submit Another Property Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
