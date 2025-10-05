import { getCurrentUserApi } from '@apis/auth/auth.api';
import type { IUserResponse } from '@apis/auth/interfaces/user.interface';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: IUserResponse | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (userData: IUserResponse) => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const res = await getCurrentUserApi();
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: IUserResponse) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    // try {
    //   await logoutApi();
    // } finally {
    //   setUser(null);
    //   setIsAuthenticated(false);
    // }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
