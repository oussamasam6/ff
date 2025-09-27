import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { sendQuery } from '../../api/repos';
import type { ChatMessage as ChatMessageType } from '../../types';
import ChatMessage from './ChatMessage';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ChatInterfaceProps {
  repoId: string;
}

export default function ChatInterface({ repoId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendQuery(repoId, input);
      
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.answer,
        timestamp: new Date().toISOString(),
        sources: response.sources
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error while processing your question. Please try again.',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Ask about this codebase</h3>
        <p className="text-sm text-gray-600">
          Ask questions about architecture, implementation, or how to get started
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Start a conversation
              </h4>
              <p className="text-gray-600 max-w-sm">
                Ask me anything about this codebase. I can help you understand the architecture, 
                find specific functionality, or explain how to get started.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && (
              <div className="flex gap-4 p-4">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 mb-2">AI Assistant</div>
                  <div className="text-gray-600">Thinking...</div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Ask about this codebase..."
              value={input}
              onChange={setInput}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            loading={loading}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
