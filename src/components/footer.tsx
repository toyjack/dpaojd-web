export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-900 text-amber-50 mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-serif font-bold text-lg mb-3">
              辞書序跋データベース
            </h3>
            <p className="text-amber-200 text-sm leading-relaxed">
              日本の辞書における序跋文を収集・検索できるデータベースです。
            </p>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-3">情報</h3>
            <ul className="space-y-2 text-amber-200 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  このサイトについて
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  利用規約
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  プライバシーポリシー
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-3">お問い合わせ</h3>
            <p className="text-amber-200 text-sm">
              ご質問やご意見がございましたら、
              <br />
              お気軽にお問い合わせください。
            </p>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-6 text-center">
          <p className="text-amber-200 text-sm">
            &copy; {currentYear} 辞書序跋データベース. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
