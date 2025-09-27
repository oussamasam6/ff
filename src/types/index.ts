export interface User {
  id: string;
  username: string;
  avatar_url: string;
  email?: string;
}

export interface Repository {
  id: string;
  name: string;
  full_name: string;
  description?: string;
  status: 'connected' | 'indexing' | 'indexed' | 'error';
  last_indexed?: string;
  file_count?: number;
  github_url: string;
}

export interface FileItem {
  path: string;
  type: 'file' | 'directory';
  size?: number;
  github_url: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: Source[];
}

export interface Source {
  path: string;
  lines: string;
  github_url: string;
}

export interface QueryResponse {
  answer: string;
  sources: Source[];
}

export interface BillingTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  limits: {
    repos: number;
    queries: number;
  };
}
