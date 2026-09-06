"use client";

import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "chanceHobeKiCookieConsent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShow(false);
  }
  function reject() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setShow(false);
  }

  return (
    <div className={`cookies-card${show ? " show" : ""}`}>
      <button className="exit-button" aria-label="Close" onClick={reject}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 162 162" className="svgIconCross">
          <path strokeLinecap="round" strokeWidth="17" stroke="black" d="M9.01074 8.98926L153.021 153" />
          <path strokeLinecap="round" strokeWidth="17" stroke="black" d="M9.01074 153L153.021 8.98926" />
        </svg>
      </button>
      <p className="cookie-heading">আমরা কুকিজ ব্যবহার করি 🍪</p>
      <p className="cookie-para">
        তোমার ব্রাউজিং অভিজ্ঞতা আরও ভালো করতে আমরা কুকিজ ব্যবহার করি। "Accept" করলে
        তুমি এতে সম্মতি দিচ্ছ বলে বিবেচনা করা হবে।
      </p>
      <div className="button-wrapper">
        <button className="cookie-button reject" onClick={reject}>
          Reject
        </button>
        <button className="cookie-button accept" onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
