import { pages, type Page, type InsertPage } from "@shared/schema";

// Storage interface for pages
export interface IStorage {
  getPage(pageId: string): Promise<Page | undefined>;
  getAllPages(): Promise<Page[]>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, page: Partial<InsertPage>): Promise<Page | undefined>;
  deletePage(id: number): Promise<boolean>;
  
  // User-related methods from original template
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private pagesData: Map<number, Page>;
  private currentUserId: number;
  private currentPageId: number;

  constructor() {
    this.users = new Map();
    this.pagesData = new Map();
    this.currentUserId = 1;
    this.currentPageId = 1;
    
    // Initialize with default pages
    this.initializeDefaultPages();
  }
  
  private initializeDefaultPages() {
    const defaultPages = [
      {
        pageId: "README",
        title: "Introduction",
        content: `# MicroVorvanDocs

Zaměříme se na **ultralehkou základní verzi** bez AI, playgroundů a kolaborace. Pojďme vytvořit **„MicroVorvanDocs"** – minimalistickou alternativu k Docsify s rychlostí jako priorita.

---

### 🎯 **Minimální jádro (v0.1)**

1. **Instant Markdown → HTML**
  
  - Načítání \`.md\` souborů přímo z adresáře (žádný build, žádné konfigurace).
  - Rendering pomocí **WebAssembly Markdown parseru** (3x rychlejší než klasické JS řešení).
2. **Zero-Dependency Router**
  
  - Navigace pomocí hash (#) bez reloadu stránky.
  - Automatické detekce \`README.md\` jako výchozí stránky.
3. **CSS Atomic Injection**
  
  - Vestavěné minimalistické CSS (5 KB) s tmavým/světlým režimem.
  - Žádné externí závislosti – vše v jednom HTML souboru.

---

### 🛠️ **Struktura projektu**

\`\`\`bash
/docs  
  ├── index.html      # 1 soubor se vším potřebným  
  ├── styles.wasm     # Kompilované CSS pro rychlé načítání  
  └── /pages          # Vaše markdown dokumentace  
       ├── README.md  
       └── api.md  
\`\`\`

---

### 📜 **index.html** (kompletní nastavení)

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <!-- WASM Markdown parser + atomic CSS -->
  <script type="module">
    import init from './microdocs.wasm.js'; // WebAssembly modul
    init().then(() => {
      window.renderMarkdown = (md) => window.mdWasm.parse(md);
    });
  </script>
</head>
<body>
  <div id="content"></div>

  <script>
    // Router
    async function loadPage() {
      const page = window.location.hash.slice(1) || 'README';
      const md = await fetch(\`./pages/\${page}.md\`).then(r => r.text());
      document.getElementById('content').innerHTML = renderMarkdown(md);
    }

    window.addEventListener('hashchange', loadPage);
    loadPage();
  </script>
</body>
</html>
\`\`\`

---

### 🚀 **Jak začít?**

1. Přidejte své \`.md\` soubory do složky \`/pages\`
2. Deployněte kamkoli (GitHub Pages, Netlify…) – **žádný build potřebný!**

---

### ⚡ Výhody oproti Docsify

- **Rychlost**: 15 KB vs. Docsify's 30 KB (+ WebAssembly výhody).
- **Transparentnost**: Žádné skryté konfigurace – vše je v 1 HTML souboru.
- **Portabilita**: Funguje i offline z lokálního disku (file:// protocol).`,
        icon: "📘",
        published: true,
        order: 0
      },
      {
        pageId: "quickstart",
        title: "Quick Start",
        content: `# Quick Start Guide

Get MicroVorvanDocs up and running in just a few minutes with these simple steps.

## Installation

There's no need to install anything! MicroVorvanDocs is designed to work directly from your file system.

### Step 1: Download Files

\`\`\`bash
git clone https://github.com/username/microvarvandocs.git
cd microvarvandocs
\`\`\`

### Step 2: Create Your Documentation

Add your markdown files to the \`/pages\` directory:

\`\`\`bash
# Create a basic README.md file
echo "# My Project Documentation" > pages/README.md
\`\`\`

### Step 3: View Your Documentation

Simply open \`index.html\` in your browser - no server required!

## Configure Light/Dark Mode

MicroVorvanDocs automatically detects user system preferences for light/dark mode, but users can also toggle between modes manually.

## Adding Pages

Create new \`.md\` files in the \`/pages\` directory and link to them using hash navigation:

\`\`\`
[Go to API Documentation](#api)
\`\`\`

When a user clicks this link, MicroVorvanDocs will automatically load and render \`/pages/api.md\`.

## Deployment

Deploy your documentation anywhere that can serve static files:

- **GitHub Pages**: Just push your repository to GitHub and enable Pages
- **Netlify/Vercel**: Connect your repository and deploy
- **Any Web Server**: Copy files to your server's public directory

That's it! No build step required.`,
        icon: "🚀",
        published: true,
        order: 1
      },
      {
        pageId: "api",
        title: "API Reference",
        content: `# API Reference

MicroVorvanDocs provides a small set of JavaScript APIs to customize and extend your documentation.

## Core APIs

### Page Loading

\`\`\`javascript
// Load a specific page programmatically
window.loadPage('pagename');

// Get the currently loaded page
const currentPage = window.getCurrentPage();
\`\`\`

### Markdown Rendering

\`\`\`javascript
// Render markdown string to HTML
const html = window.renderMarkdown(markdownString);

// Get raw markdown content of current page
const markdown = window.getCurrentMarkdown();
\`\`\`

## Lifecycle Hooks

You can hook into various points in the document lifecycle:

\`\`\`javascript
// Called before a page is loaded
window.microDocs.beforePageLoad = (pageId) => {
  console.log(\`About to load page: \${pageId}\`);
  // Return false to prevent loading
  return true;
};

// Called after a page has loaded and rendered
window.microDocs.afterPageLoad = (pageId, contentEl) => {
  console.log(\`Page \${pageId} loaded\`);
  // contentEl is the DOM element containing the rendered content
};
\`\`\`

## Configuration

Configure MicroVorvanDocs by setting properties on the \`window.microDocsConfig\` object:

\`\`\`javascript
window.microDocsConfig = {
  // Base path for markdown files
  basePath: './docs/',
  
  // Default page to load if none specified
  defaultPage: 'home',
  
  // Enable/disable features
  features: {
    darkMode: true,
    codeHighlighting: true,
    tableOfContents: true
  }
};
\`\`\`

## Plugin API

Create plugins to extend functionality:

\`\`\`javascript
// Plugin definition
const myPlugin = {
  name: 'my-plugin',
  init: () => {
    // Setup code
  },
  hooks: {
    beforePageLoad: (pageId) => {
      // Do something before page loads
    },
    afterPageLoad: (pageId, contentEl) => {
      // Do something after page loads
    }
  }
};

// Register plugin
window.microDocs.registerPlugin(myPlugin);
\`\`\``,
        icon: "⚙️",
        published: true,
        order: 2
      },
      {
        pageId: "examples",
        title: "Examples",
        content: `# Examples

Here are some examples of what you can do with MicroVorvanDocs.

## Basic Formatting

MicroVorvanDocs supports all standard Markdown formatting:

- **Bold text** using \`**bold**\`
- *Italic text* using \`*italic*\`
- ~~Strikethrough~~ using \`~~strikethrough~~\`

## Code Blocks

You can include code with syntax highlighting:

\`\`\`javascript
// JavaScript Example
function loadPage(pageId) {
  const path = \`./pages/\${pageId}.md\`;
  fetch(path)
    .then(response => response.text())
    .then(markdown => {
      const html = renderMarkdown(markdown);
      document.getElementById('content').innerHTML = html;
    });
}
\`\`\`

## Tables

Markdown tables are fully supported:

| Feature | MicroVorvanDocs | Docsify |
|---------|----------------|---------|
| Size | 15 KB | 30 KB |
| Build Required | No | No |
| WebAssembly | Yes | No |
| Offline Support | Yes | Limited |

## Custom HTML

You can embed custom HTML directly in your markdown:

<div style="padding: 1rem; background-color: #ebf8ff; border-radius: 0.5rem; border: 1px solid #90cdf4;">
  <h4 style="color: #2b6cb0; font-weight: 500; margin-bottom: 0.5rem;">This is a custom note box</h4>
  <p style="color: #4299e1;">Use HTML when you need more advanced formatting.</p>
</div>

## Links and Navigation

Create links to other pages in your documentation:

- [Go to Introduction](#README)
- [Go to API Reference](#api)
- [External Link](https://github.com)

## Images

Include images using standard Markdown syntax:

\`\`\`
![Alt text](./images/screenshot.png "Optional title")
\`\`\`

The above would display an image if it existed in the specified path.`,
        icon: "💡",
        published: true,
        order: 3
      }
    ];
    
    // Add default pages to storage
    defaultPages.forEach(page => {
      const id = this.currentPageId++;
      this.pagesData.set(id, { ...page, id });
    });
  }

  // Page methods
  async getPage(pageId: string): Promise<Page | undefined> {
    for (const page of this.pagesData.values()) {
      if (page.pageId === pageId) {
        return page;
      }
    }
    return undefined;
  }

  async getAllPages(): Promise<Page[]> {
    return Array.from(this.pagesData.values())
      .filter(page => page.published)
      .sort((a, b) => a.order - b.order);
  }

  async createPage(page: InsertPage): Promise<Page> {
    const id = this.currentPageId++;
    const newPage = { ...page, id };
    this.pagesData.set(id, newPage);
    return newPage;
  }

  async updatePage(id: number, data: Partial<InsertPage>): Promise<Page | undefined> {
    const page = this.pagesData.get(id);
    if (!page) return undefined;
    
    const updatedPage = { ...page, ...data };
    this.pagesData.set(id, updatedPage);
    return updatedPage;
  }

  async deletePage(id: number): Promise<boolean> {
    return this.pagesData.delete(id);
  }

  // User methods from original template
  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
