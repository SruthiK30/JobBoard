import React from 'react';

interface RoleSelectorProps {
  onSelectRole: (role: 'user' | 'admin') => void;
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col"
      style={{
        backgroundImage: 'url(/workspace-bg.jpg)',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">💼</div>
            <h1 className="text-xl font-bold text-gray-900">JobBoard</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Headline & Description */}
            <div className="text-white drop-shadow-lg">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Your Professional Job Board
              </h2>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed font-light">
                Discover amazing career opportunities or post and manage job listings with ease. Built for modern recruitment teams.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <p className="text-3xl font-bold text-white">12+</p>
                  <p className="text-gray-200 text-sm">Active Jobs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">100%</p>
                  <p className="text-gray-200 text-sm">Responsive</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">⚡</p>
                  <p className="text-gray-200 text-sm">Lightning Fast</p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Options */}
            <div className="space-y-4">
              {/* User Card */}
              <button
                onClick={() => onSelectRole('user')}
                className="w-full bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 group border border-white/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">👤</div>
                  <div className="text-gray-300 group-hover:translate-x-1 transition">→</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Browse Jobs</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore job opportunities that match your skills and interests. View detailed job descriptions.
                </p>
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold group-hover:bg-blue-200 transition">
                  Continue as User
                </div>
              </button>

              {/* Admin Card */}
              <button
                onClick={() => onSelectRole('admin')}
                className="w-full bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 text-left hover:shadow-2xl hover:bg-white transition-all duration-300 group border border-white/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">🔑</div>
                  <div className="text-gray-300 group-hover:translate-x-1 transition">→</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Manage Jobs</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Create new positions, edit existing job listings, and manage your job board with full control.
                </p>
                <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-600 rounded-lg text-sm font-semibold group-hover:bg-emerald-200 transition">
                  Continue as Admin
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2026 JobBoard. Crafted with precision.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
