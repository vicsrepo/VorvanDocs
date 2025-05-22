import { useState, useEffect } from "react";
import { parseMarkdown, extractTocItems } from "@/lib/markdown-parser";
import { TocItem } from "@/types";

export function useMarkdown(pageId: string) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [rawMarkdown, setRawMarkdown] = useState("");

  useEffect(() => {
    async function loadMarkdown() {
      try {
        setLoading(true);
        
        // Fetch the markdown file
        const response = await fetch(`/pages/${pageId}.md`);
        
        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${response.statusText}`);
        }
        
        const rawContent = await response.text();
        setRawMarkdown(rawContent);
        
        // Extract TOC items
        const toc = extractTocItems(rawContent);
        setTocItems(toc);
        
        // Parse markdown to HTML
        const htmlContent = await parseMarkdown(rawContent);
        setMarkdown(htmlContent);
      } catch (error) {
        console.error("Error loading markdown:", error);
        setMarkdown(`<h1>Error Loading Document</h1><p>Failed to load ${pageId}.md</p>`);
      } finally {
        setLoading(false);
      }
    }

    loadMarkdown();
  }, [pageId]);

  return { markdown, rawMarkdown, loading, tocItems };
}
