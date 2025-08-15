import React from "react";
import '../styles/global.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <span>
          A winning{" "}
          <a
            href="https://academy.appoftheyear.co.za/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-accent"
          >
            FNB App Academy
          </a>{" "}
          Web App by <strong>Kgothatso M.</strong>
        </span>
        <div className="footer-icon" role="img" aria-label="sparkles">
          ✨
        </div>
      </div>
    </footer>
  );
}