import { EditorTheme } from '../types';

export const editorThemes: EditorTheme[] = [
  {
    id: 'light',
    name: 'Light',
    monacoTheme: 'light',
    className: 'theme-light',
  },
  {
    id: 'dark',
    name: 'Dark',
    monacoTheme: 'vs-dark',
    className: 'theme-dark',
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    monacoTheme: 'hc-black',
    className: 'theme-high-contrast',
  },
];

export const getSystemTheme = (): string => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};