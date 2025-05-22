import { useState, useEffect } from "react";

export function useRouter() {
  const [currentPage, setCurrentPage] = useState<string>(
    window.location.hash.slice(1) || "README"
  );

  useEffect(() => {
    const handleHashChange = () => {
      const pageId = window.location.hash.slice(1) || "README";
      setCurrentPage(pageId);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigateTo = (pageId: string) => {
    window.location.hash = pageId;
    setCurrentPage(pageId);
  };

  return { currentPage, navigateTo };
}
