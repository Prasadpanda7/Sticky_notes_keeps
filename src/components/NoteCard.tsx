import React, { useState, useRef, useEffect } from 'react';
import { Pin, Trash2, Palette, RotateCcw, X, Monitor } from 'lucide-react';
import { Note, NoteColor } from '../types/note';
import { getColorClasses } from '../utils/colors';
import { ColorPicker } from './ColorPicker';

interface NoteCardProps {
  note: Note;
  onUpdate?: (id: string, updates: Partial<Note>) => void;
  onDelete?: (id: string) => void;
  onTogglePin?: (id: string) => void;
  onRestore?: (id: string) => void;
  onPermanentDelete?: (id: string) => void;
  onToggleSticky?: (id: string) => void;
  isInTrash?: boolean;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onUpdate,
  onDelete,
  onTogglePin,
  onRestore,
  onPermanentDelete,
  onToggleSticky,
  isInTrash = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const colorClasses = getColorClasses(note.color as NoteColor);

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onUpdate?.(note.id, { title: title.trim(), content: content.trim() });
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

  const handleColorChange = (color: NoteColor) => {
    onUpdate?.(note.id, { color });
    setShowColorPicker(false);
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div
      className={`relative rounded-lg border-2 transition-all duration-200 break-inside-avoid mb-4 group ${
        colorClasses.bg
      } ${colorClasses.border} ${colorClasses.hover} ${
        isEditing ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''
      } ${isInTrash ? 'opacity-75' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowColorPicker(false);
      }}
    >
      {/* Pin indicator */}
      {note.isPinned && !isInTrash && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center">
          <Pin className="w-2 h-2 text-white" />
        </div>
      )}

      {/* Sticky indicator */}
      {note.isSticky && !isInTrash && (
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center">
          <Monitor className="w-2 h-2 text-white" />
        </div>
      )}

      <div className="p-4">
        {/* Title */}
        {isEditing && !isInTrash ? (
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-lg font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            placeholder="Title..."
          />
        ) : (
          <h3
            className={`text-lg font-medium text-gray-800 dark:text-gray-100 mb-2 ${
              !isInTrash ? 'cursor-text' : ''
            }`}
            onClick={() => !isInTrash && setIsEditing(true)}
          >
            {note.title || 'Untitled'}
          </h3>
        )}

        {/* Content */}
        {isEditing && !isInTrash ? (
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              adjustTextareaHeight(e.target);
            }}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none overflow-hidden"
            placeholder="Take a note..."
            rows={1}
          />
        ) : (
          <p
            className={`text-gray-700 dark:text-gray-200 whitespace-pre-wrap ${
              !isInTrash ? 'cursor-text' : ''
            }`}
            onClick={() => !isInTrash && setIsEditing(true)}
          >
            {note.content || 'Empty note'}
          </p>
        )}

        {/* Deleted date for trash items */}
        {isInTrash && note.deletedAt && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Deleted {formatDate(note.deletedAt)}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div
        className={`absolute bottom-2 right-2 flex items-center gap-1 transition-opacity duration-200 ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {isInTrash ? (
          <>
            <button
              onClick={() => onRestore?.(note.id)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              title="Restore note"
            >
              <RotateCcw className="w-4 h-4 text-green-600 dark:text-green-400" />
            </button>
            <button
              onClick={() => onPermanentDelete?.(note.id)}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors duration-200"
              title="Delete permanently"
            >
              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              title="Change color"
            >
              <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => onToggleSticky?.(note.id)}
              className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 ${
                note.isSticky ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
              }`}
              title={note.isSticky ? 'Remove from desktop' : 'Stick to desktop'}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => onTogglePin?.(note.id)}
              className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 ${
                note.isPinned ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
              }`}
              title={note.isPinned ? 'Unpin note' : 'Pin note'}
            >
              <Pin className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete?.(note.id)}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors duration-200"
              title="Delete note"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </>
        )}
      </div>

      {/* Color picker */}
      {!isInTrash && (
        <ColorPicker
          currentColor={note.color as NoteColor}
          onColorChange={handleColorChange}
          isVisible={showColorPicker}
        />
      )}
    </div>
  );
};