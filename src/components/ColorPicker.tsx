import React from 'react';
import { NoteColor } from '../types/note';
import { getColorClasses } from '../utils/colors';

interface ColorPickerProps {
  currentColor: NoteColor;
  onColorChange: (color: NoteColor) => void;
  isVisible: boolean;
}

const colorOptions: NoteColor[] = [
  'default',
  'yellow',
  'orange',
  'pink',
  'purple',
  'blue',
  'teal',
  'green',
  'red'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  currentColor, 
  onColorChange, 
  isVisible 
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-12 left-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 p-2 z-50">
      <div className="grid grid-cols-3 gap-2">
        {colorOptions.map((color) => {
          const colorClasses = getColorClasses(color);
          return (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                colorClasses.bg
              } ${
                currentColor === color 
                  ? 'border-gray-800 dark:border-gray-200 ring-2 ring-blue-400 dark:ring-blue-500' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
              title={color}
            />
          );
        })}
      </div>
    </div>
  );
};