import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * DEMO-ONLY AUTHENTICATION
 * 
 * This is a mocked authentication system for demonstration purposes only.
 * No backend calls, no JWTs, no OAuth - just localStorage persistence.
 * 
 * Auth model:
 * - Email-only login (no password)
 * - User object: { email: string; role: "Workspace Admin" }
 * - State persisted in localStorage
 */

export interface User {
  email: string;
  role: "Workspace Admin";
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "spaceflow_auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize user state directly from localStorage to avoid loading state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedAuth = localStorage.getItem(STORAGE_KEY);
      if (storedAuth) {
        return JSON.parse(storedAuth);
      }
    } catch (error) {
      // Invalid stored data, clear it
      localStorage.removeItem(STORAGE_KEY);
    }
    return null;
  });

  // Sync with localStorage changes (e.g., from other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch (error) {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (email: string) => {
    const newUser: User = {
      email,
      role: "Workspace Admin"
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

