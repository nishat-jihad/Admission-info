"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  }

  return (
    <>
      <Navbar />
      <main className="page">
        <div className="contact-hero">
          <h1>কিছু বলার আছে?</h1>
          <p>
            প্রশ্ন থাকলে, কোনো ভুল চোখে পড়লে, বা নতুন কিছু যোগ করার আইডিয়া থাকলে — নিচে
            লিখে ফেলো। আমরা পড়ি, রিপ্লাইও দিই।
          </p>
        </div>

        <div className="reach-row">
          <a className="sticker" href="mailto:alamnishat456@gmail.com">
            <span className="sticker-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6l9 7 9-7" />
                <path d="M3 6v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z" />
              </svg>
            </span>
            <span className="label">
              <span className="k">ইমেইল</span>
              <span className="v">alamnishat456@gmail.com</span>
            </span>
          </a>

          <div className="sticker" style={{ cursor: "default" }}>
            <span className="sticker-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            <span className="label">
              <span className="k">ঠিকানা</span>
              <span className="v">Chandina, Cumilla, Bangladesh</span>
            </span>
          </div>
        </div>

        <div className="form-card">
          <h2>মেসেজ পাঠাও</h2>
          <p className="hint">নাম আর ইমেইল দিলে রিপ্লাই দিতে সুবিধা হয়।</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="fullName">নাম</label>
                <input type="text" id="fullName" placeholder="তোমার নাম" required />
              </div>
              <div className="form-field">
                <label htmlFor="email">ইমেইল</label>
                <input type="email" id="email" placeholder="tumi@example.com" required />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject">বিষয় (না দিলেও চলবে)</label>
              <input type="text" id="subject" placeholder="কী নিয়ে লিখছো" />
            </div>

            <div className="form-field">
              <label htmlFor="message">মেসেজ</label>
              <textarea id="message" placeholder="যা বলতে চাও, খুলে লেখো" required />
            </div>

            <button type="submit" className="send-btn">
              পাঠিয়ে দাও
            </button>
            <div className={`form-success${sent ? " show" : ""}`}>
              পাঠানো হয়ে গেছে! যত দ্রুত সম্ভব রিপ্লাই করব।
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
