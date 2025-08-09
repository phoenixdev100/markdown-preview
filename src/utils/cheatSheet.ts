import { CheatSheetItem } from '../types';

export const cheatSheetData: CheatSheetItem[] = [
  {
    title: 'Headers',
    syntax: '# H1\n## H2\n### H3',
    example: 'Use 1-6 # symbols for different header levels'
  },
  {
    title: 'Emphasis',
    syntax: '**bold**\n*italic*\n~~strikethrough~~',
    example: 'Make text bold, italic, or struck through'
  },
  {
    title: 'Lists',
    syntax: '- Item 1\n- Item 2\n\n1. First\n2. Second',
    example: 'Create unordered (-) or ordered (1.) lists'
  },
  {
    title: 'Links',
    syntax: '[Link text](https://example.com)',
    example: 'Create clickable links'
  },
  {
    title: 'Images',
    syntax: '![Alt text](image-url.jpg)',
    example: 'Embed images with alt text'
  },
  {
    title: 'Code',
    syntax: '`inline code`\n\n```javascript\ncode block\n```',
    example: 'Inline code or code blocks with syntax highlighting'
  },
  {
    title: 'Quotes',
    syntax: '> This is a blockquote\n> Multi-line supported',
    example: 'Create blockquotes for citations'
  },
  {
    title: 'Tables',
    syntax: '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |',
    example: 'Create tables with pipes and dashes'
  },
  {
    title: 'Horizontal Rule',
    syntax: '---',
    example: 'Add a horizontal line separator'
  },
  {
    title: 'Line Break',
    syntax: 'Line 1  \nLine 2',
    example: 'Add two spaces at the end for line breaks'
  }
];