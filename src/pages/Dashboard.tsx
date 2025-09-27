import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchRepos, connectRepo } from '../api/repos';
import type { Repository } from '../types';
import Layout from '../components/layout/Layout';
import RepoCard from '../components/repo/RepoCard';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Dashboard() {
  const navigate = useNavigate();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    loadRepos();
  }, []);

  const loadRepos = async () => {
    try {
      setLoading(true);
      const reposData = await fetchRepos();
      setRepos(reposData);
    } catch (error) {
      console.error('Failed to load repos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectRepo = async () => {
    if (!repoUrl.trim()) return;

    try {
      setConnecting(true);
      const newRepo = await connectRepo(repoUrl);
      setRepos(prev => [...prev, newRepo]);
      setShowAddModal(false);
      setRepoUrl('');
    } catch (error) {
      console.error('Failed to connect repo:', error);
    } finally {
      setConnecting(false);
    }
  };

  const handleRepoClick = (repo: Repository) => {
    navigate(`/repo/${repo.id}`);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your connected repositories and AI insights
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={loadRepos}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Connect Repository
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : repos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No repositories connected
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Connect your first repository to start getting AI-powered insights about your codebase.
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              Connect Your First Repository
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RepoCard repo={repo} onClick={() => handleRepoClick(repo)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Connect Repository"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Enter the GitHub URL of the repository you'd like to connect.
          </p>
          <Input
            label="Repository URL"
            placeholder="https://github.com/username/repository"
            value={repoUrl}
            onChange={setRepoUrl}
          />
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConnectRepo}
              loading={connecting}
              disabled={!repoUrl.trim()}
              className="flex-1"
            >
              Connect
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
