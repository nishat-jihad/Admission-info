"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppMenu from "@/components/AppMenu";
import AppUpdatePrompt from "@/components/AppUpdatePrompt";
import { getUpdateInfo, hideUpdate, snooze } from "@/lib/appUpdate";
import { getMenuOpen, setMenuOpen } from "@/lib/appMenuStore";
import { SITE_URL } from "@/lib/appConfig";

// শুধু অ্যাপ মোডে layout.js থেকে একবার বসে। কাজ:
// ১) স্ট্যাটাস বার সাদা  ২) Android back বাটন (আপডেট পপ-আপ/মেনু খোলা থাকলে আগে সেটা বন্ধ)
// ৩) PDF লিংক ব্রাউজারে খোলা (WebView-তে PDF দেখা যায় না)  ৪) ☰ মেনুর ড্রয়ার  ৫) "নতুন আপডেট" পপ-আপ
export default function AppBootstrap() {
  const router = useRouter();

  // অ্যাপের ভেতরে আপডেট হওয়া নতুন ভার্সন ঠিকমতো খুলেছে — এটা জানিয়ে না দিলে প্লাগইন ১০ সেকেন্ড পর আগের ভার্সনে ফেরত যায়
  useEffect(() => {
    import("@capgo/capacitor-updater")
      .then(({ CapacitorUpdater }) => CapacitorUpdater.notifyAppReady())
      .catch(() => {});
  }, []);

  // পুশ নোটিফিকেশন (শুধু Firebase সেটআপ থাকলে — workflow তখন NEXT_PUBLIC_PUSH=1 বসায়)
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PUSH !== "1") return undefined;
    let cancelled = false;
    let handle = null;
    import("@capacitor/push-notifications")
      .then(async ({ PushNotifications }) => {
        let perm = await PushNotifications.checkPermissions();
        if (perm.receive === "prompt") perm = await PushNotifications.requestPermissions();
        if (perm.receive !== "granted" || cancelled) return;
        handle = await PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
          const url = action && action.notification && action.notification.data && action.notification.data.url;
          if (typeof url === "string" && url.startsWith("/")) router.push(url);
        });
        await PushNotifications.register();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (handle) handle.remove();
    };
  }, [router]);
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
          const upd = getUpdateInfo();
          if (upd) {
            snooze(upd.version);
            hideUpdate();
            return;
          }
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

  return (
    <>
      <AppMenu />
      <AppUpdatePrompt />
    </>
  );
}
