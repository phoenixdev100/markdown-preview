import { useState, useEffect, useCallback } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_MARKDOWN = `# Welcome to Modern Markdown Editor

This is a **powerful** and *elegant* markdown editor with live preview.

## Features

- 🎨 Beautiful, modern UI with dark/light themes
- ⚡ Real-time preview with syntax highlighting
- 📱 Fully responsive design
- 💾 Auto-save to localStorage
- 📄 Export to PDF, HTML, and Markdown
- 🔄 Synchronized scrolling
- 📋 Built-in cheat sheet

## Code Highlighting

\`\`\`javascript
const greeting = (name) => {
  return \`Hello, \${name}! Welcome to the editor.\`;
};

console.log(greeting('Developer'));
\`\`\`

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Editor | ✅ | Monaco-powered |
| Preview | ✅ | Real-time |
| Export | ✅ | Multiple formats |

> **Tip**: Use the toolbar buttons for quick actions, or press \`Ctrl/Cmd + S\` to save your work.

Happy writing! 🚀
`;

export function useMarkdown() {
  const [markdown, setMarkdown] = useLocalStorage('markdown-content', DEFAULT_MARKDOWN);
  const [html, setHtml] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Configure marked options
  useEffect(() => {
    marked.setOptions({
      gfm: true,
      breaks: false, // Changed to false to match editor behavior
      headerIds: true,
      mangle: false,
    });

    // Configure renderer for better HTML output
    const renderer = new marked.Renderer();
    
    // Custom paragraph renderer to handle line breaks properly
    renderer.paragraph = function(text) {
      return `<p style="margin: 0.75em 0; line-height: 1.5; color: inherit;">${text}</p>`;
    };

    // Custom heading renderers with proper spacing
    renderer.heading = function(text, level) {
      const sizes = {
        1: 'font-size: 1.875rem; margin: 1.5em 0 0.75em 0;',
        2: 'font-size: 1.5rem; margin: 1.25em 0 0.5em 0;',
        3: 'font-size: 1.25rem; margin: 1em 0 0.5em 0;',
        4: 'font-size: 1.125rem; margin: 1em 0 0.5em 0;',
        5: 'font-size: 1rem; margin: 1em 0 0.5em 0;',
        6: 'font-size: 0.875rem; margin: 1em 0 0.5em 0;'
      };
      return `<h${level} style="${sizes[level as keyof typeof sizes]} font-weight: 700; line-height: 1.2; color: inherit;">${text}</h${level}>`;
    };

    // Custom list renderer with proper spacing
    renderer.list = function(body, ordered) {
      const tag = ordered ? 'ol' : 'ul';
      return `<${tag} style="margin: 0.75em 0; padding-left: 1.5em; line-height: 1.5; color: inherit;">${body}</${tag}>`;
    };

    renderer.listitem = function(text) {
      return `<li style="margin: 0.25em 0; color: inherit;">${text}</li>`;
    };
    
    // Custom code block renderer with theme-aware colors
    renderer.code = function(code, language) {
      const validLanguage = language && language.match(/^[a-zA-Z0-9_+-]*$/);
      const lang = validLanguage ? language : '';
      
      return `<pre style="margin: 1em 0; padding: 1rem; background: #1f2937; border-radius: 0.75rem; overflow-x: auto; border: 1px solid rgba(255, 255, 255, 0.1);"><code class="language-${lang}" style="color: #e5e7eb; font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace; font-size: 0.875em; line-height: 1.5;">${this.options.highlight ? this.options.highlight(code, lang) : code}</code></pre>`;
    };

    // Custom inline code renderer
    renderer.codespan = function(code) {
      return `<code style="background: rgba(139, 92, 246, 0.1); color: #7c3aed; padding: 0.2em 0.4em; border-radius: 0.25rem; font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace; font-size: 0.875em; font-weight: 600;">${code}</code>`;
    };

    // Custom blockquote renderer
    renderer.blockquote = function(quote) {
      return `<blockquote style="margin: 1em 0; padding: 0.75em 1em; border-left: 4px solid #8b5cf6; background: rgba(139, 92, 246, 0.05); border-radius: 0 0.5rem 0.5rem 0; font-style: italic; color: inherit;">${quote}</blockquote>`;
    };

    // Custom table renderer with proper contrast
    renderer.table = function(header, body) {
      return `<table style="width: 100%; border-collapse: collapse; margin: 1em 0; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); background: #ffffff; border: 1px solid #e5e7eb;">
        <thead style="background: #f8fafc;">${header}</thead>
        <tbody style="background: #ffffff;">${body}</tbody>
      </table>`;
    };

    // Custom table row renderer
    renderer.tablerow = function(content) {
      return `<tr style="border-bottom: 1px solid #e5e7eb;">${content}</tr>`;
    };

    // Custom table cell renderer with high contrast
    renderer.tablecell = function(content, flags) {
      const tag = flags.header ? 'th' : 'td';
      const style = flags.header 
        ? 'padding: 0.75rem; text-align: left; font-weight: 600; color: #1f2937; border: 1px solid #d1d5db; background: #f8fafc;'
        : 'padding: 0.75rem; color: #374151; border: 1px solid #e5e7eb; background: #ffffff;';
      
      return `<${tag} style="${style}">${content}</${tag}>`;
    };

    marked.setOptions({ renderer });
  }, []);

  // Convert markdown to HTML
  const convertToHtml = useCallback(async (markdownText: string) => {
    try {
      const rawHtml = await marked.parse(markdownText);
      const cleanHtml = DOMPurify.sanitize(rawHtml, {
        ADD_ATTR: ['target', 'class', 'style'],
        ALLOWED_ATTR: ['href', 'target', 'class', 'id', 'style', 'alt', 'src', 'title'],
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em', 'u', 's', 'del',
          'a', 'img',
          'ul', 'ol', 'li',
          'blockquote',
          'code', 'pre',
          'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'hr',
          'div', 'span'
        ],
      });
      return cleanHtml;
    } catch (error) {
      console.error('Error converting markdown:', error);
      return '<p style="color: #ef4444;">Error converting markdown</p>';
    }
  }, []);

  // Update HTML when markdown changes
  useEffect(() => {
    const updateHtml = async () => {
      const convertedHtml = await convertToHtml(markdown);
      setHtml(convertedHtml);
    };
    
    updateHtml();
  }, [markdown, convertToHtml]);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      setLastSaved(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, [markdown]);

  const updateMarkdown = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown);
  }, [setMarkdown]);

  const importMarkdown = useCallback((content: string) => {
    setMarkdown(content);
    setLastSaved(new Date());
  }, [setMarkdown]);

  const exportMarkdown = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [markdown]);

  const exportHtml = useCallback(() => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Document</title>
    <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 2rem; 
          line-height: 1.5; 
          color: #374151;
          background: #ffffff;
        }
        h1, h2, h3, h4, h5, h6 { color: #111827; margin-top: 2rem; margin-bottom: 1rem; }
        h1 { font-size: 2.25rem; }
        h2 { font-size: 1.875rem; }
        h3 { font-size: 1.5rem; }
        p { margin: 0.75em 0; }
        pre { 
          background: #1f2937; 
          color: #e5e7eb;
          padding: 1rem; 
          border-radius: 8px; 
          overflow-x: auto; 
          border: 1px solid #374151;
          margin: 1em 0;
        }
        code { 
          background: rgba(139, 92, 246, 0.1); 
          color: #7c3aed;
          padding: 0.2rem 0.4rem; 
          border-radius: 4px; 
          font-size: 0.875rem;
          font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
        }
        blockquote { 
          border-left: 4px solid #8b5cf6; 
          margin: 1rem 0; 
          padding-left: 1rem; 
          color: #6b7280; 
          font-style: italic;
          background: rgba(139, 92, 246, 0.05);
          padding: 0.75rem 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        table { 
          border-collapse: collapse; 
          width: 100%; 
          margin: 1rem 0; 
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
          background: #ffffff;
        }
        th, td { 
          border: 1px solid #e5e7eb; 
          padding: 0.75rem; 
          text-align: left; 
        }
        th { 
          background: #f8fafc; 
          font-weight: 600;
          color: #1f2937;
        }
        td {
          color: #374151;
          background: #ffffff;
        }
        a { 
          color: #2563eb; 
          text-decoration: none; 
        }
        a:hover { 
          text-decoration: underline; 
        }
        ul, ol { 
          padding-left: 1.5rem; 
          margin: 0.75em 0;
        }
        li { 
          margin: 0.25rem 0; 
        }
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [html]);

  return {
    markdown,
    html,
    lastSaved,
    updateMarkdown,
    importMarkdown,
    exportMarkdown,
    exportHtml,
  };
}