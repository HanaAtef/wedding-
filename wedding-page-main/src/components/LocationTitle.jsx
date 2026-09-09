import { motion } from 'motion/react';
/**
 * FloralCorner
 * A small original decorative sprig (baby's-breath style cluster of
 * dots on thin branching stems) used in the top-right corner.
 * Pure SVG, no external assets.
 */
function FloralCorner({ className = '' }) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* stems */}
      <path
        d="M210 10 C190 40 175 55 150 75"
        stroke="#c9b896"
        strokeWidth="1.5"
      />
      <path
        d="M205 25 C180 45 165 65 140 95"
        stroke="#c9b896"
        strokeWidth="1.2"
      />
      <path
        d="M215 45 C195 60 180 80 165 110"
        stroke="#c9b896"
        strokeWidth="1.2"
      />
      <path
        d="M190 15 C175 35 160 45 135 60"
        stroke="#c9b896"
        strokeWidth="1"
      />

      {/* leaf accents */}
      <ellipse
        cx="168"
        cy="72"
        rx="7"
        ry="3"
        fill="#d7c9a3"
        transform="rotate(-35 168 72)"
      />
      <ellipse
        cx="150"
        cy="92"
        rx="6"
        ry="2.5"
        fill="#d7c9a3"
        transform="rotate(20 150 92)"
      />
      <ellipse
        cx="185"
        cy="55"
        rx="6"
        ry="2.5"
        fill="#d7c9a3"
        transform="rotate(-10 185 55)"
      />

      {/* baby's breath clusters */}
      {[
        [208, 8],
        [198, 18],
        [190, 30],
        [182, 12],
        [175, 42],
        [165, 55],
        [155, 70],
        [148, 85],
        [138, 60],
        [172, 22],
        [160, 35],
        [145, 45],
        [130, 58],
        [158, 12],
        [200, 45],
        [188, 60],
        [175, 75],
        [142, 95],
        [128, 72],
        [118, 55],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={2.5 + (i % 3)}
          fill="#faf6ee"
          stroke="#e7d9b8"
          strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}

/**
 * Ornament
 * The small fleuron used at the center of the divider line.
 */
function Ornament({ className = '' }) {
  return (
    <svg
      viewBox="0 0 40 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2 L20 22 M20 8 C14 8 12 4 12 2 M20 8 C26 8 28 4 28 2 M20 16 C14 16 12 20 12 22 M20 16 C26 16 28 20 28 22"
        stroke="#b89b6a"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="20" cy="12" r="1.6" fill="#b89b6a" />
    </svg>
  );
}

/**
 * LocationSection
 * Elegant invitation-style "Location" block: script heading, ornamental
 * divider, city name, and venue lines, with a floral cluster in the
 * top-right corner.
 *
 * Props:
 *  - city: string
 *  - venueLines: string[]  -> one or two lines describing the venue
 */
export default function LocationTitle({
  city = 'Zamalek, Cairo, Egypt',
  venueLines = ['Dar El Marasem Police Officers', 'Zamalek, Cairo'],
  scrollRef,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      viewport={{ root: scrollRef }}
      className="absolute top-0  px-10 py-16 text-center"
      style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
      `}</style>

      <FloralCorner className="pointer-events-none absolute -right-2 -top-2 h-40 w-40 opacity-90" />

      <h2
        className="mb-6 text-5xl text-[#a68a5b]"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        Location
      </h2>

      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px w-24 bg-[#c9b896]" />
        <Ornament className="h-4 w-8" />
        <span className="h-px w-24 bg-[#c9b896]" />
      </div>

      <p className="mb-1 text-2xl tracking-[0.25em] text-[#8a7350]">{city}</p>

      <div className="space-y-1 text-xl italic text-[#8a7350]">
        {venueLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </motion.section>
  );
}
