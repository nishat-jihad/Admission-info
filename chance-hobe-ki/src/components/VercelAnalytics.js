"use client";

import { Analytics } from "@vercel/analytics/react";

// নিজের ব্রাউজারে একবার Console-এ চালালে সেই ব্রাউজারের ভিজিট আর গোনা হবে না:
//   localStorage.setItem("va-disable", "true")
// আবার গোনাতে চাইলে:
//   localStorage.removeItem("va-disable")
export default function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        try {
          if (localStorage.getItem("va-disable")) return null;
        } catch (e) {
          // localStorage না পেলে স্বাভাবিকভাবে গোনা হবে
        }
        return event;
      }}
    />
  );
}
