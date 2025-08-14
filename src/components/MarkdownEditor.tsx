import { useState, useCallback } from 'react';
import html2pdf from 'html2pdf.js';
import { EditorPane } from './EditorPane';
import { PreviewPane } from './PreviewPane';
import { Toolbar } from './Toolbar';
import { CheatSheet } from './CheatSheet';
import { ThemeSelector } from './ThemeSelector';
import { useMarkdown } from '../hooks/useMarkdown';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { EditorSettings } from '../types';
import { getSystemTheme } from '../utils/themes';
import { Heart } from 'lucide-react';

const defaultSettings: EditorSettings = {
  theme: getSystemTheme(),
  fontSize: 14,
  wordWrap: true,
  minimap: true,
  lineNumbers: true,
};

export function MarkdownEditor() {
  const [settings, setSettings] = useLocalStorage('editor-settings', defaultSettings);
  const [isDark, setIsDark] = useLocalStorage('dark-mode', getSystemTheme() === 'dark');
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [, setEditorScrollTop] = useState(0);
  const [, setPreviewScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const {
    markdown,
    html,
    lastSaved,
    updateMarkdown,
    importMarkdown,
    exportMarkdown,
    exportHtml,
  } = useMarkdown();

  // Synchronized scrolling
  const handleEditorScroll = useCallback((scrollTop: number, scrollHeight: number) => {
    if (isScrolling) return;
    setIsScrolling(true);
    setEditorScrollTop(scrollTop);
    
    const percentage = scrollTop / (scrollHeight - window.innerHeight);
    const previewContainer = document.querySelector('.preview-container');
    if (previewContainer) {
      const previewScrollHeight = previewContainer.scrollHeight - previewContainer.clientHeight;
      previewContainer.scrollTop = percentage * previewScrollHeight;
    }
    
    setTimeout(() => setIsScrolling(false), 100);
  }, [isScrolling]);

  const handlePreviewScroll = useCallback((scrollTop: number) => {
    if (isScrolling) return;
    setIsScrolling(true);
    setPreviewScrollTop(scrollTop);
    
    setTimeout(() => setIsScrolling(false), 100);
  }, [isScrolling]);

  const handleExportPdf = useCallback(async () => {
    const element = document.querySelector('.preview-container');
    if (!element) return;

    // Create a clone of the element to avoid affecting the original
    const elementToPrint = element.cloneNode(true) as HTMLElement;
    
    // Remove any existing buttons or interactive elements
    const buttons = elementToPrint.querySelectorAll('button, a, input, select, textarea');
    buttons.forEach(btn => btn.remove());
    
    // Add some styles for better PDF output
    elementToPrint.style.padding = '20px';
    elementToPrint.style.backgroundColor = 'white';
    
    // Create a temporary container for the print
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.appendChild(elementToPrint);
    document.body.appendChild(tempContainer);

    const opt = {
      margin: 10,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };

    try {
      // Create a new instance of html2pdf
      const worker = html2pdf();
      
      // Set the options
      worker.set(opt);
      
      // Set the content and save the PDF
      await worker
        .from(elementToPrint)
        .save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Clean up
      document.body.removeChild(tempContainer);
    }
  }, [html]);

  const handleSave = useCallback(() => {
    exportMarkdown();
  }, [exportMarkdown]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'dark bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-rose-50 via-purple-50 to-cyan-50'
    }`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 rounded-full opacity-20 blur-3xl animate-pulse ${
          isDark ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-300 to-pink-300'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 rounded-full opacity-20 blur-3xl animate-pulse delay-1000 ${
          isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-cyan-300 to-blue-300'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-10 blur-3xl animate-pulse delay-500 ${
          isDark ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-emerald-300 to-teal-300'
        }`}></div>
      </div>

      <Toolbar
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onSave={handleSave}
        onExportMarkdown={exportMarkdown}
        onExportHtml={exportHtml}
        onImportFile={importMarkdown}
        onShowCheatSheet={() => setShowCheatSheet(true)}
        onShowSettings={() => setShowSettings(true)}
        onExportPdf={handleExportPdf}
        lastSaved={lastSaved}
      />

      <div className="relative z-10 flex-1 p-3 sm:p-4 lg:p-6 gap-3 sm:gap-4 lg:gap-6 grid grid-cols-1 xl:grid-cols-2 min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-158px)]">
        <div className="transform hover:scale-[1.01] transition-transform duration-300 order-2 xl:order-1">
          <EditorPane
            value={markdown}
            onChange={updateMarkdown}
            settings={settings}
            onScroll={handleEditorScroll}
          />
        </div>
        
        <div className="preview-container transform hover:scale-[1.01] transition-transform duration-300 order-1 xl:order-2">
          <PreviewPane
            html={html}
            isDark={isDark}
            onScroll={handlePreviewScroll}
          />
        </div>
      </div>

      {/* Beautiful Footer with Heart */}
      <footer className={`relative z-10 py-4 px-6 border-t backdrop-blur-xl transition-all duration-500 ${
        isDark 
          ? 'bg-gray-900/20 border-purple-500/20 text-purple-200' 
          : 'bg-white/20 border-purple-200/30 text-purple-700'
      }`}>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-medium">Made with</span>
          <Heart 
            className={`w-4 h-4 animate-pulse transition-colors duration-300 ${
              isDark ? 'text-pink-400 fill-pink-400' : 'text-pink-500 fill-pink-500'
            }`} 
          />
          <span className="text-sm font-medium">by</span>
          <span className={`text-sm font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
            isDark 
              ? 'from-purple-400 via-pink-400 to-red-400' 
              : 'from-purple-600 via-pink-600 to-red-600'
          }`}>
            Deepak
          </span>
        </div>
      </footer>

      <CheatSheet
        isOpen={showCheatSheet}
        onClose={() => setShowCheatSheet(false)}
      />

      <ThemeSelector
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
}