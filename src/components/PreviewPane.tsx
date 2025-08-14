import { useRef, useEffect } from 'react';

interface PreviewPaneProps {
  html: string;
  isDark: boolean;
  onScroll?: (scrollTop: number, scrollHeight: number) => void;
}

export function PreviewPane({ html, isDark, onScroll }: PreviewPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current && onScroll) {
      const { scrollTop, scrollHeight } = containerRef.current;
      onScroll(scrollTop, scrollHeight);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Create theme-aware CSS for tables and code blocks
  const themeStyles = isDark ? `
    <style>
      .preview-content table {
        background: #1f2937 !important;
        border: 1px solid #374151 !important;
      }
      .preview-content th {
        background: #111827 !important;
        color: #f9fafb !important;
        border: 1px solid #374151 !important;
      }
      .preview-content td {
        background: #1f2937 !important;
        color: #e5e7eb !important;
        border: 1px solid #374151 !important;
      }
      .preview-content code {
        background: rgba(139, 92, 246, 0.2) !important;
        color: #c4b5fd !important;
      }
      .preview-content pre {
        background: #111827 !important;
        border: 1px solid #374151 !important;
      }
      .preview-content pre code {
        color: #e5e7eb !important;
        background: transparent !important;
      }
      .preview-content blockquote {
        background: rgba(139, 92, 246, 0.1) !important;
        color: #d1d5db !important;
        border-left-color: #8b5cf6 !important;
      }
    </style>
  ` : `
    <style>
      .preview-content table {
        background: #ffffff !important;
        border: 1px solid #e5e7eb !important;
      }
      .preview-content th {
        background: #f8fafc !important;
        color: #1f2937 !important;
        border: 1px solid #d1d5db !important;
      }
      .preview-content td {
        background: #ffffff !important;
        color: #374151 !important;
        border: 1px solid #e5e7eb !important;
      }
      .preview-content code {
        background: rgba(139, 92, 246, 0.1) !important;
        color: #7c3aed !important;
      }
      .preview-content pre {
        background: #1f2937 !important;
        border: 1px solid #374151 !important;
      }
      .preview-content pre code {
        color: #e5e7eb !important;
        background: transparent !important;
      }
      .preview-content blockquote {
        background: rgba(139, 92, 246, 0.05) !important;
        color: #4b5563 !important;
        border-left-color: #8b5cf6 !important;
      }
    </style>
  `;

  return (
    <div className="h-full backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border transition-all duration-500 hover:shadow-3xl bg-white/95 dark:bg-gray-900/95 border-purple-200/30 dark:border-purple-500/20">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 px-4 sm:px-6 py-3 sm:py-4 border-b border-blue-200/30 dark:border-blue-500/20">
        <h3 className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2 sm:gap-3">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg animate-pulse"></div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Preview
          </span>
        </h3>
      </div>
      <div
        ref={containerRef}
        className="h-[calc(100%-48px)] sm:h-[calc(100%-60px)] overflow-y-auto p-3 sm:p-4 lg:p-6 custom-scrollbar"
        style={{
          backgroundColor: isDark ? '#111827' : '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: '1.5',
          fontSize: '15px'
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <div 
          className={`preview-content prose prose-sm sm:prose-base max-w-none transition-all duration-300 ${
            isDark 
              ? 'prose-invert prose-headings:text-white prose-p:text-gray-100 prose-strong:text-white prose-em:text-gray-200 prose-a:text-blue-400 prose-a:hover:text-blue-300 prose-li:text-gray-100 prose-ul:text-gray-100 prose-ol:text-gray-100'
              : 'prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-em:text-gray-700 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-li:text-gray-800 prose-ul:text-gray-800 prose-ol:text-gray-800'
          }`}
          style={{
            lineHeight: '1.5',
            color: isDark ? '#e5e7eb' : '#374151'
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}