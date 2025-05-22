# Examples

Here are some examples of what you can do with MicroVorvanDocs.

## Basic Formatting

MicroVorvanDocs supports all standard Markdown formatting:

- **Bold text** using `**bold**`
- *Italic text* using `*italic*`
- ~~Strikethrough~~ using `~~strikethrough~~`

## Code Blocks

You can include code with syntax highlighting:

```javascript
// JavaScript Example
function loadPage(pageId) {
  const path = `./pages/${pageId}.md`;
  fetch(path)
    .then(response => response.text())
    .then(markdown => {
      const html = renderMarkdown(markdown);
      document.getElementById('content').innerHTML = html;
    });
}
