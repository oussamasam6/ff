import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Github, Key, Bell, Shield } from 'lucide-react';
import { getCurrentUser } from '../api/auth';
import type { User as UserType } from '../types';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Settings() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    slack: false
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Mock save
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
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

  if (!user) {
    return (
      <Layout>
        <div className="p-8">
          <div className="text-center py-16">
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Unable to load user settings
            </h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-medium text-gray-900">Profile</h2>
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{user.username}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Username"
                  value={user.username}
                  onChange={() => {}}
                  disabled
                />
                <Input
                  label="Email"
                  value={user.email || ''}
                  onChange={() => {}}
                  disabled
                />
              </div>
            </Card>
          </motion.div>

          {/* GitHub Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Github className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-medium text-gray-900">GitHub Integration</h2>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-green-900">Connected</p>
                    <p className="text-sm text-green-700">GitHub account linked successfully</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Reconnect
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* API Keys */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Key className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-medium text-gray-900">API Keys</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Access Token
                  </label>
                  <div className="flex gap-3">
                    <Input
                      value="••••••••••••••••"
                      onChange={() => {}}
                      disabled
                      className="flex-1"
                    />
                    <Button variant="outline">
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Used for API access and integrations
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {key} notifications
                      </p>
                      <p className="text-sm text-gray-600">
                        Receive notifications via {key}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotifications(prev => ({
                            ...prev,
                            [key]: e.target.checked
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-medium text-gray-900">Security</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Two-factor authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Active sessions</p>
                    <p className="text-sm text-gray-600">Manage your active sessions</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSave}
              loading={saving}
              size="lg"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
