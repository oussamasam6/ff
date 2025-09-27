export const login = async (): Promise<void> => {
  // Mock GitHub OAuth redirect
  window.location.href = '/api/auth/github';
};

export const logout = async (): Promise<void> => {
  // Mock logout
  localStorage.removeItem('auth_token');
  window.location.href = '/login';
};

export const getCurrentUser = async () => {
  // Mock user data
  const token = localStorage.getItem('auth_token');
  if (!token) return null;
  
  return {
    id: '1',
    username: 'johndoe',
    avatar_url: 'https://github.com/johndoe.png',
    email: 'john@example.com'
  };
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

// Mock login for demo
export const mockLogin = (): void => {
  localStorage.setItem('auth_token', 'mock-token-123');
};
