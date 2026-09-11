import Link from "next/link";
import { notFound } from "next/navigation";
import { universities } from "@/data/universities";
import { updates } from "@/data/updates";
import UniversitySidebar from "@/components/UniversitySidebar";
import EligibilityCalculator from "@/components/EligibilityCalculator";

export function generateStaticParams() {
  return Object.keys(universities).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const uni = universities[params.slug];
  if (!uni) return {};
  const examDate = updates.find((u) => u.universityId === params.slug);
  const title = `${uni.name} Eligibility Checker — ভর্তি যোগ্যতা, Requirements ও Exam Date 2026`;
  const description = `${uni.fullName || uni.name}-এর admission requirements, আসনসংখ্যা (${uni.seats || ""})${
    examDate ? `, ২০২৬-২৭ সেশনের ভর্তি পরীক্ষার তারিখ` : ""
  } এবং তোমার SSC-HSC GPA দিয়ে ${uni.name} এ চান্স হবে কিনা তা যাচাই করো — ${uni.name} eligibility checker।`;
  const url = `/university/${params.slug}`;
  return {
    title,
    description,
    keywords: [
      `${uni.name} eligibility checker`,
      `${uni.name} admission requirement`,
      `${uni.name} requirement 2026`,
      `${uni.name} ভর্তি যোগ্যতা`,
      `${uni.name} admission exam date 2026`,
      `${uni.name} exam date 2026`,
      `${uni.name} circular ${uni.circularYear || "2026"}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: uni.photo ? [{ url: uni.photo }] : undefined,
    },
  };
}

function Photo({ uni }) {
  if (!uni.photo) {
    return (
      <div className="uni-hero-badge" style={{ background: uni.color }}>
        {uni.name}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="uni-hero-photo" src={uni.photo} alt={`${uni.name} campus`} />
  );
}

function HeroGallery({ uni }) {
  const count = uni.galleryPhotos.length;
  return (
    <div
      className="uni-hero-gallery"
      style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
    >
      {uni.galleryPhotos.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={src} alt={`${uni.name} campus ${i + 1}`} />
      ))}
    </div>
  );
}

function HeroText({ uni }) {
  return (
    <div className="uni-hero-text">
      <h1>{uni.name}</h1>
      {uni.website ? (
        <a className="website" href={uni.website} target="_blank" rel="noopener noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.7 4 6.1 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6.1-4-9s1.5-6.3 4-9z" />
          </svg>
          {uni.website.replace("https://", "")}
        </a>
      ) : (
        <div style={{ color: "#777", fontSize: 14 }}>{uni.fullName || ""}</div>
      )}
    </div>
  );
}

export default function UniversityDetailPage({ params }) {
  const uni = universities[params.slug];
  if (!uni) notFound();

  const maxCount = uni.subjects ? Math.max(...uni.subjects.map((s) => s.count)) : 0;
  const examDate = updates.find((u) => u.universityId === params.slug);

  return (
    <div className="layout uni-detail">
      <UniversitySidebar activeId={params.slug} />

      <main className="content">
        <Link className="back-link" href="/">
          <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          হোমে ফিরে যান
        </Link>

        {uni.galleryPhotos && uni.galleryPhotos.length > 0 ? (
          <>
            <HeroGallery uni={uni} />
            <div className="uni-hero uni-hero-no-photo">
              <HeroText uni={uni} />
            </div>
          </>
        ) : (
          <div className="uni-hero">
            <Photo uni={uni} />
            <HeroText uni={uni} />
          </div>
        )}

        <div className="info-grid">
          <div className="info-card">
            <div className="label">মোট আসন</div>
            <div className="value">{uni.seats}</div>
          </div>
          <div className="info-card">
            <div className="label">পরীক্ষার সময়</div>
            <div className="value">{uni.examTime}</div>
          </div>
          <div className="info-card">
            <div className="label">পরীক্ষার ধরন</div>
            <div className="value">{uni.examType}</div>
          </div>
        </div>

        {uni.calcAllowed === false && (
          <div className="calc-note not-allowed">এই পরীক্ষায় ক্যালকুলেটর ব্যবহার করা যাবে না।</div>
        )}
        {uni.calcAllowed === true && (
          <div className="calc-note allowed">এই পরীক্ষায় ক্যালকুলেটর ব্যবহার করা যাবে।</div>
        )}

        {uni.subjects && (
          <>
            <section className="block">
              <h2>
                {uni.subjectsHeading || "বিষয়ভিত্তিক প্রশ্ন বণ্টন"}
                {uni.circularYear && (
                  <span className="circular-tag"> ({uni.circularYear} সালের সার্কুলার অনুযায়ী)</span>
                )}
              </h2>
              <div className="subject-bars">
                {uni.subjects.map((s) => (
                  <div className="subject-bar-row" key={s.name}>
                    <div className="name">{s.name}</div>
                    <div className="subject-bar-track">
                      <div
                        className="subject-bar-fill"
                        style={{
                          width: `${Math.round((s.count / maxCount) * 100)}%`,
                          background: uni.color,
                        }}
                      />
                    </div>
                    <div className="num">
                      {s.count} {s.unit || "টি"}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {uni.subjectsNote && <div className="placeholder-note">{uni.subjectsNote}</div>}
          </>
        )}

        {uni.memberUniversities && uni.memberUniversities.length > 0 && (
          <section className="block">
            <h2>অন্তর্ভুক্ত বিশ্ববিদ্যালয়সমূহ ({uni.memberUniversities.length}টি)</h2>
            <div className="member-uni-grid">
              {uni.memberUniversities.map((name) => (
                <div className="member-uni-chip" style={{ color: uni.color }} key={name}>
                  {name}
                </div>
              ))}
            </div>
          </section>
        )}

        {uni.resultFormula && (
          <section className="block">
            <h2>ফলাফল নির্ণয় পদ্ধতি</h2>
            <p>{uni.resultFormula}</p>
          </section>
        )}

        <section className="block">
          <h2>আবেদনের যোগ্যতা</h2>
          {uni.eligibilityText ? (
            <p>{uni.eligibilityText}</p>
          ) : (
            <div className="placeholder-note">
              এই ভার্সিটির বিস্তারিত যোগ্যতার তথ্য শীঘ্রই যুক্ত হবে। নিচের ক্যালকুলেটরে
              একটি আনুমানিক শর্ত দেওয়া আছে — আসল ভর্তি বিজ্ঞপ্তি দেখে নিশ্চিত হয়ে নাও।
            </div>
          )}
        </section>

        {examDate && (
          <section className="block">
            <h2>{uni.name} ভর্তি পরীক্ষার তারিখ (২০২৬-২৭ সেশন)</h2>
            <p>
              আবেদন শুরু: <strong>{examDate.applicationStart}</strong> — আবেদন শেষ:{" "}
              <strong>{examDate.applicationEnd}</strong>
            </p>
            <table className="exam-date-table">
              <thead>
                <tr>
                  <th>ইউনিট</th>
                  <th>পরীক্ষার তারিখ</th>
                </tr>
              </thead>
              <tbody>
                {examDate.schedule.map((row) => (
                  <tr key={row.unit}>
                    <td>{row.unit}</td>
                    <td>
                      {row.date}
                      {row.tentative ? " (সম্ভাব্য)" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link className="back-link" href="/updates">
              সব ভার্সিটির আপডেট দেখুন →
            </Link>
          </section>
        )}

        <EligibilityCalculator id={params.slug} uni={uni} />
      </main>
    </div>
  );
}
