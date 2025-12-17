import Members from "./members";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center bg-secondary text-secondary-content p-8 mt-auto">
      <div className="max-w-5xl w-full">
        <div className="divider divider-primary" />
        <aside>
          <p>
            <Members />
          </p>
          <p className="text-primary-content text-sm">
            Akari Fujimoto; Guanwei Liu &copy; {currentYear}{" "}
            辞書序跋データベース. All rights reserved.
          </p>
        </aside>
      </div>
    </footer>
  );
}
