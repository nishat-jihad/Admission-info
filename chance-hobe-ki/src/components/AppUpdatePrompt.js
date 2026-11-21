"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { APP_VERSION } from "@/lib/appConfig";
import {
  fetchLatestRelease,
  getUpdateInfo,
  hideUpdate,
  installBundleUpdate,
  isSnoozed,
  showUpdate,
  snooze,
  subscribeUpdate,
} from "@/lib/appUpdate";

// অ্যাপ খুললে (২.৫ সেকেন্ড পর) নতুন ভার্সন দেখে; থাকলে পপ-আপ দেখায়।
// "আপডেট করো" চাপলে নতুন ভার্সন অ্যাপের ভেতরেই নামে ও চালু হয় (APK ইন্সটল লাগে না)।
// কোনো কারণে সেটা না হলে নতুন APK ডাউনলোডের লিংক দেখায়।
export default function AppUpdatePrompt() {
  const info = useSyncExternalStore(subscribeUpdate, getUpdateInfo, () => null);
  const [phase, setPhase] = useState("idle"); // idle | working | failed

  useEffect(() => {
    let cancelled = false;
    let timer = null;

    // "আবেদন শুরু হয়েছে" পপ-আপ (ApplyPopup) খোলা থাকলে তার সাথে একসাথে আসে না —
    // সেটা বন্ধ হওয়ার পরেই আপডেট পপ-আপ দেখায়।
    const isBusy = () => !!document.querySelector(".apply-popup-overlay");
    function showWhenFree(next) {
      if (cancelled) return;
      if (isBusy()) {
        timer = setTimeout(() => showWhenFree(next), 800);
        return;
      }
      showUpdate(next);
    }

    timer = setTimeout(async () => {
      const r = await fetchLatestRelease();
      if (!cancelled && r.status === "new" && !isSnoozed(r.info.version)) showWhenFree(r.info);
    }, 2500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
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
