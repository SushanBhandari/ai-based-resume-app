import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, loginUser, logoutUser, signUpUser } from 'utils/customAuth';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const id = await getCurrentUser();
      if (id) setUser({ id });
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const u = await loginUser(email, password);
    setUser(u);
    return u;
  };

  const signup = async (email: string, password: string, name: string) => {
    const u = await signUpUser(email, password, name);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
