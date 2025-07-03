import React, { useState } from 'react';
import { StickyNote } from 'lucide-react';
import { useNotes } from './hooks/useNotes';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { CreateNote } from './components/CreateNote';
import { NotesGrid } from './components/NotesGrid';
import { TrashModal } from './components/TrashModal';
import { StickyNotesOverlay } from './components/StickyNotesOverlay';

function App() {
  const {
    pinnedNotes,
    unpinnedNotes,
    deletedNotes,
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
  } = useNotes();

  const { theme, toggleTheme } = useTheme();
  const [showTrash, setShowTrash] = useState(false);
  const [trashSearchTerm, setTrashSearchTerm] = useState('');

  const hasNotes = pinnedNotes.length > 0 || unpinnedNotes.length > 0;

  const filteredDeletedNotes = deletedNotes.filter(note => 
    note.title.toLowerCase().includes(trashSearchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(trashSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        theme={theme}
        onToggleTheme={toggleTheme}
        onShowTrash={() => setShowTrash(true)}
        deletedCount={deletedNotes.length}
      />
      
      <main className="py-8">
        <CreateNote onCreateNote={createNote} />
        
        {hasNotes ? (
          <div className="space-y-12">
            <NotesGrid
              notes={pinnedNotes}
              title="Pinned"
              onUpdateNote={updateNote}
              onDeleteNote={deleteNote}
              onTogglePin={togglePin}
              onToggleSticky={toggleSticky}
            />
            
            <NotesGrid
              notes={unpinnedNotes}
              title="Others"
              onUpdateNote={updateNote}
              onDeleteNote={deleteNote}
              onTogglePin={togglePin}
              onToggleSticky={toggleSticky}
            />
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <StickyNote className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">No notes yet</p>
              <p className="text-sm">Create your first note to get started</p>
            </div>
          </div>
        )}
      </main>

      <TrashModal
        isOpen={showTrash}
        onClose={() => {
          setShowTrash(false);
          setTrashSearchTerm('');
        }}
        deletedNotes={filteredDeletedNotes}
        onRestoreNote={restoreNote}
        onPermanentDeleteNote={permanentlyDeleteNote}
        onEmptyTrash={() => {
          emptyTrash();
          setShowTrash(false);
          setTrashSearchTerm('');
        }}
        searchTerm={trashSearchTerm}
        onSearchChange={setTrashSearchTerm}
      />

      <StickyNotesOverlay
        stickyNotes={stickyNotes}
        onUpdateNote={updateNote}
        onToggleSticky={toggleSticky}
        onUpdateStickyPosition={updateStickyPosition}
      />
    </div>
  );
}

export default App;