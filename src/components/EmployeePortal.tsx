import { useState } from 'react';
import {
  UserCheck,
  CheckCircle,
  MapPin,
  Phone,
  Clock,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  Camera,
  Check,
  Navigation,
  Lock,
  KeyRound,
  X,
  ShieldCheck
} from 'lucide-react';
import { QuoteRecord, QuoteStatus } from '../types';
import { getStoredQuotes, updateQuoteStatus } from '../services/store';
import { useAuth } from '../context/AuthContext';

interface EmployeePortalProps {
  onBackToSite: () => void;
}

export default function EmployeePortal({ onBackToSite }: EmployeePortalProps) {
  const { user, logout, changePassword } = useAuth();
  const [quotes, setQuotes] = useState<QuoteRecord[]>(() => getStoredQuotes());

  // Change Password state (Only accessible when signed in)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Active technician's jobs (or all active jobs for scheduling)
  const employeeJobs = quotes.filter(
    (q) => q.status === 'scheduled' || q.status === 'reviewing' || q.status === 'completed'
  );

  const handleCompleteJob = (id: string) => {
    const updated = updateQuoteStatus(id, {
      status: 'completed',
      internalNotes:
        (quotes.find((q) => q.id === id)?.internalNotes || '') +
        ` [Completed on site by ${user?.fullName || 'Technician'}]`
    });
    setQuotes(updated);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }
    if (currentPassword === newPassword) {
      setPasswordError('New password must be different from your current password.');
      return;
    }

    const res = changePassword(currentPassword, newPassword);
    if (res.success) {
      setPasswordSuccess(res.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setIsChangePasswordOpen(false);
        setPasswordSuccess('');
      }, 2000);
    } else {
      setPasswordError(res.message);
    }
  };

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
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-sm sm:text-base font-extrabold text-white">
                    Technician Field Portal
                  </h1>
                  <p className="text-[11px] text-slate-400">Extreme Clean Power Washing</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Signed-in Employee Change Password Action */}
              <button
                onClick={() => {
                  setPasswordError('');
                  setPasswordSuccess('');
                  setIsChangePasswordOpen(true);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-sky-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Change Password</span>
              </button>

              <div className="hidden sm:block text-right text-xs">
                <span className="text-white font-bold block">{user?.fullName}</span>
                <span className="text-blue-400 text-[11px] font-mono">@{user?.username}</span>
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Welcome & Security Banner */}
        <div className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>San Antonio Wash Schedule</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Welcome, {user?.fullName}!
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Active assigned jobs roster. Follow safety guidelines: pre-wet flowerbeds and calibrate pressure per surface.
            </p>
          </div>

          <button
            onClick={() => {
              setPasswordError('');
              setPasswordSuccess('');
              setIsChangePasswordOpen(true);
            }}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Lock className="w-3.5 h-3.5 text-sky-400" />
            <span>Change My Password</span>
          </button>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Assigned Field Cleanings ({employeeJobs.length})
            </h3>
            <span className="text-xs text-slate-500">
              {employeeJobs.filter((j) => j.status === 'scheduled').length} pending execution
            </span>
          </div>

          {employeeJobs.map((job) => {
            const isCompleted = job.status === 'completed';
            return (
              <div
                key={job.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isCompleted
                    ? 'bg-slate-50 border-slate-200 opacity-80'
                    : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      ID: {job.id} · Scheduled
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{job.fullName}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                        {job.scheduledDate || 'Scheduled This Week'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Job Location & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 text-xs text-slate-700">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Property Address:</span>
                    <p className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>
                        {job.address}, San Antonio, TX {job.zipCode}
                      </span>
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${job.address}, San Antonio, TX ${job.zipCode}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-sky-600 font-bold hover:underline pt-0.5"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Open in Maps</span>
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Customer Contact:</span>
                    <a
                      href={`tel:${job.phone.replace(/\D/g, '')}`}
                      className="inline-flex items-center gap-1.5 font-bold text-slate-900 hover:text-sky-600"
                    >
                      <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{job.phone}</span>
                    </a>
                    {job.internalNotes && (
                      <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 mt-1">
                        <strong>Tech Notes:</strong> {job.internalNotes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Services Scope Checklist */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">Services to Execute:</span>
                  <div className="flex flex-wrap gap-2">
                    {job.selectedServices.map((service, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completion CTA */}
                {!isCompleted && (
                  <div className="pt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => handleCompleteJob(job.id)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark Job Completed</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Change Password Modal (Only when signed in as employee) */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Change Password</h3>
                  <p className="text-[11px] text-slate-500">Logged in as {user?.username}</p>
                </div>
              </div>
              <button
                onClick={() => setIsChangePasswordOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passwordError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium rounded-xl">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    required
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    required
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
