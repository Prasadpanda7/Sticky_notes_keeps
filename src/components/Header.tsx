import React from 'react';
import { StickyNote, Moon, Sun, Trash2 } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onShowTrash: () => void;
  deletedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchTerm, 
  onSearchChange, 
  theme, 
  onToggleTheme,
  onShowTrash,
  deletedCount
}) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <StickyNote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Keep Notes</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
            
            <div className="flex items-center gap-2">
              <button
                onClick={onShowTrash}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
                title="Trash"
              >
                <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {deletedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {deletedCount > 99 ? '99+' : deletedCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={onToggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};