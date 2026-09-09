export default function Herosection() {
  return (
    <section className="relative h-screen">
      {/* <img
        src="public/images/Gemini_Generated_Image_.png"
        alt="hero"
        className="absolute h-full w-full   object-cover"
      /> */}
      <video
        src="/videos/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute h-full w-full object-cover"
      />
    </section>
  );
}
