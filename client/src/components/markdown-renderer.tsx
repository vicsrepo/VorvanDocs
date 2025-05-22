import { useEffect } from "react";

interface MarkdownRendererProps {
  markdown: string;
  loading: boolean;
  currentPage: string;
}

export default function MarkdownRenderer({ markdown, loading, currentPage }: MarkdownRendererProps) {
  useEffect(() => {
    // Update the title when the page changes
    document.title = `${currentPage} - MicroVorvanDocs`;
  }, [currentPage]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md"></div>
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md"></div>
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md"></div>
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md"></div>
        <div className="h-32 w-full bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md"></div>
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md"></div>
        <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div 
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: markdown }}
    />
  );
}
