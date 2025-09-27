import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code2 } from 'lucide-react';
import { mockLogin } from '../api/auth';
import Button from '../components/ui/Button';

export default function Login() {
  const handleLogin = () => {
    // For demo purposes, use mock login
    mockLogin();
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Codebase Concierge</h1>
          </div>
          <p className="text-gray-600">
            AI-powered insights for your repositories
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Sign in to get started
            </h2>
            <p className="text-sm text-gray-600">
              Connect your GitHub account to analyze your repositories
            </p>
          </div>
          
          <Button
            onClick={handleLogin}
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-3"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Features</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div>🤖 AI-powered code analysis</div>
              <div>📚 Automatic onboarding guides</div>
              <div>🔍 Natural language queries</div>
              <div>🔗 GitHub integration</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
