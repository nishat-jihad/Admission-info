"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { diagClear, diagText, getDiagPanelOpen, setDiagPanelOpen, subscribeDiagPanel } from "@/lib/diag";

// মেনু → "আপডেট লগ দেখো": অ্যাপ-আপডেটের ধাপে ধাপে লগ। লেখাটা চেপে ধরে সিলেক্ট করা যায়, বা "কপি" বাটন।
export default function DiagPanel() {
  const open = useSyncExternalStore(subscribeDiagPanel, getDiagPanelOpen, () => false);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setText(diagText());
      setCopied(false);
    }
  }, [open]);

  if (!open) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (e) {
      setCopied(false);
    }
  }

  return (
    <div className="app-update-overlay" role="dialog" aria-modal="true" aria-label="আপডেট লগ">
      <div className="app-update" style={{ maxWidth: 560, width: "92%" }}>
        <h2 className="app-update-title">আপডেট লগ</h2>
        <textarea
          readOnly
          value={text || "(এখনো কোনো লগ নেই)"}
          style={{ width: "100%", height: 280, fontSize: 11, fontFamily: "monospace", lineHeight: 1.4, padding: 8, boxSizing: "border-box" }}
        />
        {copied && <p className="app-update-hint">কপি হয়েছে।</p>}
        <div className="app-update-actions">
          <button
            type="button"
            className="app-update-later"
            onClick={() => {
              diagClear();
              setText("");
            }}
          >
            মুছো
          </button>
          <button type="button" className="app-update-later" onClick={() => setDiagPanelOpen(false)}>
            বন্ধ করো
          </button>
          <button type="button" className="app-update-go" onClick={copy}>
            কপি
          </button>
        </div>
      </div>
    </div>
  );
}
