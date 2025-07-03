import { useState, useEffect } from 'react';
import { Note, NoteColor } from '../types/note';

const STORAGE_KEY = 'sticky-notes';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load notes from localStorage on mount
  useEffect(() => {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    if (storedNotes) {
      try {
        const parsed = JSON.parse(storedNotes);
        const notesWithDates = parsed.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
          deletedAt: note.deletedAt ? new Date(note.deletedAt) : undefined
        }));
        setNotes(notesWithDates);
      } catch (error) {
        console.error('Error parsing stored notes:', error);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const createNote = (title: string = '', content: string = '', color: NoteColor = 'default') => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      color,
      isPinned: false,
      isDeleted: false,
      isSticky: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, isDeleted: true, deletedAt: new Date(), isPinned: false, isSticky: false }
        : note
    ));
  };

  const restoreNote = (id: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, isDeleted: false, deletedAt: undefined, updatedAt: new Date() }
        : note
    ));
  };

  const permanentlyDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const emptyTrash = () => {
    setNotes(prev => prev.filter(note => !note.isDeleted));
  };

  const togglePin = (id: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, isPinned: !note.isPinned, updatedAt: new Date() }
        : note
    ));
  };

  const toggleSticky = (id: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, isSticky: !note.isSticky, updatedAt: new Date() }
        : note
    ));
  };

  const updateStickyPosition = (id: string, position: { x: number; y: number }) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, stickyPosition: position, updatedAt: new Date() }
        : note
    ));
  };

  const activeNotes = notes.filter(note => !note.isDeleted);
  const deletedNotes = notes.filter(note => note.isDeleted);
  const stickyNotes = notes.filter(note => note.isSticky && !note.isDeleted);

  const filteredNotes = activeNotes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeletedNotes = deletedNotes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  return {
    notes: filteredNotes,
    pinnedNotes,
    unpinnedNotes,
    deletedNotes: filteredDeletedNotes,
    stickyNotes,
    searchTerm,
    setSearchTerm,
    createNote,
    updateNote,
    deleteNote,
    restoreNote,
    permanentlyDeleteNote,
    emptyTrash,
    togglePin,
    toggleSticky,
    updateStickyPosition
  };
};