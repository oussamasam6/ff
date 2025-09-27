import React, { useState, useEffect } from 'react';
import { File, Folder, ExternalLink, Search } from 'lucide-react';
import { fetchRepoFiles } from '../../api/repos';
import type { FileItem } from '../../types';
import Input from '../ui/Input';
import LoadingSpinner from '../ui/LoadingSpinner';

interface FileListProps {
  repoId: string;
}

export default function FileList({ repoId }: FileListProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadFiles();
  }, [repoId]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredFiles(
        files.filter(file =>
          file.path.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredFiles(files);
    }
  }, [files, searchTerm]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const filesData = await fetchRepoFiles(repoId);
      setFiles(filesData);
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Files</h3>
        <Input
          placeholder="Search files..."
          value={searchTerm}
          onChange={setSearchTerm}
          className="w-full"
        />
      </div>
      
      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {filteredFiles.length === 0 ? (
          <div className="p-8 text-center">
            <Search className="w-8 h-8 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm ? 'No files match your search' : 'No files found'}
            </p>
          </div>
        ) : (
          filteredFiles.map((file) => (
            <div
              key={file.path}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {file.type === 'directory' ? (
                  <Folder className="w-4 h-4 text-blue-500" />
                ) : (
                  <File className="w-4 h-4 text-gray-500" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.path}
                </p>
                {file.size && (
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                )}
              </div>
              
              <a
                href={file.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
