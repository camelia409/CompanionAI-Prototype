"use client"; // Ensure it runs on the client side

import Link from "next/link";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* ✅ Logo */}
        <Link className="navbar-brand" href="/">CompanionAI</Link>

        {/* ✅ Hamburger Icon (Right Aligned) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Navbar Menu (Collapsible) */}
        <div className={`navbar-collapse ${isNavOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">Home</Link>
            </li>

            {/* ✅ Features Dropdown (Manually Controlled) */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-dark border-0"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Features
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <li>
                  <Link className="dropdown-item" href="/features/ai-support">
                    AI-Powered Support
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/features/healthcare">
                    Smart Healthcare
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/features/community">
                    Community & Telemedicine
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
