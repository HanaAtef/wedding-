import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import WelcomeBox from './WelcomeBox';

export default function WelcomeSection() {
  const [show, setShow] = useState(true);
  const audioRef = useRef(null);

  const handleOpen = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      }
    } catch {
      // The click itself is a user gesture, so supported browsers should allow playback.
    }
    setShow(false);
  };

  return (
    <section className="absolute top-0 w-full z-20 h-screen flex justify-center items-center overflow-hidden ">
      <WelcomeBox
        isShow={show}
        exit={{ top: '-100%' }}
        initial={{ top: '-50%' }}
        className="w-[550px] h-[550px] absolute -top-1/2 rotate-45 left-1/2 -translate-x-1/2 "
      />
      <WelcomeBox
        isShow={show}
        exit={{ bottom: '-110%' }}
        initial={{ bottom: '-50%' }}
        className="w-[550px] h-[550px]  -bottom-1/2 rotate-45 left-1/2 -translate-x-1/2 "
      />
      <WelcomeBox
        exit={{ left: '-110%' }}
        initial={{ left: '-50%' }}
        isShow={show}
        className="w-[300px] h-[300px] top-1/2 rotate-45 -left-1/2 -translate-y-1/2"
      />
      <WelcomeBox
        isShow={show}
        initial={{ right: '-50%' }}
        exit={{ right: '-110%' }}
        className="w-[300px] h-[300px] top-1/2 rotate-45 -right-1/2 -translate-y-1/2"
      />

      <AnimatePresence>
        {show ? (
          <motion.img
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            onClick={handleOpen}
            transition={{ duration: 3, ease: 'easeInOut' }}
            src="/images/welcome.png"
            className="w-[200px] z-30"
            alt="welcome"
          />
        ) : null}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src="/audio/Elfastan_Elabyad.mp3"
        loop
        preload="auto"
      />
      </AnimatePresence>
    </section>
  );
}
