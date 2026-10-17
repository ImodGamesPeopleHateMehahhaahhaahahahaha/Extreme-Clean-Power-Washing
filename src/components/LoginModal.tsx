import { useState, useEffect } from 'react';
import { X, ShieldCheck, UserCheck, User, Lock, ArrowRight, KeyRound, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';
import { getStoredEmployees } from '../services/store';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
  onLoginSuccess: (role: UserRole) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  defaultRole = 'admin',
  onLoginSuccess
}: LoginModalProps) {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeEmployees, setActiveEmployees] = useState(() => getStoredEmployees());

  useEffect(() => {
    if (isOpen) {
      setActiveEmployees(getStoredEmployees());
      handleRoleTabChange(defaultRole);
    }
  }, [isOpen, defaultRole]);

  if (!isOpen) return null;

  const handleRoleTabChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMsg('');
    if (role === 'admin') {
      setUsername('admin');
      setPassword('');
    } else if (role === 'employee') {
      const emps = getStoredEmployees();
      if (emps.length > 0) {
        setUsername(emps[0].username);
        setPassword(emps[0].password);
      } else {
        setUsername('');
        setPassword('');
      }
    } else {
      setUsername('david.sanchez@gmail.com');
      setPassword('password123');
    }
  };

  const handleFillDemo = () => {
    if (selectedRole === 'admin') {
      setUsername('admin');
      setPassword('Dumbasskid99$');
    } else if (selectedRole === 'employee') {
      const emps = getStoredEmployees();
      if (emps.length > 0) {
        setUsername(emps[0].username);
        setPassword(emps[0].password);
      }
    } else {
      setUsername('david.sanchez@gmail.com');
      setPassword('password123');
    }
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = login(username, password, selectedRole);
    if (res.success) {
      onLoginSuccess(selectedRole);
      onClose();
    } else {
      setErrorMsg(res.message || 'Login failed. Please check credentials.');
    }
  };

  const employeesCount = activeEmployees.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Secure Portal Authentication
          </span>
          <h3 className="text-xl font-extrabold text-white mt-1">Extreme Clean Portal</h3>
          <p className="text-xs text-slate-400 mt-1">
            Access admin management, technician job schedule, or customer quote status.
          </p>
        </div>

        {/* Role Segmented Tabs */}
        <div className="p-4 bg-slate-100 border-b border-slate-200">
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              className={`py-2 px-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                selectedRole === 'admin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('employee')}
              className={`py-2 px-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                selectedRole === 'employee'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Employee</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('customer')}
              className={`py-2 px-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                selectedRole === 'customer'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Customer</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Special notice if Employee tab selected and no employees exist yet */}
          {selectedRole === 'employee' && employeesCount === 0 && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">No Employees Created Yet</p>
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    Existing employee list was reset. Log in as <strong>Admin</strong> (Robert) and
                    use the <strong>"Add Employee"</strong> button in Admin Oversight to create your
                    first employee account.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRoleTabChange('admin')}
                className="w-full py-1.5 px-3 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Switch to Admin Login (admin / Dumbasskid99$)
              </button>
            </div>
          )}

          {/* Description for selected role */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            {selectedRole === 'admin' && (
              <p>
                <strong>Admin / Robert Thompson:</strong> Oversee all incoming customer quotes,
                manage listings, change job statuses, and add/manage employees.
              </p>
            )}
            {selectedRole === 'employee' && employeesCount > 0 && (
              <p>
                <strong>Wash Technician / Crew:</strong> View assigned daily routes, check job specs,
                and update your password while logged in.
              </p>
            )}
            {selectedRole === 'customer' && (
              <p>
                <strong>Customer Portal:</strong> Track your submitted estimate requests, review
                quotes from Robert, schedule service, and view receipts.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {selectedRole === 'customer' ? 'Email or Username' : 'Username'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={
                  selectedRole === 'admin'
                    ? 'admin'
                    : selectedRole === 'employee'
                    ? 'employee username'
                    : 'your.email@gmail.com'
                }
                required
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Quick Demo Autofill Button */}
          <div className="pt-1 flex items-center justify-between text-xs">
            {selectedRole === 'admin' ? (
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Autofill Admin Credentials</span>
              </button>
            ) : selectedRole === 'employee' && employeesCount > 0 ? (
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Autofill Employee ({activeEmployees[0].username})</span>
              </button>
            ) : selectedRole === 'customer' ? (
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Autofill Customer (david.sanchez@gmail.com)</span>
              </button>
            ) : null}

            {selectedRole === 'admin' && (
              <span className="text-[11px] font-mono text-slate-400">admin / Dumbasskid99$</span>
            )}
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Log In to {selectedRole.toUpperCase()} Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
