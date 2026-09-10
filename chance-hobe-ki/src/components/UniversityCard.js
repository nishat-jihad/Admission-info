"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.3">
    <path
      d="M3 21h18M4 21V9l8-6 8 6v12M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function UniversityCard({ id, uni }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = uni.photo && !imgFailed;

  return (
    <article className="uni-card">
      <div
        className="uni-photo"
        style={{
          background: `linear-gradient(135deg, ${uni.color}, #101010)`,
        }}
      >
        {showPhoto ? (
          <Image
            src={uni.photo}
            alt={`${uni.name} campus`}
            fill
            sizes="(max-width: 640px) 100vw, 340px"
            onError={() => setImgFailed(true)}
          />
        ) : (
          FALLBACK_ICON
        )}
      </div>
      <div className="uni-name-badge">{uni.name}</div>
      <ul className="uni-reqs">
        <li>মোট আসন {uni.seats}</li>
        <li>পরীক্ষার সময় {uni.examTime}</li>
        <li>{uni.examType}</li>
      </ul>
      <div className="uni-actions">
        <Link href={`/university/${id}`} className="btn-details">
          বিস্তারিত দেখুন
        </Link>
      </div>
    </article>
  );
}
