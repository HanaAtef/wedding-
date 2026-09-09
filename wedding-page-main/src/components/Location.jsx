import { useRef } from 'react';
import LocationTitle from './LocationTitle';
import { motion } from 'motion/react';

export default function Location() {
  const scrollRef = useRef(null);

  return (
    <section ref={scrollRef} className="pb-4">
      <div className="relative flex h-[480px] w-full items-center justify-center">
        <LocationTitle />
        <motion.img
          scrollRef={scrollRef}
          viewport={{ root: scrollRef }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
          initial={{ opacity: 0, translateY: 40 }}
          src="/images/location_without_background.png"
          alt="location"
          className="h-auto w-full object-cover"
        />
      </div>
      <section className="w-full max-w-7xl px-8">
        <iframe
          className="h-[300px] w-full rounded-lg border-2 border-[#a68a5b] md:h-[600px]"
          src="https://www.google.com/maps?q=26WC%2BQV2%2C%20Zamalek%2C%20Giza%2C%20Egypt&output=embed"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Dar El Marasem Police Officers - Zamalek"
        ></iframe>
      </section>
    </section>
  );
}
