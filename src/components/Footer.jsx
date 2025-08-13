import React from "react";
import '../styles/global.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <span>
          A winning <span className="footer-accent">FNB App Academy</span> Web App by{" "}
          <strong>Kgothatso M.</strong>
        </span>
        <div className="footer-icon" role="img" aria-label="sparkles">
          ✨
        </div>
      </div>
    </footer>
  );
}
