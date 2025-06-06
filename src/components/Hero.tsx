
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const Hero = () => {
  const controls = useAnimation();
  const [showLogo, setShowLogo] = useState(true)

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.3 }
        }
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      await controls.start({
        y: -1000,
        scale: 0.5,
        transition: {
          duration: 0.5,
        }
      });
      setShowLogo(false);
    };

    sequence();
  }, [controls]);

  return (
    <div>
      <div className="relative h-[100vh] flex items-end justify-center overflow-hidden pt-16 test2">
        {/* Video background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-label="Kids Playing"
          >
          {/* <source src="https://ik.imagekit.io/xtw0vnarh/ergovid.mp4?updatedAt=1748005679189" type="video/mp4" /> */}
          <source src="/lovable-uploads/ergovid.mp4" type="video/mp4" />
            <img src="/lovable-uploads/logo.png" title="Your browser does not support the <video> tag"></img>
          </video>
          {/* Overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
        </div>

        <div className="grid grid-cols-1">
          <div className="relative z-10">
            {showLogo && (
              <motion.img
                src="/lovable-uploads/logo.png"
                alt="Ergo Sport Logo"
                initial={{ opacity: 1, scale: 0, y: 0, }}
                animate={controls}
                className="w-[15rem] h-auto m-auto rounded-[1rem]"
              />
            )}
          </div>
          <div className="pt-[10vh] min-w-[10rem]">
            <h1 className="relative text-center text-[2rem] text-white font-[800]">
              KÖZÖSSÉG • MOZGÁS • JÁTÉK
            </h1>
          </div>
          <div className="min-w-[10rem] max-w-[50rem]">
            <p className="relative text-center text-white">
              Az Ergo Sport közösség teret ad, hogy játékosan fedezd fel Önmagad
            </p>
          </div>
          <div className="container mx-auto px-4 text-center z-20 relative pb-[14vh] pt-[3vh]">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/jelentkezes"
                className="drop-shadow-md hover:drop-shadow-xl bg-red-600 text-white p-5 py-2 rounded-[2rem] text-[2rem] font-[700] hover:bg-red-500 transition-colors"
              >
                <span className="m-10">JELENTKEZZ</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Hero;
