import { Page } from "@/types";

interface SidebarProps {
  pages: Page[];
  currentPage: string;
  onPageChange: (pageId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ pages, currentPage, onPageChange, isOpen, onToggle }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-30 transform md:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto ${
        isOpen ? "translate-x-0 slide-in" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Logo area */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <span className="text-blue-600 dark:text-blue-400 text-xl">⚡</span>
          <span className="font-semibold text-lg">MicroVorvanDocs</span>
        </a>
        <button
          onClick={onToggle}
          className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation links */}
      <nav className="p-4">
        <div className="mb-4">
          <p className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Documentation
          </p>
          <ul className="space-y-1">
            {pages.map((page) => (
              <li key={page.id}>
                <a
                  href={`#${page.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page.id);
                  }}
                  className={`flex items-center px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 ${
                    currentPage === page.id
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : ""
                  }`}
                >
                  <span className="mr-2">{page.icon}</span>
                  <span>{page.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Resources
          </p>
          <ul className="space-y-1">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="mr-2">📦</span>
                <span>GitHub Repository</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="mr-2">🐛</span>
                <span>Report Issues</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
