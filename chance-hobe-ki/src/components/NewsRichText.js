import Link from "next/link";

// newsContent.js-এর লেখার ভেতরের ছোট markup রেন্ডার করে:
//   [দেখানো লেখা](/exam-dates)      -> সাইটের ভেতরের লিংক (বা https:// হলে বাইরের লিংক)
//   **বোল্ড লেখা**                   -> <strong>
const TOKEN_RE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export default function NewsRichText({ text }) {
  const parts = [];
  let last = 0;
  let key = 0;
  let match;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));

    if (match[1]) {
      const label = match[1];
      const href = match[2];
      if (href.startsWith("/")) {
        parts.push(
          <Link key={key++} href={href} className="news-inline-link">
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="news-inline-link"
          >
            {label}
          </a>
        );
      }
    } else {
      parts.push(<strong key={key++}>{match[3]}</strong>);
    }
    last = TOKEN_RE.lastIndex;
  }

  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
