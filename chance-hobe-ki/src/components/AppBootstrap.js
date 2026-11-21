"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppMenu from "@/components/AppMenu";
import NotificationPanel from "@/components/NotificationCenter";
import AppUpdatePrompt from "@/components/AppUpdatePrompt";
import { applyLatestNow, getUpdateInfo, hideUpdate, snooze } from "@/lib/appUpdate";
import { getMenuOpen, setMenuOpen } from "@/lib/appMenuStore";
import { addFromFirebase, getPanelOpen, setPanelOpen, syncNotificationFeed } from "@/lib/notificationStore";
import { SITE_URL } from "@/lib/appConfig";

// শুধু অ্যাপ মোডে layout.js থেকে একবার বসে। কাজ:
// ১) স্ট্যাটাস বার সাদা  ২) Android back বাটন (আপডেট পপ-আপ/মেনু খোলা থাকলে আগে সেটা বন্ধ)
// ৩) PDF লিংক ব্রাউজারে খোলা (WebView-তে PDF দেখা যায় না)  ৪) ☰ মেনুর ড্রয়ার  ৫) "নতুন আপডেট" পপ-আপ
// ৬) 🔔 নোটিফিকেশন তালিকা (শেষ ১৬টা) জমানো ও প্যানেল
export default function AppBootstrap() {
  const router = useRouter();

  // অ্যাপের ভেতরে আপডেট হওয়া নতুন ভার্সন ঠিকমতো খুলেছে — এটা জানিয়ে না দিলে প্লাগইন ১০ সেকেন্ড পর আগের ভার্সনে ফেরত যায়
  useEffect(() => {
    import("@capgo/capacitor-updater")
      .then(({ CapacitorUpdater }) => CapacitorUpdater.notifyAppReady())
      .catch(() => {});
  }, []);

  // নোটিফিকেশনে চাপ দিয়ে খোলার আগে অ্যাপ রিলোড হলে, যে পেজ খোলার কথা ছিল সেটা এখানে খোলে
  useEffect(() => {
    try {
      const u = localStorage.getItem("admissionInfoPendingNav");
      if (u) {
        localStorage.removeItem("admissionInfoPendingNav");
        if (u.startsWith("/")) router.push(u);
      }
    } catch (e) {
      /* সমস্যা নেই */
    }
  }, [router]);

  // পুশ নোটিফিকেশন (শুধু Firebase সেটআপ থাকলে — workflow তখন NEXT_PUBLIC_PUSH=1 বসায়)
  // সব ইউজার "all" নামের topic-এ জুড়ে যায়; workflow এই topic-এ নোটিফিকেশন পাঠায়।
  // নোটিফিকেশনে চাপলে: নতুন ভার্সন থাকলে সাথে সাথে নামিয়ে চালু হয়, তারপর (থাকলে) নির্দিষ্ট পেজ খোলে।
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PUSH !== "1") return undefined;
    let cancelled = false;
    const handles = [];
    import("@capacitor-firebase/messaging")
      .then(async ({ FirebaseMessaging }) => {
        let perm = await FirebaseMessaging.checkPermissions();
        if (perm.receive === "prompt" || perm.receive === "prompt-with-rationale") {
          perm = await FirebaseMessaging.requestPermissions();
        }
        if (cancelled) return;
        // অ্যাপ খোলা থাকা অবস্থায় নোটিফিকেশন এলে বেল-এর তালিকায় জমা হয়
        handles.push(
          await FirebaseMessaging.addListener("notificationReceived", (event) => {
            if (event && event.notification) addFromFirebase([event.notification]);
          })
        );
        handles.push(await FirebaseMessaging.addListener("notificationActionPerformed", async (event) => {
          if (event && event.notification) addFromFirebase([event.notification]);
          const data = (event && event.notification && event.notification.data) || {};
          const url = typeof data.url === "string" && data.url.startsWith("/") ? data.url : "";
          if (url) {
            try {
              localStorage.setItem("admissionInfoPendingNav", url);
            } catch (e) {
              /* সমস্যা নেই */
            }
          }
          const reloading = await applyLatestNow();
          if (!reloading) {
            try {
              localStorage.removeItem("admissionInfoPendingNav");
            } catch (e) {
              /* সমস্যা নেই */
            }
            if (url) router.push(url);
          }
        }));
        if (perm.receive === "granted") {
          await FirebaseMessaging.subscribeToTopic({ topic: "all" });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      handles.forEach((h) => h.remove());
    };
  }, [router]);

  // বেল-এর তালিকা মেলানো — অ্যাপ খুললে ও ব্যাকগ্রাউন্ড থেকে ফিরলে:
  // ১) repo-র notifications.json (অ্যাপ বন্ধ থাকলে মিস হওয়া নোটিফিকেশন)  ২) ফোনের ট্রেতে এখনো থাকা নোটিফিকেশন
  useEffect(() => {
    let cancelled = false;
    let handle = null;
    const sync = async () => {
      syncNotificationFeed();
      if (process.env.NEXT_PUBLIC_PUSH !== "1") return;
      try {
        const { FirebaseMessaging } = await import("@capacitor-firebase/messaging");
        const res = await FirebaseMessaging.getDeliveredNotifications();
        if (!cancelled) addFromFirebase(res.notifications);
      } catch (e) {
        /* সমস্যা নেই */
      }
    };
    sync();
    import("@capacitor/app")
      .then(async ({ App }) => {
        const h = await App.addListener("appStateChange", ({ isActive }) => {
          if (isActive) sync();
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
          if (getPanelOpen()) {
            setPanelOpen(false);
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
      <NotificationPanel />
      <AppUpdatePrompt />
    </>
  );
}
