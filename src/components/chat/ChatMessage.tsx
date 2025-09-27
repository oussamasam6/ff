import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 p-4 ${isUser ? 'bg-blue-50' : 'bg-white'}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-600' : 'bg-gray-600'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-900">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className="text-xs text-gray-500 ml-2">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none">
          {isUser ? (
            <p className="text-gray-900">{message.content}</p>
          ) : (
            <ReactMarkdown
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Sources:</h4>
            <div className="space-y-1">
              {message.sources.map((source, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <a
                    href={source.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-mono"
                  >
                    {source.path}
                  </a>
                  <span className="text-gray-500">
                    (lines {source.lines})
                  </span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
