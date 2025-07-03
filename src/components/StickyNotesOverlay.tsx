import React from 'react';
import { Note } from '../types/note';
import { StickyNote } from './StickyNote';

interface StickyNotesOverlayProps {
  stickyNotes: Note[];
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onToggleSticky: (id: string) => void;
  onUpdateStickyPosition: (id: string, position: { x: number; y: number }) => void;
}

export const StickyNotesOverlay: React.FC<StickyNotesOverlayProps> = ({
  stickyNotes,
  onUpdateNote,
  onToggleSticky,
  onUpdateStickyPosition
}) => {
  if (stickyNotes.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {stickyNotes.map((note) => (
        <div key={note.id} className="pointer-events-auto">
          <StickyNote
            note={note}
            onUpdate={onUpdateNote}
            onClose={() => onToggleSticky(note.id)}
            onUpdatePosition={onUpdateStickyPosition}
          />
        </div>
      ))}
    </div>
  );
};