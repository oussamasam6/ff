import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, CreditCard, Settings, LogOut, Code2 } from 'lucide-react';
import { logout } from '../../api/auth';
import Button from '../ui/Button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white">
      <div className="flex items-center gap-2 p-6 border-b border-gray-700">
        <Code2 className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-lg font-semibold">Codebase</h1>
          <p className="text-sm text-gray-400">Concierge</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
