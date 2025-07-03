import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { NoteColor } from '../types/note';

interface CreateNoteProps {
  onCreateNote: (title: string, content: string, color: NoteColor) => void;
}

export const CreateNote: React.FC<CreateNoteProps> = ({ onCreateNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (title.trim() || content.trim()) {
      onCreateNote(title.trim(), content.trim(), 'default');
      setTitle('');
      setContent('');
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setTitle('');
      setContent('');
      setIsExpanded(false);
    }
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-shadow duration-200">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full p-4 text-left text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 flex items-center gap-3"
          >
            <Plus className="w-5 h-5" />
            Take a note...
          </button>
        ) : (
          <div className="p-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-lg font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 mb-3"
              placeholder="Title"
            />
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                adjustTextareaHeight(e.target);
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none overflow-hidden min-h-[60px]"
              placeholder="Take a note..."
              rows={3}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setTitle('');
                  setContent('');
                  setIsExpanded(false);
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
              >
                Add Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};