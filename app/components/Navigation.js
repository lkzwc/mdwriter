'use client'
import { useState } from 'react';
import { Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function NavLink({ href, children }) {
  return (
    <a 
      href={href} 
      className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 transition-colors"
    >
      {children}
    </a>
  );
}

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: '写作', href: '/editor' },
    { label: '配置', href: '/config' },
    { label: '操作说明', href: '/guide' },
    { label: '招教备考', href: '/study' },
  ];

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              MDWriter
            </a>
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <NavLink key={index} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="https://github.com/your-username/mdwriter" target="_blank" rel="noopener noreferrer" 
              className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a href="/login" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg">
              登录
            </a>
          </div>
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="container mx-auto py-4 space-y-4">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 dark:text-gray-300 dark:hover:text-violet-400 dark:hover:bg-gray-800"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <a href="/login" className="block w-full py-2 text-center bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full text-sm font-medium">
                  登录
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 