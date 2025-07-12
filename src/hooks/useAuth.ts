import { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('vampforge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Default admin credentials
    if (email === 'admin@vampforge.site' && password === 'VampForge2025') {
      const adminUser = { name: 'Admin', email, role: 'admin' as const };
      setUser(adminUser);
      localStorage.setItem('vampforge_user', JSON.stringify(adminUser));
      return true;
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('vampforge_users') || '[]');
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const userObj = { name: existingUser.name, email: existingUser.email, role: 'user' as const };
      setUser(userObj);
      localStorage.setItem('vampforge_user', JSON.stringify(userObj));
      return true;
    }

    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('vampforge_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    // Add new user
    const newUser = { name, email, password, role: 'user' };
    users.push(newUser);
    localStorage.setItem('vampforge_users', JSON.stringify(users));

    // Auto login
    const userObj = { name, email, role: 'user' as const };
    setUser(userObj);
    localStorage.setItem('vampforge_user', JSON.stringify(userObj));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vampforge_user');
  };

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };
};