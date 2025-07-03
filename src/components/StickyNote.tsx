import React, { useState, useRef, useEffect } from 'react';
import { X, Pin, Minimize2, Maximize2 } from 'lucide-react';
import { Note, NoteColor } from '../types/note';
import { getColorClasses } from '../utils/colors';

interface StickyNoteProps {
  note: Note;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onClose: () => void;
  onUpdatePosition: (id: string, position: { x: number; y: number }) => void;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  note,
  onUpdate,
  onClose,
  onUpdatePosition
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(
    note.stickyPosition || { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 }
  );

  const noteRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const colorClasses = getColorClasses(note.color as NoteColor);

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        };
        setPosition(newPosition);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onUpdatePosition(note.id, position);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, position, note.id, onUpdatePosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('drag-handle')) {
      const rect = noteRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        setIsDragging(true);
      }
    }
  };

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onUpdate(note.id, { title: title.trim(), content: content.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setTitle(note.title);
      setContent(note.content);
      setIsEditing(false);
    }
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  return (
    <div
      ref={noteRef}
      className={`fixed z-50 w-80 rounded-lg border-2 shadow-2xl transition-all duration-200 ${
        colorClasses.bg
      } ${colorClasses.border} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${
        isMinimized ? 'h-12' : 'min-h-32'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        userSelect: isDragging ? 'none' : 'auto'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="drag-handle flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600 bg-opacity-90 backdrop-blur-sm rounded-t-lg">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Pin className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
            {note.title || 'Sticky Note'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200"
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? (
              <Maximize2 className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            ) : (
              <Minimize2 className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors duration-200"
            title="Close sticky note"
          >
            <X className="w-3 h-3 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="p-4" onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <div className="space-y-3">
              <input
                ref={titleRef}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-lg font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Title..."
              />
              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  adjustTextareaHeight(e.target);
                }}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none overflow-y-auto"
                placeholder="Take a note..."
                rows={3}
              />
            </div>
          ) : (
            <div
              className="cursor-text"
              onClick={() => setIsEditing(true)}
            >
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                {note.title || 'Untitled'}
              </h3>
              <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                {note.content || 'Empty note'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};