// This initializes and loads the WebAssembly module for Markdown parsing

let wasmModule: any = null;
let initialized = false;

export async function initWasmModule() {
  if (initialized) return;
  
  try {
    // Import the WebAssembly module JavaScript loader
    const init = (await import('/wasm/microdocs.wasm.js')).default;
    await init();
    
    // After initialization, the module should expose the parse function globally
    if (typeof window.renderMarkdown !== 'function') {
      throw new Error('WebAssembly module did not properly initialize');
    }
    
    initialized = true;
    console.log('WebAssembly Markdown parser initialized successfully');
  } catch (error) {
    console.error('Failed to initialize WebAssembly module:', error);
    
    // Fallback to a simple implementation in case WASM fails
    window.renderMarkdown = (md: string) => {
      return fallbackMarkdownParser(md);
    };
    
    initialized = true;
  }
}

// Simple fallback markdown parser in case WebAssembly fails to load
function fallbackMarkdownParser(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
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

// This function wraps the global renderMarkdown function provided by the WASM module
export async function parseMarkdown(markdown: string): Promise<string> {
  if (!initialized) {
    await initWasmModule();
  }
  
  return window.renderMarkdown(markdown);
}

// Extract TOC items from markdown content
export function extractTocItems(markdown: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gim;
  const items = [];
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    items.push({ id, text, level });
  }
  
  return items;
}

// Add types to the window object
declare global {
  interface Window {
    renderMarkdown: (markdown: string) => string;
    mdWasm?: {
      parse: (markdown: string) => string;
    };
  }
}
