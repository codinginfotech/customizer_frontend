/** Fonts loaded in index.html (Google Fonts) + safe system stacks. */
export const FONT_FAMILIES = [
  'Inter',
  'Roboto',
  'Montserrat',
  'Oswald',
  'Bebas Neue',
  'Playfair Display',
  'Pacifico',
  'Lobster',
  'Georgia',
  'Courier New',
  'Arial',
  'Verdana',
] as const;

export const FONT_WEIGHTS = [
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semibold' },
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extra bold' },
] as const;

export const TEXT_COLORS = [
  '#111111', '#ffffff', '#6b7280', '#ef4444', '#f97316', '#f59e0b',
  '#22c55e', '#10b981', '#06b6d4', '#2563eb', '#7c3aed', '#db2777',
  '#78350f', '#1e3a5f', '#c8a24a',
];
