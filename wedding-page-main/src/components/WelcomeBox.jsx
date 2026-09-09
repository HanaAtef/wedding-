import { AnimatePresence, motion } from 'motion/react';

export default function WelcomeBox({ className, isShow, exit, initial = {} }) {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ opacity: 1, scale: 1, ...initial }}
          transition={{ duration: 3, ease: 'linear' }}
          exit={exit}
          className={`bg-[url('/images/flowers.png')] bg-cover bg-center   rounded-2xl  absolute  ${className}`}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}
