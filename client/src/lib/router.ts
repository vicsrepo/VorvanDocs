import { createContext, useEffect, useState, ReactNode } from "react";

interface RouterContextType {
  currentPage: string;
  navigateTo: (pageId: string) => void;
}

export const RouterContext = createContext<RouterContextType>({
  currentPage: "",
  navigateTo: () => {},
});

interface RouterProviderProps {
  children: ReactNode;
}

export function RouterProvider({ children }: RouterProviderProps) {
  const [currentPage, setCurrentPage] = useState<string>(
    window.location.hash.slice(1) || "README"
  );

  const navigateTo = (pageId: string) => {
    window.location.hash = pageId;
    setCurrentPage(pageId);
  };

  useEffect(() => {
    // Handle hash changes
    const handleHashChange = () => {
      const pageId = window.location.hash.slice(1) || "README";
      setCurrentPage(pageId);
    };

    window.addEventListener("hashchange", handleHashChange);
    
    // Initial page load
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <RouterContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </RouterContext.Provider>
  );
}
