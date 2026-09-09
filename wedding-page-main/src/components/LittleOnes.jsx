import { motion } from 'motion/react';

export default function LittleOnes() {
  return (
    <section className="relative px-5 py-10 text-center sm:px-8 sm:py-14">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="overflow-hidden rounded-[30px] border border-[#c9b896]/50 bg-[#fffaf5] p-2 shadow-sm"
        >
          <img
            src="/images/little-ones.jpg"
            alt="Little ones"
            className="h-auto w-full rounded-[24px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
