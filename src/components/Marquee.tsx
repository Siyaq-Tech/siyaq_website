import React from 'react';

interface MarqueeProps {
  /** dark = black bg white text | light = white bg black text */
  variant?: 'dark' | 'light';
}

/* ── Items ─────────────────────────────────────────────────────── */
const itemsRow1 = [
  'Web Development', '★', 'Mobile Apps', '◆', 'UI / UX Design',
  '●', 'AI Solutions', '★', 'Backend Systems', '◆', 'Cloud Infrastructure',
  '●', 'Digital Marketing', '★', 'E-Commerce', '◆', 'SEO & Analytics',
];

const itemsRow2 = [
  'Next.js', '◇', 'React Native', '▸', 'Node.js', '◇',
  'Python', '▸', 'PostgreSQL', '◇', 'AWS', '▸',
  'TypeScript', '◇', 'Docker', '▸', 'GraphQL', '◇', 'Redis',
];

/* ── Marquee row ─────────────────────────────────────────────── */
const MarqueeRow: React.FC<{
  items: string[];
  reverse?: boolean;
  dark?: boolean;
}> = ({ items, reverse = false, dark = false }) => {
  /* Duplicate so the loop is seamless */
  const doubled = [...items, ...items];

  const itemColor = dark
    ? 'text-white/80 hover:text-white'
    : 'text-black/70 hover:text-black';
  const dotColor = dark ? 'text-white/30' : 'text-black/25';

  return (
    <div className="overflow-hidden w-full">
      <div className={reverse ? 'marquee-track-reverse' : 'marquee-track'}>
        {doubled.map((item, i) => {
          const isSymbol = /[★◆●◇▸]/.test(item);
          return (
            <span
              key={i}
              className={
                isSymbol
                  ? `mx-4 text-sm ${dotColor} select-none`
                  : `mx-6 text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-default ${itemColor}`
              }
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/* ── Main component ──────────────────────────────────────────── */
const Marquee: React.FC<MarqueeProps> = ({ variant = 'dark' }) => {
  const dark = variant === 'dark';

  return (
    <div
      className={`relative py-6 overflow-hidden ${
        dark ? 'bg-black' : 'bg-white border-y border-gray-100'
      }`}
    >
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{
          background: dark
            ? 'linear-gradient(to right, #000 0%, transparent 100%)'
            : 'linear-gradient(to right, #fff 0%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{
          background: dark
            ? 'linear-gradient(to left, #000 0%, transparent 100%)'
            : 'linear-gradient(to left, #fff 0%, transparent 100%)',
        }}
      />

      <div className="flex flex-col gap-3">
        <MarqueeRow items={itemsRow1} dark={dark} />
        <MarqueeRow items={itemsRow2} reverse dark={dark} />
      </div>
    </div>
  );
};

export default Marquee;
