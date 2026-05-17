'use client';

import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { logout } from '@/lib/api';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <nav className="bg-white/70 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-slate-200/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-indigo-600 drop-shadow-sm" />
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-violet-600 bg-clip-text text-transparent tracking-tight">
              ServiceBoard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Jobs
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  href="/new"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  + Post Job
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-rose-500 hover:text-rose-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-indigo-200 hover:bg-indigo-50"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

