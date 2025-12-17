import Footer from "@/components/footer";
import SearchPage from "@/components/search-panel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-amber-50 to-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="hero py-8">
            <div className="hero-content text-center">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3">
                  辞書序跋データベース（仮）
                </h1>
                <p className="text-lg text-secondary font-light">
                  Dictionary Prefaces and Postscripts Database of Japanese
                  Dictionaries (Provisional)
                </p>
                <div className="divider divider-primary w-24 mx-auto" />
              </div>
            </div>
          </div>

          {/* name of each tab group should be unique */}
          <div className="tabs tabs-lift">
            <label className="tab">
              <input type="radio" name="my_tabs_4" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 me-2"
              >
                <title>Live</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
              全文検索
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
              <div className="join join-vertical sm:join-horizontal w-full">
                <input
                  type="text"
                  placeholder="検索キーワードを入力..."
                  className="input input-bordered join-item flex-1 focus:outline-offset-0"
                />
                <button type="submit" className="btn btn-primary join-item">
                  検索
                </button>
              </div>
            </div>

            <label className="tab">
              <input type="radio" name="my_tabs_4" defaultChecked />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 me-2"
              >
                <title>Laugh</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
              詳細検索
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
              Tab content 2
            </div>

            <label className="tab">
              <input type="radio" name="my_tabs_4" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 me-2"
              >
                <title>Love</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              序抜一覧
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
              Tab content 3
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
