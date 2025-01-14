export function Footer() {
  return (
    <footer className="py-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} MDWriter. All rights reserved.</p>
      </div>
    </footer>
  );
} 