import React, { useRef } from 'react';
import {
  Save,
  Download,
  Upload,
  FileText,
  Globe,
  BookOpen,
  Settings,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

interface ToolbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onSave: () => void;
  onExportMarkdown: () => void;
  onExportHtml: () => void;
  onImportFile: (content: string) => void;
  onShowCheatSheet: () => void;
  onShowSettings: () => void;
  onExportPdf: () => void;
  lastSaved: Date | null;
}

export function Toolbar({
  isDark,
  onToggleTheme,
  onExportMarkdown,
  onExportHtml,
  onImportFile,
  onShowCheatSheet,
  onShowSettings,
  onExportPdf,
  lastSaved,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onImportFile(content);
      };
      reader.readAsText(file);
    }
  };

  const formatLastSaved = (date: Date | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`backdrop-blur-xl border-b transition-all duration-500 p-3 sm:p-4 ${
      isDark 
        ? 'bg-gray-900/20 border-purple-500/20' 
        : 'bg-white/20 border-purple-200/30'
    }`}>
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-xl sm:rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
            <span className="font-bold text-sm sm:text-lg hidden sm:block bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              MarkdownPro
            </span>
          </div>
          
          {lastSaved && (
            <div className={`hidden md:flex items-center gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl backdrop-blur-sm transition-all duration-300 ${
              isDark 
                ? 'text-purple-200 bg-purple-900/30 border border-purple-500/20' 
                : 'text-purple-700 bg-purple-100/50 border border-purple-200/50'
            }`}>
              <Save className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Saved {formatLastSaved(lastSaved)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`flex items-center gap-1 rounded-xl sm:rounded-2xl p-1 backdrop-blur-sm transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800/50 border border-gray-700/50' 
              : 'bg-white/50 border border-gray-200/50'
          }`}>
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'hover:bg-purple-600/20 text-purple-300 hover:text-purple-200' 
                  : 'hover:bg-purple-100/80 text-purple-600 hover:text-purple-700'
              }`}
              title="Import file"
            >
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".md,.txt"
              onChange={handleImport}
              className="hidden"
            />
            
            <div className="relative group">
              <button
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'hover:bg-purple-600/20 text-purple-300 hover:text-purple-200' 
                    : 'hover:bg-purple-100/80 text-purple-600 hover:text-purple-700'
                }`}
                title="Export"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className={`absolute top-full right-0 mt-2 rounded-xl sm:rounded-2xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-xl min-w-[180px] ${
                isDark 
                  ? 'bg-gray-900 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`} style={{ backdropFilter: 'blur(12px)' }}>
                <button
                  onClick={onExportMarkdown}
                  className={`flex items-center gap-2 sm:gap-3 px-4 py-3 text-sm w-full text-left transition-colors duration-200 ${
                    isDark 
                      ? 'hover:bg-purple-600/30 text-gray-100 hover:text-white' 
                      : 'hover:bg-purple-50 text-gray-800 hover:text-purple-700'
                  } first:rounded-t-xl last:rounded-b-xl`}
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  Markdown (.md)
                </button>
                <button
                  onClick={onExportHtml}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm w-full text-left transition-all duration-200 ${
                    isDark 
                      ? 'hover:bg-purple-600/20 text-gray-200 hover:text-purple-200' 
                      : 'hover:bg-purple-100/80 text-gray-700 hover:text-purple-700'
                  }`}
                >
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  HTML (.html)
                </button>
                <button
                  onClick={onExportPdf}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-b-xl sm:rounded-b-2xl w-full text-left transition-all duration-200 ${
                    isDark 
                      ? 'hover:bg-purple-600/20 text-gray-200 hover:text-purple-200' 
                      : 'hover:bg-purple-100/80 text-gray-700 hover:text-purple-700'
                  }`}
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  PDF (.pdf)
                </button>
              </div>
            </div>
          </div>

          <div className={`flex items-center gap-1 rounded-xl sm:rounded-2xl p-1 backdrop-blur-sm transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800/50 border border-gray-700/50' 
              : 'bg-white/50 border border-gray-200/50'
          }`}>
            <button
              onClick={onShowCheatSheet}
              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'hover:bg-emerald-600/20 text-emerald-300 hover:text-emerald-200' 
                  : 'hover:bg-emerald-100/80 text-emerald-600 hover:text-emerald-700'
              }`}
              title="Markdown cheat sheet"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <button
              onClick={onShowSettings}
              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'hover:bg-blue-600/20 text-blue-300 hover:text-blue-200' 
                  : 'hover:bg-blue-100/80 text-blue-600 hover:text-blue-700'
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <button
              onClick={onToggleTheme}
              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'hover:bg-yellow-600/20 text-yellow-300 hover:text-yellow-200' 
                  : 'hover:bg-gray-100/80 text-gray-600 hover:text-gray-700'
              }`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}