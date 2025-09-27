import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, MessageSquare, ExternalLink } from 'lucide-react';
import { fetchRepos, generateOnboarding } from '../api/repos';
import type { Repository as RepositoryType } from '../types';
import Layout from '../components/layout/Layout';
import ChatInterface from '../components/chat/ChatInterface';
import FileList from '../components/repo/FileList';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

export default function Repository() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [repo, setRepo] = useState<RepositoryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'files'>('chat');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingContent, setOnboardingContent] = useState('');
  const [generatingOnboarding, setGeneratingOnboarding] = useState(false);

  useEffect(() => {
    loadRepo();
  }, [id]);

  const loadRepo = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const repos = await fetchRepos();
      const foundRepo = repos.find(r => r.id === id);
      setRepo(foundRepo || null);
    } catch (error) {
      console.error('Failed to load repo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateOnboarding = async () => {
    if (!id) return;

    try {
      setGeneratingOnboarding(true);
      const content = await generateOnboarding(id);
      setOnboardingContent(content);
      setShowOnboarding(true);
    } catch (error) {
      console.error('Failed to generate onboarding:', error);
    } finally {
      setGeneratingOnboarding(false);
    }
  };

  const getStatusVariant = (status: RepositoryType['status']) => {
    switch (status) {
      case 'indexed': return 'success';
      case 'indexing': return 'warning';
      case 'connected': return 'info';
      case 'error': return 'error';
      default: return 'neutral';
    }
  };

  const getStatusText = (status: RepositoryType['status']) => {
    switch (status) {
      case 'indexed': return 'Indexed';
      case 'indexing': return 'Indexing...';
      case 'connected': return 'Connected';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (!repo) {
    return (
      <Layout>
        <div className="p-8">
          <div className="text-center py-16">
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Repository not found
            </h2>
            <p className="text-gray-600 mb-6">
              The repository you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-gray-900">
                  {repo.name}
                </h1>
                <Badge variant={getStatusVariant(repo.status)}>
                  {getStatusText(repo.status)}
                </Badge>
                <a
                  href={repo.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-gray-600 mt-1">
                {repo.description || 'No description available'}
              </p>
            </div>
            <Button
              onClick={handleGenerateOnboarding}
              loading={generatingOnboarding}
              disabled={repo.status !== 'indexed'}
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Onboarding
            </Button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'files'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              Files
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          {repo.status !== 'indexed' ? (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {repo.status === 'indexing' ? (
                  <LoadingSpinner size="lg" />
                ) : (
                  <FileText className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {repo.status === 'indexing' ? 'Indexing in progress...' : 'Repository not indexed'}
              </h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                {repo.status === 'indexing'
                  ? 'We\'re analyzing your repository. This usually takes a few minutes.'
                  : 'This repository needs to be indexed before you can chat with it.'}
              </p>
            </Card>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full"
            >
              {activeTab === 'chat' ? (
                <ChatInterface repoId={repo.id} />
              ) : (
                <FileList repoId={repo.id} />
              )}
            </motion.div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        title="Repository Onboarding Guide"
        size="xl"
      >
        <div className="prose prose-sm max-w-none max-h-96 overflow-y-auto">
          <ReactMarkdown>{onboardingContent}</ReactMarkdown>
        </div>
      </Modal>
    </Layout>
  );
}
