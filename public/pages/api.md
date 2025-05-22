# API Reference

MicroVorvanDocs provides a small set of JavaScript APIs to customize and extend your documentation.

## Core APIs

### Page Loading

```javascript
// Load a specific page programmatically
window.loadPage('pagename');

// Get the currently loaded page
const currentPage = window.getCurrentPage();
