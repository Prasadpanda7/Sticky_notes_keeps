import React from 'react';
import { X, Trash2, RotateCcw } from 'lucide-react';
import { Note } from '../types/note';
import { NotesGrid } from './NotesGrid';

interface TrashModalProps {
  isOpen: boolean;
  onClose: () => void;
  deletedNotes: Note[];
  onRestoreNote: (id: string) => void;
  onPermanentDeleteNote: (id: string) => void;
  onEmptyTrash: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const TrashModal: React.FC<TrashModalProps> = ({
  isOpen,
  onClose,
  deletedNotes,
  onRestoreNote,
  onPermanentDeleteNote,
  onEmptyTrash,
  searchTerm,
  onSearchChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Trash2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Trash ({deletedNotes.length})
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            {deletedNotes.length > 0 && (
              <button
                onClick={onEmptyTrash}
                className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Empty Trash
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Search */}
        {deletedNotes.length > 0 && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search deleted notes..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:outline-none transition-all duration-200 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {deletedNotes.length === 0 ? (
            <div className="text-center py-12">
              <Trash2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">Trash is empty</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Deleted notes will appear here
              </p>
            </div>
          ) : (
            <NotesGrid
              notes={deletedNotes}
              title="Deleted Notes"
              onRestoreNote={onRestoreNote}
              onPermanentDeleteNote={onPermanentDeleteNote}
              isTrash={true}
            />
          )}
        </div>

        {/* Footer */}
        {deletedNotes.length > 0 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Click to restore</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4" />
                  <span>Click to delete permanently</span>
                </div>
              </div>
              <p>Notes in trash are automatically deleted after 30 days</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};