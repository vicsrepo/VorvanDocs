// This file manages the loading and interaction with the Markdown parser

let initialized = false;

/**
 * Initialize the Markdown parser
 */
export async function initWasmModule() {
  if (initialized) return true;
  
  // Set up fallback parser function
  window.renderMarkdown = fallbackMarkdownParser;
  initialized = true;
  console.log('Simple markdown parser initialized');
  
  return { initialized: true };
}

/**
 * Simple fallback markdown parser in case all external options fail
 */
function fallbackMarkdownParser(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 id="$1">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 id="$1">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 id="$1">$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    // Lists
    .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
    .replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
    // Paragraphs
    .replace(/^\s*(\n)?(.+)/gim, function(m) {
      return /^<(\/)?(h\d|ul|ol|li|blockquote|pre|table|tr|th|td)/.test(m) 
        ? m
        : '<p>' + m.trim() + '</p>';
    })
    // Fix extra paragraph tags
    .replace(/<\/ul>\s?<ul>/g, '')
    .replace(/<\/ol>\s?<ol>/g, '')
    .replace(/<\/p>\s?<p>/g, '</p><p>')
    // HR
    .replace(/^---$/gim, '<hr>');
}

/**
 * Parse markdown to HTML using the WebAssembly module
 */
export async function parseMarkdown(markdown: string): Promise<string> {
  if (!initialized) {
    await initWasmModule();
  }
  
  try {
    return window.renderMarkdown(markdown);
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return fallbackMarkdownParser(markdown);
  }
}

/**
 * Extract TOC items from markdown content
 */
export function extractTocItems(markdown: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gim;
  const items = [];
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    
    // Create an ID by slugifying the heading text
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    items.push({ id, text, level });
  }
  
  return items;
}

// Ensure TypeScript recognizes the global functions
declare global {
  interface Window {
    renderMarkdown: (markdown: string) => string;
    mdWasm?: {
      parse: (markdown: string) => string;
    };
  }
}
