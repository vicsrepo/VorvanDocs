export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 mt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              MicroVorvanDocs - Lightweight Documentation System
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Built with ⚡ WebAssembly | No dependencies |{" "}
              <span className="text-blue-600 dark:text-blue-400">Just 15KB</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
