import { X, BookOpen, Sparkles } from 'lucide-react';
import { cheatSheetData } from '../utils/cheatSheet';

interface CheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheatSheet({ isOpen, onClose }: CheatSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden border border-purple-200/30 dark:border-purple-500/20">
        <div className="flex items-center justify-between p-8 border-b border-purple-200/30 dark:border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Markdown Cheat Sheet
                <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Quick reference for markdown syntax
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-110 text-gray-500 hover:text-red-500"
            aria-label="Close cheat sheet"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto max-h-[calc(85vh-140px)] custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cheatSheetData.map((item, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/50 to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-purple-200/30 dark:border-purple-500/20 hover:scale-105"
              >
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  {item.title}
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-4 overflow-x-auto border border-gray-700">
                    <code className="text-sm text-emerald-400 font-mono whitespace-pre-wrap break-all">
                      {item.syntax}
                    </code>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}