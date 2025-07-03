import { NoteColor } from '../types/note';

export const noteColors: Record<NoteColor, { bg: string; border: string; hover: string }> = {
  default: {
    bg: 'bg-white dark:bg-gray-800',
    border: 'border-gray-200 dark:border-gray-600',
    hover: 'hover:bg-gray-50 dark:hover:bg-gray-700'
  },
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    border: 'border-yellow-200 dark:border-yellow-700',
    hover: 'hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    border: 'border-orange-200 dark:border-orange-700',
    hover: 'hover:bg-orange-200 dark:hover:bg-orange-900/50'
  },
  pink: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    border: 'border-pink-200 dark:border-pink-700',
    hover: 'hover:bg-pink-200 dark:hover:bg-pink-900/50'
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    border: 'border-purple-200 dark:border-purple-700',
    hover: 'hover:bg-purple-200 dark:hover:bg-purple-900/50'
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-700',
    hover: 'hover:bg-blue-200 dark:hover:bg-blue-900/50'
  },
  teal: {
    bg: 'bg-teal-100 dark:bg-teal-900/30',
    border: 'border-teal-200 dark:border-teal-700',
    hover: 'hover:bg-teal-200 dark:hover:bg-teal-900/50'
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-200 dark:border-green-700',
    hover: 'hover:bg-green-200 dark:hover:bg-green-900/50'
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    border: 'border-red-200 dark:border-red-700',
    hover: 'hover:bg-red-200 dark:hover:bg-red-900/50'
  }
};

export const getColorClasses = (color: NoteColor) => {
  return noteColors[color] || noteColors.default;
};