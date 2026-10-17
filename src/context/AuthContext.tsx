import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, UserRole, EmployeeAccount } from '../types';
import {
  getStoredUser,
  setStoredUser,
  verifyEmployeeLogin,
  getStoredEmployees,
  saveEmployees,
  addEmployee as storeAddEmployee,
  deleteEmployee as storeDeleteEmployee,
  updateEmployee as storeUpdateEmployee,
  updateEmployeePassword
} from '../services/store';

interface AuthContextType {
  user: UserAccount | null;
  employees: EmployeeAccount[];
  login: (username: string, password: string, role: UserRole) => { success: boolean; message?: string };
  logout: () => void;
  addEmployee: (data: { name: string; username: string; password: string; phone: string; email?: string }) => EmployeeAccount;
  deleteEmployee: (id: string) => void;
  updateEmployee: (id: string, updates: Partial<EmployeeAccount>) => void;
  changePassword: (currentPassword: string, newPassword: string) => { success: boolean; message: string };
  hasEmployees: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(() => getStoredUser());
  const [employees, setEmployees] = useState<EmployeeAccount[]>(() => getStoredEmployees());

  useEffect(() => {
    setStoredUser(user);
  }, [user]);

  const hasEmployees = () => {
    return employees.length > 0;
  };

  const addEmployee = (data: {
    name: string;
    username: string;
    password: string;
    phone: string;
    email?: string;
  }): EmployeeAccount => {
    const newEmp = storeAddEmployee(data);
    setEmployees(getStoredEmployees());
    return newEmp;
  };

  const deleteEmployee = (id: string) => {
    storeDeleteEmployee(id);
    setEmployees(getStoredEmployees());
  };

  const updateEmployee = (id: string, updates: Partial<EmployeeAccount>) => {
    storeUpdateEmployee(id, updates);
    setEmployees(getStoredEmployees());
  };

  const login = (username: string, password: string, role: UserRole) => {
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    // 1. Admin Login Verification (admin / Dumbasskid99$)
    if (role === 'admin') {
      if (cleanUser === 'admin' && cleanPass === 'Dumbasskid99$') {
        const adminAccount: UserAccount = {
          id: 'admin-1',
          username: 'admin',
          fullName: 'Robert Thompson (Owner & Admin)',
          role: 'admin',
          email: 'thehelper171@gmail.com',
          phone: '(210) 326-6306'
        };
        setUser(adminAccount);
        return { success: true };
      }
      return {
        success: false,
        message: 'Invalid Admin credentials. Please check your username and password.'
      };
    }

    // 2. Employee Login Verification (Verifies against reactive employees state)
    if (role === 'employee') {
      if (employees.length === 0) {
        return {
          success: false,
          message:
            'No employees have been created yet. Please log in as Admin (Robert) and add an employee in the Employee Management section.'
        };
      }

      const verifiedEmp = employees.find(
        (emp) =>
          emp.username.toLowerCase() === cleanUser.toLowerCase() &&
          emp.password === cleanPass &&
          emp.active
      );

      if (verifiedEmp) {
        const empAccount: UserAccount = {
          id: verifiedEmp.id,
          username: verifiedEmp.username,
          fullName: verifiedEmp.name,
          role: 'employee',
          email: verifiedEmp.email || `${verifiedEmp.username}@extremeclean.com`,
          phone: verifiedEmp.phone
        };
        setUser(empAccount);
        return { success: true };
      }

      return {
        success: false,
        message: 'Invalid Employee username or password. Check credentials or contact Admin.'
      };
    }

    // 3. Customer Login Verification
    if (role === 'customer') {
      if (!cleanUser || !cleanPass) {
        return { success: false, message: 'Please enter your username/email and password.' };
      }
      const custAccount: UserAccount = {
        id: 'cust-101',
        username: cleanUser,
        fullName: cleanUser.includes('@')
          ? cleanUser.split('@')[0]
          : cleanUser === 'customer'
          ? 'David & Maria Sanchez'
          : cleanUser,
        role: 'customer',
        email: cleanUser.includes('@') ? cleanUser : 'david.sanchez@gmail.com',
        phone: '(210) 456-7890'
      };
      setUser(custAccount);
      return { success: true };
    }

    return { success: false, message: 'Invalid role selection.' };
  };

  const logout = () => {
    setUser(null);
  };

  // Change password method: only allowed when employee is signed in
  const changePassword = (currentPassword: string, newPassword: string) => {
    if (!user) {
      return { success: false, message: 'You must be signed in to change your password.' };
    }
    if (user.role !== 'employee') {
      return { success: false, message: 'Password change is only available for employee accounts.' };
    }
    if (!newPassword || newPassword.trim().length < 6) {
      return { success: false, message: 'New password must be at least 6 characters.' };
    }

    // Verify current password against employees state
    const currentEmp = employees.find((e) => e.id === user.id);
    if (!currentEmp) {
      return { success: false, message: 'Employee record not found.' };
    }
    if (currentEmp.password !== currentPassword.trim()) {
      return { success: false, message: 'Current password is incorrect.' };
    }

    // Update password
    const success = updateEmployeePassword(user.id, newPassword);
    if (success) {
      setEmployees(getStoredEmployees());
      return { success: true, message: 'Your password was successfully updated!' };
    }
    return { success: false, message: 'Failed to update password. Please try again.' };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        employees,
        login,
        logout,
        addEmployee,
        deleteEmployee,
        updateEmployee,
        changePassword,
        hasEmployees
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
