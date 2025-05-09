import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser, loginUser, logoutUser, signUpUser } from '../utils/customAuth';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userObj = await getCurrentUser();
      if (userObj) {
        setUser(userObj);
        await AsyncStorage.setItem('userId', userObj.id);
      } else {
        await AsyncStorage.removeItem('userId');
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const u = await loginUser(email, password);
    setUser(u);
    await AsyncStorage.setItem('userId', u.id);
    return u;
  };

  const signup = async (email: string, password: string, name: string) => {
    const u = await signUpUser(email, password, name);
    setUser(u);
    await AsyncStorage.setItem('userId', u.id);
    return u;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    await AsyncStorage.removeItem('userId');
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
