const paths = {
  arrowRight: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6.6 3.5h-.9A2.7 2.7 0 0 0 3 6.2c0 8.1 6.7 14.8 14.8 14.8a2.7 2.7 0 0 0 2.7-2.7v-.9a1.8 1.8 0 0 0-1.3-1.7l-3-.9a1.8 1.8 0 0 0-1.8.5l-.9.9a12.4 12.4 0 0 1-5.4-5.4l.9-.9a1.8 1.8 0 0 0 .5-1.8l-.9-3A1.8 1.8 0 0 0 6.6 3.5Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.6L12 12.2 3.5 7.6 12 3Z" />
      <path d="m3.5 12.2 8.5 4.6 8.5-4.6" />
      <path d="m3.5 16.6 8.5 4.6 8.5-4.6" />
    </>
  ),
  clipboard: (
    <>
      <path d="M9 4.5H6.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-13a2 2 0 0 0-2-2H15" />
      <rect x="9" y="2.5" width="6" height="4" rx="1.4" />
      <path d="M8 12.5h8" />
      <path d="M8 16.5h5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3.5v17" />
      <path d="M5.5 7h13" />
      <path d="M5.5 7 2.5 14h6L5.5 7Z" />
      <path d="M18.5 7 15.5 14h6l-3-7Z" />
      <path d="M8.5 20.5h7" />
    </>
  ),
  tag: (
    <>
      <path d="M20.4 13.4 13.4 20.4a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8Z" />
      <circle cx="8" cy="8" r="1.3" />
    </>
  ),
  archive: (
    <>
      <rect x="3" y="4" width="18" height="4" rx="1.2" />
      <path d="M5 8v11a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19V8" />
      <path d="M10 12.5h4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 5.8v5.5c0 4.5 3 7.7 7 9.2 4-1.5 7-4.7 7-9.2V5.8L12 3Z" />
      <path d="m9 11.8 2.2 2.2 4-4.2" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
  ),
  quote: (
    <path d="M9.5 6C6.5 7.4 5 9.8 5 13v5h5v-6H7.6c0-2 .8-3.4 2.4-4.3L9.5 6Zm9 0C15.5 7.4 14 9.8 14 13v5h5v-6h-2.4c0-2 .8-3.4 2.4-4.3L18.5 6Z" />
  ),
  users: (
    <>
      <path d="M16 20v-1.4a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
      <circle cx="9.5" cy="8" r="3.4" />
      <path d="M16.8 4.8a3.4 3.4 0 0 1 0 6.4" />
      <path d="M21 20v-1.4a4 4 0 0 0-3-3.8" />
    </>
  ),
};

export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.5 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
