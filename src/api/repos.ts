import type { Repository, FileItem, QueryResponse } from '../types';

export const fetchRepos = async (): Promise<Repository[]> => {
  // Mock repository data
  return [
    {
      id: '1',
      name: 'next.js',
      full_name: 'vercel/next.js',
      description: 'The React Framework for Production',
      status: 'indexed',
      last_indexed: '2025-01-27T10:00:00Z',
      file_count: 1247,
      github_url: 'https://github.com/vercel/next.js'
    },
    {
      id: '2',
      name: 'react-starter',
      full_name: 'johndoe/react-starter',
      description: 'My React starter template',
      status: 'indexing',
      file_count: 45,
      github_url: 'https://github.com/johndoe/react-starter'
    },
    {
      id: '3',
      name: 'api-server',
      full_name: 'johndoe/api-server',
      description: 'Express.js API server',
      status: 'connected',
      github_url: 'https://github.com/johndoe/api-server'
    }
  ];
};

export const fetchRepoFiles = async (repoId: string): Promise<FileItem[]> => {
  // Mock file data
  return [
    {
      path: 'src/App.tsx',
      type: 'file',
      size: 2340,
      github_url: 'https://github.com/vercel/next.js/blob/main/src/App.tsx'
    },
    {
      path: 'src/components',
      type: 'directory',
      github_url: 'https://github.com/vercel/next.js/tree/main/src/components'
    },
    {
      path: 'src/components/Button.tsx',
      type: 'file',
      size: 1250,
      github_url: 'https://github.com/vercel/next.js/blob/main/src/components/Button.tsx'
    },
    {
      path: 'src/utils/auth.ts',
      type: 'file',
      size: 3400,
      github_url: 'https://github.com/vercel/next.js/blob/main/src/utils/auth.ts'
    },
    {
      path: 'package.json',
      type: 'file',
      size: 2100,
      github_url: 'https://github.com/vercel/next.js/blob/main/package.json'
    },
    {
      path: 'README.md',
      type: 'file',
      size: 5600,
      github_url: 'https://github.com/vercel/next.js/blob/main/README.md'
    }
  ];
};

export const sendQuery = async (repoId: string, prompt: string): Promise<QueryResponse> => {
  // Mock AI response with delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    answer: `Based on your question "${prompt}", here's what I found in the codebase:

The authentication system uses JWT tokens for session management. The main auth flow is handled in the \`auth.ts\` utility file, which exports functions for login, logout, and token validation.

Key components:
- **Login Component**: Handles user authentication with GitHub OAuth
- **Auth Context**: Provides authentication state throughout the app
- **Protected Routes**: Ensures authenticated access to sensitive pages

The implementation follows React best practices with TypeScript for type safety.`,
    sources: [
      {
        path: 'src/utils/auth.ts',
        lines: '12-45',
        github_url: 'https://github.com/vercel/next.js/blob/main/src/utils/auth.ts#L12-L45'
      },
      {
        path: 'src/components/Login.tsx',
        lines: '8-32',
        github_url: 'https://github.com/vercel/next.js/blob/main/src/components/Login.tsx#L8-L32'
      },
      {
        path: 'src/contexts/AuthContext.tsx',
        lines: '15-28',
        github_url: 'https://github.com/vercel/next.js/blob/main/src/contexts/AuthContext.tsx#L15-L28'
      }
    ]
  };
};

export const generateOnboarding = async (repoId: string): Promise<string> => {
  // Mock onboarding generation with delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return `# 🚀 Next.js Project Onboarding Guide

## Architecture Overview
This is a modern Next.js application built with TypeScript and Tailwind CSS. The project follows a component-based architecture with clear separation of concerns.

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup Steps
1. \`\`\`bash
   git clone https://github.com/vercel/next.js.git
   cd next.js
   \`\`\`

2. \`\`\`bash
   npm install
   \`\`\`

3. \`\`\`bash
   npm run dev
   \`\`\`

### Run Tests
\`\`\`bash
npm test
\`\`\`

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔑 Key Files to Explore

1. **\`src/App.tsx\`** - Main application component and routing setup
2. **\`src/components/\`** - Reusable UI components library  
3. **\`src/utils/auth.ts\`** - Authentication utilities and session management
4. **\`package.json\`** - Project dependencies and scripts
5. **\`next.config.js\`** - Next.js configuration and build settings

## 📁 Project Structure
- \`/src\` - Source code
- \`/components\` - React components
- \`/pages\` - Next.js pages/routes
- \`/utils\` - Utility functions
- \`/styles\` - CSS and styling

## 🛠️ Tech Stack
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier`;
};

export const connectRepo = async (repoUrl: string): Promise<Repository> => {
  // Mock repo connection
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const repoName = repoUrl.split('/').pop() || 'unknown';
  return {
    id: Date.now().toString(),
    name: repoName,
    full_name: repoUrl.replace('https://github.com/', ''),
    description: 'Newly connected repository',
    status: 'connected',
    github_url: repoUrl
  };
};
