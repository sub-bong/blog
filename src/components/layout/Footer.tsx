import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-contents">
        <Link to="https://github.com/sub-bong?tab=repositories" target="_blank">
          <i className="fa-brands fa-github"></i>
        </Link>
      </div>
      <div className="footer-contents">
        Copyright © Sub-Bong Lab. All rights reserved.
      </div>
    </div>
  );
}
