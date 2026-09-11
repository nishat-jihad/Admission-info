"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Get a free access key at https://web3forms.com — just enter
// admissioninfo26@gmail.com there and they'll email you the key, no
// account/signup needed. Then create a file named .env.local in the
// project root (next to package.json) with this line:
//   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=paste-your-key-here
// .env.local is already gitignored, so it stays out of the repo.
// When you deploy (e.g. on Vercel), add the same variable name/value
// under Project Settings -> Environment Variables, or the form will
// silently fail to send in production.
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!WEB3FORMS_ACCESS_KEY) {
      // No access key configured yet — see the comment above.
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.fullName.value,
          email: form.email.value,
          subject: form.subject.value || "Admission Info - নতুন মেসেজ",
          message: form.message.value,
          from_name: "Admission Info Contact Form",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
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
          <a className="sticker" href="mailto:admissioninfo26@gmail.com">
            <span className="sticker-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6l9 7 9-7" />
                <path d="M3 6v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z" />
              </svg>
            </span>
            <span className="label">
              <span className="k">ইমেইল</span>
              <span className="v">admissioninfo26@gmail.com</span>
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
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="তোমার নাম"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">ইমেইল</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tumi@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject">বিষয় (না দিলেও চলবে)</label>
              <input type="text" id="subject" name="subject" placeholder="কী নিয়ে লিখছো" />
            </div>

            <div className="form-field">
              <label htmlFor="message">মেসেজ</label>
              <textarea
                id="message"
                name="message"
                placeholder="যা বলতে চাও, খুলে লেখো"
                required
              />
            </div>

            <button type="submit" className="send-btn" disabled={status === "sending"}>
              {status === "sending" ? "পাঠানো হচ্ছে..." : "পাঠিয়ে দাও"}
            </button>

            <div className={`form-success${status === "sent" ? " show" : ""}`}>
              পাঠানো হয়ে গেছে! যত দ্রুত সম্ভব রিপ্লাই করব।
            </div>

            {status === "error" && (
              <div
                className="form-success show"
                style={{ background: "#fdecea", color: "#b3261e" }}
              >
                দুঃখিত, পাঠাতে সমস্যা হয়েছে। সরাসরি admissioninfo26@gmail.com এ ইমেইল করো।
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
