/**
 * Demo Mode Configuration
 * 
 * When enabled, authentication is bypassed for interview/demo purposes.
 * This allows immediate access to the dashboard without requiring backend authentication.
 * 
 * The backend authentication system remains intact and functional - this is purely
 * a frontend convenience for demos.
 * 
 * Set VITE_DEMO_AUTH=true to enable demo mode.
 * Defaults to true for local development convenience.
 */

export const isDemoMode = (): boolean => {
  const envValue = import.meta.env.VITE_DEMO_AUTH;
  
  // Default to true if not explicitly set (for local development convenience)
  if (envValue === undefined) {
    return true;
  }
  
  // Explicitly check for 'true' string (Vite env vars are always strings)
  return envValue === 'true' || envValue === '1';
};

export const DEMO_USER = {
  id: 'demo-admin',
  role: 'ADMIN',
  email: 'demo@spaceflow.local'
} as const;



