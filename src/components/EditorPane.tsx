import { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { EditorSettings } from '../types';
import { editorThemes } from '../utils/themes';

interface EditorPaneProps {
  value: string;
  onChange: (value: string) => void;
  settings: EditorSettings;
  onScroll?: (scrollTop: number, scrollHeight: number) => void;
}

export function EditorPane({ value, onChange, settings, onScroll }: EditorPaneProps) {
  const editorRef = useRef<any>(null);

  const currentTheme = editorThemes.find(t => t.id === settings.theme);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Add scroll listener
    if (onScroll) {
      editor.onDidScrollChange((e: any) => {
        onScroll(e.scrollTop, e.scrollHeight);
      });
    }

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save functionality (already handled by auto-save)
    });
  };

  // Sync scroll position
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      editor.updateOptions({
        fontSize: settings.fontSize,
        wordWrap: settings.wordWrap ? 'on' : 'off',
        minimap: { enabled: settings.minimap },
        lineNumbers: settings.lineNumbers ? 'on' : 'off',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 20, bottom: 20 },
        fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
        fontLigatures: true,
        cursorBlinking: 'smooth',
        smoothScrolling: true,
        renderWhitespace: 'selection',
        bracketPairColorization: { enabled: true },
      });
    }
  }, [settings]);

  return (
    <div className="h-full backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border transition-all duration-500 hover:shadow-3xl bg-white/95 dark:bg-gray-900/95 border-purple-200/30 dark:border-purple-500/20">
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10 px-4 sm:px-6 py-3 sm:py-4 border-b border-emerald-200/30 dark:border-emerald-500/20">
        <h3 className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2 sm:gap-3">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg animate-pulse"></div>
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Editor
          </span>
        </h3>
      </div>
      <div className="h-[calc(100%-48px)] sm:h-[calc(100%-60px)]">
        <Editor
          height="100%"
          defaultLanguage="markdown"
          value={value}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          theme={currentTheme?.monacoTheme || 'vs-dark'}
          options={{
            fontSize: settings.fontSize,
            wordWrap: settings.wordWrap ? 'on' : 'off',
            minimap: { enabled: settings.minimap },
            lineNumbers: settings.lineNumbers ? 'on' : 'off',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 20, bottom: 20 },
            fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
            fontLigatures: true,
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            suggest: {
              showKeywords: true,
              showSnippets: true,
            },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>
    </div>
  );
}