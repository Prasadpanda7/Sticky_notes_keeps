import React from 'react';
import { Note } from '../types/note';
import { NoteCard } from './NoteCard';

interface NotesGridProps {
  notes: Note[];
  title: string;
  onUpdateNote?: (id: string, updates: Partial<Note>) => void;
  onDeleteNote?: (id: string) => void;
  onTogglePin?: (id: string) => void;
  onRestoreNote?: (id: string) => void;
  onPermanentDeleteNote?: (id: string) => void;
  onToggleSticky?: (id: string) => void;
  isTrash?: boolean;
}

export const NotesGrid: React.FC<NotesGridProps> = ({
  notes,
  title,
  onUpdateNote,
  onDeleteNote,
  onTogglePin,
  onRestoreNote,
  onPermanentDeleteNote,
  onToggleSticky,
  isTrash = false
}) => {
  if (notes.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
        {title}
      </h2>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 px-2">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onUpdate={onUpdateNote}
            onDelete={onDeleteNote}
            onTogglePin={onTogglePin}
            onRestore={onRestoreNote}
            onPermanentDelete={onPermanentDeleteNote}
            onToggleSticky={onToggleSticky}
            isInTrash={isTrash}
          />
        ))}
      </div>
    </div>
  );
};