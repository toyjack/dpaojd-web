import SearchPage from "@/components/search-panel";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <header className="text-center mb-12 pt-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-3">
              辞書序跋データベース（仮）
            </h1>
            <p className="text-lg text-amber-700 font-light">
              Dictionary Prefaces and Postscripts Database of Japanese
              Dictionaries (Provisional)
            </p>
            <div className="mt-4 w-24 h-1 bg-amber-600 mx-auto"></div>
          </header>

          <SearchPage />
        </div>
      </main>
      <Footer />
    </div>
  );
}
