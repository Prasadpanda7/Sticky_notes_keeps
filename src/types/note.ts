export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  deletedAt?: Date;
  isSticky?: boolean;
  stickyPosition?: { x: number; y: number };
}

export type NoteColor = 
  | 'default'
  | 'yellow' 
  | 'orange'
  | 'pink'
  | 'purple'
  | 'blue'
  | 'teal'
  | 'green'
  | 'red';