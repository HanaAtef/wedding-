import { useEffect, useState } from 'react';

const targetTime = new Date('2026-09-17T20:00:00');

function getRemaining() {
  const difference = Math.max(0, targetTime.getTime() - Date.now());
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    finished: difference === 0,
  };
}

function TimeBox({ value, label }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center rounded-2xl border border-[#c9b896]/50 bg-[#fffaf5]/80 px-2 py-4 shadow-sm backdrop-blur-sm">
      <span className="text-2xl font-semibold tracking-wide text-[#8a7350] sm:text-4xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[9px] font-medium tracking-[0.18em] text-[#a68a5b] sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden px-5 py-16 text-center">
      <div className="mx-auto w-full max-w-2xl rounded-[30px] border border-[#c9b896]/40 bg-[#f9efe7] px-5 py-9 shadow-sm sm:px-10">
        <p className="mb-2 text-xs font-medium tracking-[0.35em] text-[#a68a5b]">THE BIG DAY</p>
        <h2
          className="text-4xl text-[#8a7350] sm:text-5xl"
          style={{ fontFamily: "'Great Vibes', 'Cormorant Garamond', serif" }}
        >
          Counting down to our wedding
        </h2>
        <div className="mx-auto my-5 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-[#c9b896]" />
          <span className="text-[#a68a5b]">✦</span>
          <span className="h-px w-16 bg-[#c9b896]" />
        </div>

        {remaining.finished ? (
          <p className="py-5 text-2xl text-[#8a7350]">Today is the day! 🤍</p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <TimeBox value={remaining.days} label="DAYS" />
            <TimeBox value={remaining.hours} label="HOURS" />
            <TimeBox value={remaining.minutes} label="MINUTES" />
            <TimeBox value={remaining.seconds} label="SECONDS" />
          </div>
        )}

        <p className="mt-5 text-sm tracking-[0.12em] text-[#a68a5b]">17 • 09 • 2026 — 8:00 PM</p>
      </div>
    </section>
  );
}
