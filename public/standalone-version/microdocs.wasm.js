// This is the WebAssembly JavaScript loader for the Markdown parser
// It loads the marked.js library as a substitute for a real WASM module

async function init() {
  try {
    // In a real implementation, this would load the actual WebAssembly module
    // For this demo, we'll use the marked.js library from a CDN
    const markedModule = await import('https://cdn.jsdelivr.net/npm/marked@4.3.0/+esm');
    
    // Set up the global renderMarkdown function
    window.renderMarkdown = (markdown) => {
      try {
        return markedModule.marked.parse(markdown, {
          gfm: true,         // GitHub Flavored Markdown
          breaks: true,      // Convert \n to <br>
          headerIds: true,   // Add IDs to headers
          mangle: false      // Don't escape HTML
        });
      } catch (error) {
        console.error('Error parsing markdown:', error);
        return `<div class="error">Error parsing markdown: ${error.message}</div>`;
      }
    };
    
    console.log('Markdown parser initialized via marked.js');
    return { initialized: true };
  } catch (error) {
    console.error('Failed to initialize markdown parser:', error);
    
    // Fallback to a simple implementation if loading fails
    window.renderMarkdown = (markdown) => {
      // Simple markdown parser as fallback
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
    };
    
    console.log('Fallback markdown parser initialized');
    return { initialized: true };
  }
}

export default init;
