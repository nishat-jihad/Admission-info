"use client";

import { useEffect } from "react";
import AppMenu from "@/components/AppMenu";
import { getMenuOpen, setMenuOpen } from "@/lib/appMenuStore";
import { SITE_URL } from "@/lib/appConfig";

// শুধু অ্যাপ মোডে layout.js থেকে একবার বসে। কাজ:
// ১) স্ট্যাটাস বার সাদা  ২) Android back বাটন (মেনু খোলা থাকলে আগে মেনু বন্ধ)
// ৩) PDF লিংক ব্রাউজারে খোলা (WebView-তে PDF দেখা যায় না)  ৪) ☰ মেনুর ড্রয়ার
export default function AppBootstrap() {
  useEffect(() => {
    import("@capacitor/status-bar")
      .then(async ({ StatusBar, Style }) => {
        try {
          await StatusBar.setStyle({ style: Style.Light });
          await StatusBar.setBackgroundColor({ color: "#ffffff" });
        } catch (e) {
          /* ব্রাউজারে চালালে এই কলগুলো কাজ করে না — সমস্যা নেই */
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let handle = null;
    let cancelled = false;
    import("@capacitor/app")
      .then(async ({ App }) => {
        const h = await App.addListener("backButton", ({ canGoBack }) => {
          if (getMenuOpen()) {
            setMenuOpen(false);
            return;
          }
          if (canGoBack) window.history.back();
          else App.exitApp();
        });
        if (cancelled) h.remove();
        else handle = h;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (handle) handle.remove();
    };
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (/\.pdf($|[?#])/i.test(href) && !/^https?:/i.test(href)) {
        e.preventDefault();
        window.open(`${SITE_URL}${href.startsWith("/") ? "" : "/"}${href}`, "_blank");
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return <AppMenu />;
}
