export interface EditorTheme {
  id: string;
  name: string;
  monacoTheme: string;
  className: string;
}

export interface EditorSettings {
  theme: string;
  fontSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
}

export interface FileInfo {
  name: string;
  content: string;
  lastModified: Date;
}

export interface CheatSheetItem {
  title: string;
  syntax: string;
  example: string;
}