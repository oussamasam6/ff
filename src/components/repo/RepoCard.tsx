import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Clock, FileText, ExternalLink } from 'lucide-react';
import type { Repository } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface RepoCardProps {
  repo: Repository;
  onClick: () => void;
}

export default function RepoCard({ repo, onClick }: RepoCardProps) {
  const getStatusVariant = (status: Repository['status']) => {
    switch (status) {
      case 'indexed': return 'success';
      case 'indexing': return 'warning';
      case 'connected': return 'info';
      case 'error': return 'error';
      default: return 'neutral';
    }
  };

  const getStatusText = (status: Repository['status']) => {
    switch (status) {
      case 'indexed': return 'Indexed';
      case 'indexing': return 'Indexing...';
      case 'connected': return 'Connected';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  return (
    <Card hover onClick={onClick}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">{repo.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant(repo.status)}>
              {getStatusText(repo.status)}
            </Badge>
            <a
              href={repo.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          {repo.description || 'No description available'}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {repo.file_count && (
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {repo.file_count} files
            </div>
          )}
          {repo.last_indexed && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Last indexed {new Date(repo.last_indexed).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
