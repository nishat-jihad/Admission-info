"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { universities } from "@/data/universities";

export default function UniversitySidebar({ activeId }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", mobileOpen);
    return () => document.body.classList.remove("drawer-open");
  }, [mobileOpen]);

  useEffect(() => {
    document.body.classList.toggle("sidebar-collapsed", collapsed);
    return () => document.body.classList.remove("sidebar-collapsed");
  }, [collapsed]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 900) setMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="mobile-topbar">
        <Link className="brand" href="/">
          <Image
            src="/images/admission-info-logo.png"
            alt="Admission Info"
            width={342}
            height={141}
            className="topbar-logo-img"
          />
        </Link>
        <button
          className="hamburger-btn"
          aria-label={mobileOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`sidebar-overlay${mobileOpen ? " open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {collapsed && (
        <button
          className="sidebar-reopen-btn"
          aria-label="সাইডবার দেখাও"
          onClick={() => setCollapsed(false)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        </button>
      )}

      <aside className={`sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " open" : ""}`}>
        <div className="sidebar-logo">
          <Link href="/">
            <Image
              src="/images/admission-info-logo.png"
              alt="Admission Info"
              width={342}
              height={141}
              className="sidebar-logo-img"
            />
          </Link>
        </div>

        <nav className="uni-nav">
          {Object.entries(universities).map(([id, u]) => (
            <Link
              key={id}
              href={`/university/${id}`}
              className={id === activeId ? "active" : ""}
              onClick={() => setMobileOpen(false)}
            >
              {u.name}
            </Link>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button id="collapseBtn" onClick={() => setCollapsed(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            সাইডবার লুকাও
          </button>
        </div>
      </aside>
    </>
  );
}
