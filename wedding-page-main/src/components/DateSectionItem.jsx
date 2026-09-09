import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

export default function DateSectionItem({ value, label }) {
  const [isClicked, setIsClicked] = useState(true);
  return (
    <div className=" flex flex-col items-center gap-3">
      <div className="relative overflow-hidden aspect-[3/4] w-full max-w-[160px] overflow-hidden rounded-2xl border border-[color:var(--secondary)]/40 bg-[#f4e7db] shadow-sm">
        <AnimatePresence>
          {isClicked && (
            <motion.div
              exit={{ top: '-100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onClick={() => setIsClicked(false)}
              className="flex items-center justify-center font-bold text-xl absolute top-0 left-0 w-full h-full text-white bg-[#e4b58d] z-20   "
            >
              Click
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-semibold tracking-wide text-[color:var(--primary)]">
            {value}
          </span>
        </div>
      </div>
      <span className="text-xs font-medium tracking-[0.2em] text-[color:var(--secondary)]">
        {label}
      </span>
    </div>
  );
}
