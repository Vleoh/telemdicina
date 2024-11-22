import React, { createContext, useContext, useState } from 'react';

interface DoctorProfile {
  name: string;
  lastName: string;
  license: string;
  specialty: string;
  startDate: string;
  avatar: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isOnline: boolean;
  doctorProfile: DoctorProfile;
  login: (email: string, password: string) => void;
  logout: () => void;
  toggleOnlineStatus: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [doctorProfile] = useState<DoctorProfile>({
    name: "Roberto",
    lastName: "González",
    license: "MN 12345",
    specialty: "Medicina General",
    startDate: "15/03/2020",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60"
  });

  const login = (email: string, password: string) => {
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsOnline(false);
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isOnline,
      doctorProfile,
      login, 
      logout,
      toggleOnlineStatus 
    }}>
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