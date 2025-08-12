import { Palette, Type, Settings, X, Sparkles } from 'lucide-react';
import { EditorSettings } from '../types';
import { editorThemes } from '../utils/themes';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EditorSettings;
  onSettingsChange: (settings: EditorSettings) => void;
}

export function ThemeSelector({ isOpen, onClose, settings, onSettingsChange }: ThemeSelectorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-lg w-full border border-blue-200/30 dark:border-blue-500/20">
        <div className="flex items-center justify-between p-8 border-b border-blue-200/30 dark:border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Editor Settings
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Customize your editing experience
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-110 text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 space-y-8">
          {/* Theme Selection */}
          <div>
            <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              Editor Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              {editorThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onSettingsChange({ ...settings, theme: theme.id })}
                  className={`p-4 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    settings.theme === theme.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg ring-2 ring-blue-400/50'
                      : 'bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20">
                <Type className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              Font Size
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="12"
                max="24"
                value={settings.fontSize}
                onChange={(e) => onSettingsChange({ ...settings, fontSize: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-gradient-to-r from-emerald-200 to-teal-200 dark:from-emerald-800 dark:to-teal-800 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm font-mono text-gray-600 dark:text-gray-400 min-w-[3rem] px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {settings.fontSize}px
              </span>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Editor Options
            </h3>
            
            {[
              { key: 'wordWrap', label: 'Word Wrap', description: 'Wrap long lines' },
              { key: 'minimap', label: 'Minimap', description: 'Show code overview' },
              { key: 'lineNumbers', label: 'Line Numbers', description: 'Display line numbers' }
            ].map((option) => (
              <label key={option.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {option.label}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {option.description}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings[option.key as keyof EditorSettings] as boolean}
                  onChange={(e) => onSettingsChange({ ...settings, [option.key]: e.target.checked })}
                  className="w-5 h-5 rounded-lg accent-blue-500 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}