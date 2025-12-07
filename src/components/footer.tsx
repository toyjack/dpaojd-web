export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-900 text-amber-50 mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-5xl">          
        <div className="border-t border-amber-800 pt-6 text-center">
          <p className="text-amber-200 text-sm">
            Akari Fujimoto; Guanwei Liu &copy; {currentYear} 辞書序跋データベース. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
