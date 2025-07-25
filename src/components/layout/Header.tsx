import { Link } from "react-router";

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-contents">
        <Link to="/" title="To The Home">
          <div className="header-item"></div>
        </Link>
        <div className="header-item" title="This is The Sub-Bong Blog">
          Sub-Bong Lab
        </div>
      </div>
    </header>
  );
}
