"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { APP_VERSION } from "@/lib/appConfig";
import {
  autoUpdate,
  clearAutoTryIfDone,
  getUpdateInfo,
  hideUpdate,
  installBundleUpdate,
  snooze,
  subscribeUpdate,
} from "@/lib/appUpdate";

// অটো-আপডেট (ইউজারের কিছু চাপতে হয় না) — বিস্তারিত lib/appUpdate.js-এর autoUpdate-এ।
// এই কম্পোনেন্ট শুধু সেটা চালু করে, আর মেনুর "নতুন ভার্সন আছে কি না দেখো" বাটনে আসা পপ-আপ দেখায়।
export default function AppUpdatePrompt() {
  const info = useSyncExternalStore(subscribeUpdate, getUpdateInfo, () => null);
  const [phase, setPhase] = useState("idle"); // idle | working | failed
  const [errMsg, setErrMsg] = useState("");

  // অটো-আপডেট (পপ-আপ ছাড়া):
  //  • অ্যাপ খোলার ৩ সেকেন্ড পর নতুন ভার্সন থাকলে নামিয়ে সাথে সাথে চালু করে
  //  • ব্যাকগ্রাউন্ড থেকে ফিরলে (৩০ মিনিটে একবার) চুপচাপ নামিয়ে রাখে, অ্যাপ ছাড়লে চালু হয়
  useEffect(() => {
    let cancelled = false;
    let handle = null;
    clearAutoTryIfDone();
    const timer = setTimeout(() => {
      if (!cancelled) autoUpdate("launch");
    }, 3000);
    import("@capacitor/app")
      .then(async ({ App }) => {
        const h = await App.addListener("appStateChange", ({ isActive }) => {
          if (isActive && !cancelled) autoUpdate("resume");
        });
        if (cancelled) h.remove();
        else handle = h;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (handle) handle.remove();
    };
  }, []);

  useEffect(() => {
    if (!info) setPhase("idle");
  }, [info]);

  if (!info) return null;

  const canInstallInApp = Boolean(info.bundleUrl);
  const showApkLink = !canInstallInApp || phase === "failed";

  function later() {
    snooze(info.version);
    hideUpdate();
  }

  async function startUpdate() {
    setPhase("working");
    try {
      await installBundleUpdate(info);
      // সফল হলে অ্যাপ নিজে নতুন করে লোড হয়ে যায়
    } catch (e) {
      setErrMsg(String((e && e.message) || e || "").slice(0, 160));
      setPhase("failed");
    }
  }

  return (
    <div className="app-update-overlay" role="dialog" aria-modal="true" aria-labelledby="app-update-title">
      <div className="app-update">
        <h2 className="app-update-title" id="app-update-title">
          নতুন আপডেট এসেছে
        </h2>
        <p className="app-update-ver">
          ভার্সন {APP_VERSION} → <strong>{info.version}</strong>
        </p>
        {info.notes && <p className="app-update-notes">{info.notes}</p>}
        {phase === "working" && <p className="app-update-hint">আপডেট নামছে… একটু অপেক্ষা করো। শেষ হলে অ্যাপ নিজে নতুন করে খুলবে।</p>}
        {phase === "failed" && (
          <p className="app-update-hint">
            অ্যাপের ভেতরে আপডেট হলো না। নিচের বাটনে নতুন APK নামিয়ে ইন্সটল করো।
            {errMsg && <><br /><small>কারণ: {errMsg}</small></>}
          </p>
        )}
        <div className="app-update-actions">
          <button type="button" className="app-update-later" onClick={phase === "failed" ? hideUpdate : later} disabled={phase === "working"}>
            {phase === "failed" ? "বন্ধ করো" : "পরে"}
          </button>
          {showApkLink ? (
            <a className="app-update-go" href={info.apkUrl} target="_blank" rel="noopener noreferrer">
              APK ডাউনলোড
            </a>
          ) : (
            <button type="button" className="app-update-go" onClick={startUpdate} disabled={phase === "working"}>
              {phase === "working" ? "নামছে…" : "আপডেট করো"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
