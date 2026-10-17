import { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Eye,
  Trash2,
  Edit3,
  X,
  Plus,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Layers,
  Check,
  UserCheck,
  UserPlus,
  Copy,
  KeyRound,
  Lock,
  AlertCircle,
  Users,
  BarChart3,
  TrendingUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { QuoteRecord, QuoteStatus, CleaningService, EmployeeAccount } from '../types';
import {
  getStoredQuotes,
  updateQuoteStatus,
  deleteQuoteRecord,
  getStoredServices,
  saveServices
} from '../services/store';
import { useAuth } from '../context/AuthContext';
import RevenueDashboardChart from './RevenueDashboardChart';

interface AdminPortalProps {
  onBackToSite: () => void;
}

export default function AdminPortal({ onBackToSite }: AdminPortalProps) {
  const { user, logout, employees, addEmployee, deleteEmployee, updateEmployee } = useAuth();
  const [quotes, setQuotes] = useState<QuoteRecord[]>(() => getStoredQuotes());
  const [services, setServices] = useState<CleaningService[]>(() => getStoredServices());

  const [activeTab, setActiveTab] = useState<'quotes' | 'analytics' | 'employees' | 'listings'>('quotes');
  const [showChartInQuotes, setShowChartInQuotes] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRecord | null>(null);

  // Editing service state
  const [editingService, setEditingService] = useState<CleaningService | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // Inline Add Employee Form state
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    username: '',
    password: '',
    phone: '',
    email: ''
  });
  const [employeeError, setEmployeeError] = useState('');
  const [employeeSuccess, setEmployeeSuccess] = useState('');
  const [copiedEmpId, setCopiedEmpId] = useState<string | null>(null);

  // Status badge helper
  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Pending Review
          </span>
        );
      case 'reviewing':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            Estimate Sent / Reviewing
          </span>
        );
      case 'scheduled':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
            Scheduled Job
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Completed & Invoiced
          </span>
        );
      case 'declined':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            Declined
          </span>
        );
      default:
        return null;
    }
  };

  const handleUpdateStatus = (id: string, newStatus: QuoteStatus) => {
    const updated = updateQuoteStatus(id, { status: newStatus });
    setQuotes(updated);
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleUpdateDetails = (id: string, updates: Partial<QuoteRecord>) => {
    const updated = updateQuoteStatus(id, updates);
    setQuotes(updated);
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const handleDeleteQuote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this quote record?')) {
      const updated = deleteQuoteRecord(id);
      setQuotes(updated);
      if (selectedQuote?.id === id) {
        setSelectedQuote(null);
      }
    }
  };

  // Add Employee Handler using global AuthContext state
  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployeeError('');
    setEmployeeSuccess('');

    if (!newEmployee.name.trim()) {
      setEmployeeError('Please enter the employee full name.');
      return;
    }
    if (!newEmployee.username.trim()) {
      setEmployeeError('Please enter a username for employee login.');
      return;
    }
    if (!newEmployee.password.trim() || newEmployee.password.trim().length < 6) {
      setEmployeeError('Initial password must be at least 6 characters.');
      return;
    }
    if (!newEmployee.phone.trim()) {
      setEmployeeError('Please enter employee phone number.');
      return;
    }

    // Check username collision in global state
    const existing = employees.find(
      (emp) => emp.username.toLowerCase() === newEmployee.username.trim().toLowerCase()
    );
    if (existing) {
      setEmployeeError(`An employee with username "${newEmployee.username.trim()}" already exists.`);
      return;
    }

    addEmployee({
      name: newEmployee.name,
      username: newEmployee.username,
      password: newEmployee.password,
      phone: newEmployee.phone,
      email: newEmployee.email
    });

    setEmployeeSuccess(`Employee "${newEmployee.name}" successfully added to global team state!`);
    setNewEmployee({ name: '', username: '', password: '', phone: '', email: '' });
    setTimeout(() => setEmployeeSuccess(''), 4000);
  };

  // Delete employee using global AuthContext
  const handleDeleteEmployee = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete employee "${name}"? This will immediately remove their portal access.`)) {
      deleteEmployee(id);
    }
  };

  const handleToggleEmpActive = (id: string, currentActive: boolean) => {
    updateEmployee(id, { active: !currentActive });
  };

  const copyEmpCredentials = (emp: EmployeeAccount) => {
    const text = `Extreme Clean Employee Login:\nPortal: ${window.location.origin}\nUsername: ${emp.username}\nPassword: ${emp.password}`;
    navigator.clipboard.writeText(text);
    setCopiedEmpId(emp.id);
    setTimeout(() => setCopiedEmpId(null), 2500);
  };

  // Listings edit save
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const updated = services.map((s) => (s.id === editingService.id ? editingService : s));
    setServices(updated);
    saveServices(updated);
    setEditingService(null);
  };

  const handleToggleServiceActive = (id: string) => {
    const updated = services.map((s) => (s.id === id ? { ...s, active: s.active === false } : s));
    setServices(updated);
    saveServices(updated);
  };

  // Filtered quotes
  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      q.fullName.toLowerCase().includes(query) ||
      q.address.toLowerCase().includes(query) ||
      q.zipCode.includes(query) ||
      q.phone.includes(query) ||
      q.selectedServices.some((s) => s.toLowerCase().includes(query));
    return matchesStatus && matchesSearch;
  });

  // KPI calculations
  const totalPipeline = quotes.reduce(
    (acc, q) => acc + (q.finalQuoteAmount || (q.estimatedMin + q.estimatedMax) / 2),
    0
  );
  const pendingCount = quotes.filter((q) => q.status === 'pending').length;
  const scheduledCount = quotes.filter((q) => q.status === 'scheduled').length;
  const activeEmployeesCount = employees.filter((e) => e.active).length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      {/* Top Admin Header */}
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
                <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-white shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-sm sm:text-base font-extrabold text-white">
                    Admin Operations Center
                  </h1>
                  <p className="text-[11px] text-slate-400">Extreme Clean Power Washing</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('employees')}
                className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Manage Employees ({employees.length})</span>
              </button>

              <div className="hidden md:block text-right text-xs">
                <span className="text-white font-bold block">{user?.fullName}</span>
                <span className="text-emerald-400 text-[11px] font-mono">Authenticated Admin</span>
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

      {/* Main Admin Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Quotes & Leads
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1">
              {quotes.length}
            </p>
            <span className="text-xs text-sky-600 font-semibold mt-1 block">
              San Antonio Area Requests
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
              Pending Review
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono mt-1">
              {pendingCount}
            </p>
            <span className="text-xs text-slate-500 mt-1 block">Awaiting Robert's estimate</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
              Scheduled Jobs
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-sky-600 font-mono mt-1">
              {scheduledCount}
            </p>
            <span className="text-xs text-slate-500 mt-1 block">On route this week</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
              Current Employees
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-1">
              {employees.length}
            </p>
            <span className="text-xs text-slate-500 mt-1 block">
              {activeEmployeesCount} active field crew
            </span>
          </div>
        </div>

        {/* Tab Navigation (Quotes vs Employee Management vs Listings) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'quotes'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Quotes & Leads ({quotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Revenue & Analytics (30d)</span>
            </button>

            <button
              onClick={() => setActiveTab('employees')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'employees'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Users className="w-4 h-4 text-sky-400" />
              <span>Employee Management ({employees.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('listings')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'listings'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Service Listings ({services.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ALL QUOTES OVERVIEW */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            {/* Recharts Revenue & 30-Day Conversion Chart (Collapsible) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-sky-600" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    30-Day Quotes & Jobs Pipeline
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowChartInQuotes((prev) => !prev)}
                  className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-xl border border-sky-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {showChartInQuotes ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      <span>Hide Chart</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      <span>Show 30-Day Revenue Chart</span>
                    </>
                  )}
                </button>
              </div>

              {showChartInQuotes && <RevenueDashboardChart quotes={quotes} />}
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'all', label: 'All Quotes' },
                  { id: 'pending', label: 'Pending' },
                  { id: 'reviewing', label: 'Reviewing' },
                  { id: 'scheduled', label: 'Scheduled' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'declined', label: 'Declined' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilter(f.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      statusFilter === f.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by customer, address, zip, service..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                />
              </div>
            </div>

            {/* Quotes Table & Details View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Quotes List Table */}
              <div className={`${selectedQuote ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
                        <tr>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Services</th>
                          <th className="py-3 px-4">Est. Range</th>
                          <th className="py-3 px-4">Photos</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredQuotes.map((q) => {
                          const isSelected = selectedQuote?.id === q.id;
                          return (
                            <tr
                              key={q.id}
                              onClick={() => setSelectedQuote(q)}
                              className={`hover:bg-sky-50/50 cursor-pointer transition-colors ${
                                isSelected ? 'bg-sky-50 border-l-4 border-sky-600' : ''
                              }`}
                            >
                              <td className="py-3.5 px-4 font-bold text-slate-900">
                                <div className="truncate max-w-[160px]">{q.fullName}</div>
                                <div className="text-[11px] text-slate-500 font-normal truncate">
                                  {q.address}, {q.zipCode}
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="text-slate-800 font-medium truncate max-w-[180px]">
                                  {q.selectedServices.join(', ')}
                                </div>
                                <div className="text-[11px] text-slate-500 capitalize">
                                  {q.urgency.replace('_', ' ')}
                                </div>
                              </td>

                              <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                                {q.finalQuoteAmount
                                  ? `$${q.finalQuoteAmount} (Set)`
                                  : `$${q.estimatedMin} - $${q.estimatedMax}`}
                              </td>

                              <td className="py-3.5 px-4">
                                {q.photos.length > 0 ? (
                                  <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold text-[11px]">
                                    {q.photos.length} Photo{q.photos.length > 1 ? 's' : ''}
                                  </span>
                                ) : (
                                  <span className="text-slate-400">—</span>
                                )}
                              </td>

                              <td className="py-3.5 px-4">{getStatusBadge(q.status)}</td>

                              <td className="py-3.5 px-4 text-right">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedQuote(q);
                                  }}
                                  className="px-2.5 py-1 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        })}

                        {filteredQuotes.length === 0 && (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-slate-500">
                              No quotes matching current filter or search query.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Selected Quote Detail Drawer / Panel */}
              {selectedQuote && (
                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-6 h-fit sticky top-24">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                        Lead ID: {selectedQuote.id}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {selectedQuote.fullName}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedQuote(null)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quick Contact Triggers */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${selectedQuote.phone.replace(/\D/g, '')}`}
                      className="p-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call {selectedQuote.phone}</span>
                    </a>

                    <a
                      href={`sms:${selectedQuote.phone.replace(/\D/g, '')}?&body=${encodeURIComponent(
                        `Hi ${selectedQuote.fullName}, this is Robert from Extreme Clean Power Washing regarding your estimate request!`
                      )}`}
                      className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Text Customer</span>
                    </a>
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-900 block mb-0.5">Service Location:</span>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>
                          {selectedQuote.address}, San Antonio, TX {selectedQuote.zipCode}
                        </span>
                      </p>
                    </div>

                    {selectedQuote.email && (
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Email:</span>
                        <p className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>{selectedQuote.email}</span>
                        </p>
                      </div>
                    )}

                    <div>
                      <span className="font-bold text-slate-900 block mb-0.5">Services Requested:</span>
                      <p className="font-semibold text-sky-800">
                        {selectedQuote.selectedServices.join(', ')}
                      </p>
                    </div>

                    {selectedQuote.notes && (
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Customer Notes:</span>
                        <p className="italic text-slate-600">"{selectedQuote.notes}"</p>
                      </div>
                    )}
                  </div>

                  {/* Customer Photos */}
                  {selectedQuote.photos.length > 0 && (
                    <div className="space-y-2">
                      <span className="block text-xs font-bold text-slate-900">
                        Submitted Property Photos ({selectedQuote.photos.length}):
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedQuote.photos.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => setPreviewPhoto(p.dataUrl)}
                            className="relative group h-20 rounded-xl overflow-hidden bg-slate-900 cursor-pointer border border-slate-200 shadow-xs"
                          >
                            <img
                              src={p.dataUrl}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center text-white">
                              <Eye className="w-4 h-4 opacity-75" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status & Assignment Controls */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Update Quote Status:
                      </label>
                      <select
                        value={selectedQuote.status}
                        onChange={(e) =>
                          handleUpdateStatus(selectedQuote.id, e.target.value as QuoteStatus)
                        }
                        className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                      >
                        <option value="pending">Pending Review</option>
                        <option value="reviewing">Estimate Sent / Reviewing</option>
                        <option value="scheduled">Scheduled Job</option>
                        <option value="completed">Completed & Invoiced</option>
                        <option value="declined">Declined</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Final Quote ($):
                        </label>
                        <input
                          type="number"
                          value={selectedQuote.finalQuoteAmount || ''}
                          placeholder={`Range: $${selectedQuote.estimatedMin}`}
                          onChange={(e) =>
                            handleUpdateDetails(selectedQuote.id, {
                              finalQuoteAmount: Number(e.target.value)
                            })
                          }
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Assign Tech:
                        </label>
                        <select
                          value={selectedQuote.assignedTo || 'Robert Thompson'}
                          onChange={(e) =>
                            handleUpdateDetails(selectedQuote.id, {
                              assignedTo: e.target.value
                            })
                          }
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                        >
                          <option value="Robert Thompson">Robert Thompson (Owner)</option>
                          {employees
                            .filter((e) => e.active)
                            .map((emp) => (
                              <option key={emp.id} value={emp.name}>
                                {emp.name} (Tech)
                              </option>
                            ))}
                          <option value="Unassigned">Unassigned</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Scheduled Date / Time:
                      </label>
                      <input
                        type="text"
                        value={selectedQuote.scheduledDate || ''}
                        placeholder="e.g. 2026-10-21 at 9:00 AM"
                        onChange={(e) =>
                          handleUpdateDetails(selectedQuote.id, {
                            scheduledDate: e.target.value
                          })
                        }
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Internal Crew Notes:
                      </label>
                      <textarea
                        rows={2}
                        value={selectedQuote.internalNotes || ''}
                        placeholder="Water spigot location, gate code, pet alerts..."
                        onChange={(e) =>
                          handleUpdateDetails(selectedQuote.id, {
                            internalNotes: e.target.value
                          })
                        }
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                      />
                    </div>

                    {/* Delete action */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteQuote(selectedQuote.id)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DEDICATED REVENUE & 30-DAY ANALYTICS DASHBOARD */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <RevenueDashboardChart quotes={quotes} />

            {/* Pipeline & Revenue Deep Dive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider">
                  <DollarSign className="w-4 h-4" />
                  <span>Total Pipeline Valuation</span>
                </div>
                <p className="text-2xl font-extrabold font-mono text-slate-900">
                  ${Math.round(totalPipeline).toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">
                  Aggregate value across all inbound quotes, scheduled jobs, and completed cleanings.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  <span>Scheduled & Booked</span>
                </div>
                <p className="text-2xl font-extrabold font-mono text-emerald-600">
                  {scheduledCount + quotes.filter((q) => q.status === 'completed').length} Jobs
                </p>
                <p className="text-xs text-slate-500">
                  High-intent closed jobs across San Antonio neighborhood and property accounts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Awaiting Robert's Quote</span>
                </div>
                <p className="text-2xl font-extrabold font-mono text-amber-600">
                  {pendingCount} Pending Leads
                </p>
                <p className="text-xs text-slate-500">
                  Homeowners ready for fast phone/SMS turnaround or onsite inspection.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EMPLOYEE MANAGEMENT SECTION */}
        {activeTab === 'employees' && (
          <div className="space-y-8">
            {/* Header info */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
                  <Users className="w-4 h-4" />
                  <span>Global Employee State</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Employee Management
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add new technicians, manage credentials, and delete employee records. Changes are synced across the entire platform.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 py-1.5 px-3 rounded-xl">
                <span>Total Employees:</span>
                <span className="font-mono font-bold text-slate-900">{employees.length}</span>
              </div>
            </div>

            {/* Grid with Form to Add New Employee + List of Current Employees */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form to Add New Employees */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-md space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Add New Employee</h4>
                    <p className="text-[11px] text-slate-500">Create employee login credentials</p>
                  </div>
                </div>

                {employeeError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium rounded-xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{employeeError}</span>
                  </div>
                )}

                {employeeSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{employeeSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleCreateEmployee} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                      placeholder="e.g. John Martinez"
                      required
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Username <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newEmployee.username}
                        onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                        placeholder="e.g. johnm"
                        required
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Initial Password <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newEmployee.password}
                        onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        placeholder="Min 6 chars"
                        required
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                      placeholder="(210) 555-0199"
                      required
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      placeholder="john@extremeclean.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    The employee can sign into the Employee Portal using this username & password,
                    and will be able to change their password once signed in.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add Employee to Team</span>
                  </button>
                </form>
              </div>

              {/* Right Column: List of Current Employees with Delete Button */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Current Employees List ({employees.length})
                  </h4>
                  <span className="text-xs text-slate-500">
                    Stored in global AuthContext
                  </span>
                </div>

                {employees.length === 0 ? (
                  <div className="p-10 text-center bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">No Employees Found</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Use the form on the left to add your first employee.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {employees.map((emp) => (
                      <div
                        key={emp.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="text-sm font-extrabold text-slate-900">{emp.name}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-100 text-sky-800">
                              @{emp.username}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleToggleEmpActive(emp.id, emp.active)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                emp.active
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {emp.active ? 'Active' : 'Disabled'}
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                            <div>
                              <span className="text-slate-400">Phone: </span>
                              <span className="font-semibold text-slate-800">{emp.phone}</span>
                            </div>
                            {emp.email && (
                              <div className="truncate">
                                <span className="text-slate-400">Email: </span>
                                <span>{emp.email}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-slate-400">Current Password: </span>
                              <span className="font-mono font-bold text-slate-900">{emp.password}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Added: </span>
                              <span>{new Date(emp.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons including Delete */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            type="button"
                            onClick={() => copyEmpCredentials(emp)}
                            className="px-3 py-1.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors flex items-center gap-1 cursor-pointer"
                            title="Copy credentials"
                          >
                            {copiedEmpId === emp.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                            className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 hover:text-rose-800 rounded-lg border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                            title={`Delete employee ${emp.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LISTINGS MANAGEMENT */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Manage Services & Pricing Listings
                </h3>
                <p className="text-xs text-slate-500">
                  Update customer-facing rates, package descriptions, and activate or pause services.
                </p>
              </div>
            </div>

            {/* Services Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                        {s.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleServiceActive(s.id)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                          s.active !== false
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {s.active !== false ? 'Active Listing' : 'Paused'}
                      </button>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900">{s.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Public Starting Price:</span>
                        <span className="font-mono font-bold text-slate-900">{s.startingPrice}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Base Estimator Range:</span>
                        <span className="font-mono font-bold text-sky-700">
                          ${s.baseMinPrice} – ${s.baseMaxPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {s.sizeOptions.length} size tiers
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingService(s)}
                      className="px-3 py-1.5 text-xs font-bold text-sky-700 hover:text-white hover:bg-sky-600 rounded-lg border border-sky-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Listing</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Edit Listing: {editingService.name}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Name</label>
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={editingService.tagline}
                  onChange={(e) =>
                    setEditingService({ ...editingService, tagline: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Price Label
                  </label>
                  <input
                    type="text"
                    value={editingService.startingPrice}
                    onChange={(e) =>
                      setEditingService({ ...editingService, startingPrice: e.target.value })
                    }
                    placeholder="e.g. From $95"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Typical Duration
                  </label>
                  <input
                    type="text"
                    value={editingService.typicalTime}
                    onChange={(e) =>
                      setEditingService({ ...editingService, typicalTime: e.target.value })
                    }
                    placeholder="e.g. 1–2 hours"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Customer Description
                </label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Zoom Modal */}
      {previewPhoto && (
        <div
          onClick={() => setPreviewPhoto(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[85vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl p-2">
            <img
              src={previewPhoto}
              alt="Zoomed customer photo"
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
            <p className="text-center text-xs text-slate-300 py-2">Click anywhere to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
