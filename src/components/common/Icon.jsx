/** Thin gold line icons. */
const PATHS = {
  pin: (
    <>
      <path d="M24 43s-13-12.2-13-23a13 13 0 0 1 26 0c0 10.8-13 23-13 23Z" />
      <circle cx="24" cy="20" r="4.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="7" y="10" width="34" height="31" rx="3" />
      <path d="M7 18h34M16 6v8M32 6v8M15 25h2m6 0h2m6 0h2M15 33h2m6 0h2m6 0h2" />
    </>
  ),
  clock: (
    <>
      <circle cx="24" cy="27" r="16" />
      <path d="M24 18v9l6 4M20 5h8M24 5v6M37 12l3-3" />
    </>
  ),
  note: <path d="M18 36V10l22-4v26M18 36a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm22-4a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />,
  share: <path d="M24 6v24M15 15l9-9 9 9M10 26v12a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V26" />,
  download: <path d="M24 6v24m-9-9 9 9 9-9M10 40h28" />,
  heart: <path d="M24 40S7 30 7 18a9 9 0 0 1 17-4 9 9 0 0 1 17 4c0 12-17 22-17 22Z" />,
  close: <path d="M12 12l24 24M36 12 12 36" />,
  play: <path d="M16 10v28l22-14z" fill="currentColor" />,
  pause: <path d="M15 10h6v28h-6zM27 10h6v28h-6z" fill="currentColor" />,
  sprig: (
    <path d="M24 46V8m0 6c-4.8-.4-7.6-3-8-7.6 4.8.2 7.6 2.8 8 7.6Zm0 0c4.8-.4 7.6-3 8-7.6-4.8.2-7.6 2.8-8 7.6Zm0 12c-5.2-.4-8.4-3.4-8.8-8.4 5.2.4 8.4 3.2 8.8 8.4Zm0 0c5.2-.4 8.4-3.4 8.8-8.4-5.2.4-8.4 3.2-8.8 8.4Zm0 12c-5.6-.4-9-3.6-9.6-9 5.6.4 9 3.6 9.6 9Zm0 0c5.6-.4 9-3.6 9.6-9-5.6.4-9 3.6-9.6 9Z" />
  ),
};

export default function Icon({ name, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
