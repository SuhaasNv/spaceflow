import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  validateSession,
  AuthUser
} from "../api/authApi";
import { isDemoMode, DEMO_USER } from "../config/demoMode";

export interface User {
  id: string;
  role: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const demoMode = isDemoMode();

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      if (demoMode) {
        // Demo mode: Skip backend authentication and set demo user immediately
        // TODO: In production, remove demo mode or set VITE_DEMO_AUTH=false
        if (isMounted) {
          setUser(DEMO_USER);
          setLoading(false);
        }
        return;
      }

      // Production mode: Validate session with backend
      try {
        const sessionUser = await validateSession();
        if (isMounted && sessionUser) {
          setUser(mapAuthUser(sessionUser));
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, [demoMode]);

  const handleLogin = async (email: string, password: string) => {
    if (demoMode) {
      // Demo mode: Immediately set demo user without backend call
      // TODO: In production, remove demo mode or set VITE_DEMO_AUTH=false
      setUser(DEMO_USER);
      return;
    }

    // Production mode: Authenticate with backend
    const authUser = await apiLogin(email, password);
    // We know the email from the login form; attach it so the UI can
    // display a friendly identifier without changing backend contracts.
    setUser({
      ...mapAuthUser(authUser),
      email
    });
  };

  const handleLogout = async () => {
    if (demoMode) {
      // Demo mode: Just clear user state
      // TODO: In production, remove demo mode or set VITE_DEMO_AUTH=false
      setUser(null);
      return;
    }

    // Production mode: Call backend logout
    try {
      await apiLogout();
    } finally {
      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login: handleLogin,
        logout: handleLogout,
        isDemoMode: demoMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const mapAuthUser = (authUser: AuthUser): User => ({
  id: authUser.id,
  role: authUser.role
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};