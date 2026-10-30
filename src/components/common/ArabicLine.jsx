import './ArabicLine.css';

/** Thin gold line-art flourish used to frame a sentence (no emoji). */
function Flourish({ end = false }) {
  return (
    <svg
      className={`arabic-line__ornament${end ? ' arabic-line__ornament--end' : ''}`}
      viewBox="0 0 48 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 8h22" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M24 8c4-6 11-6 13-1 1 3-2 5-4 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M24 8c4 6 11 6 13 1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M41 8l3-3 3 3-3 3z" fill="currentColor" />
    </svg>
  );
}

/** A romantic Arabic line in Aref Ruqaa, always right-to-left, framed by gold flourishes. */
export default function ArabicLine({ children, className = '', as: Tag = 'p' }) {
  return (
    <Tag className={`arabic-line ${className}`}>
      <Flourish />
      <span className="arabic-line__text" lang="ar" dir="rtl">
        {children}
      </span>
      <Flourish end />
    </Tag>
  );
}
