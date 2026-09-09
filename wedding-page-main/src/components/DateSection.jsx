import React from 'react';
import DateSectionItem from './DateSectionItem';

export default function DateSection({ date }) {
  const d = date ? new Date(date) : new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-[color:var(--surface)] px-6 py-8">
      <h2 className="mb-6 flex items-center justify-center gap-2 text-center text-lg font-medium text-[color:var(--secondary)]">
        <span className="text-[color:var(--primary)]">✦</span>
        Scratch to reveal the date
        <span className="text-[color:var(--primary)]">✦</span>
      </h2>
      <div className="grid grid-cols-3 gap-3">
        <DateSectionItem value={day} label="DAY" />
        <DateSectionItem value={month} label="MONTH" />
        <DateSectionItem value={year} label="YEAR" />
      </div>
    </div>
  );
}
