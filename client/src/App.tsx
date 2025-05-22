import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import MarkdownRenderer from "@/components/markdown-renderer";
import TableOfContents from "@/components/table-of-contents";
import Footer from "@/components/footer";
import { useMarkdown } from "@/hooks/use-markdown";
import { Page, TocItem } from "@/types";

const defaultPages: Page[] = [
  { id: "README", title: "Introduction", icon: "📘" },
  { id: "quickstart", title: "Quick Start", icon: "🚀" },
  { id: "api", title: "API Reference", icon: "⚙️" },
  { id: "examples", title: "Examples", icon: "💡" },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>(
    window.location.hash.slice(1) || "README"
  );
  const { markdown, loading, tocItems } = useMarkdown(currentPage);
  const [pages] = useState<Page[]>(defaultPages);

  useEffect(() => {
    // Handle hash changes
    const handleHashChange = () => {
      const pageId = window.location.hash.slice(1) || "README";
      setCurrentPage(pageId);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    // Close sidebar on mobile when navigating
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [currentPage]);

  const navigateTo = (pageId: string) => {
    window.location.hash = pageId;
    setCurrentPage(pageId);
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        pages={pages} 
        currentPage={currentPage} 
        onPageChange={navigateTo} 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar} 
      />

      {/* Main content */}
      <main className="md:ml-64 min-h-screen transition-all duration-300">
        <Header 
          currentPage={currentPage} 
          pages={pages} 
          onSidebarToggle={toggleSidebar} 
        />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <MarkdownRenderer 
                markdown={markdown} 
                loading={loading} 
                currentPage={currentPage} 
              />
            </div>
            
            <div className="hidden lg:block">
              <TableOfContents items={tocItems} />
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    </>
  );
}

export default App;
