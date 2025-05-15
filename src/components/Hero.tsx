
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  return (
    <div>
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Video background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/lovable-uploads/sport-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
        </div>

        <div className="container mx-auto px-4 text-center z-20 relative">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/oktatoink"
              className="bg-white text-red-600 px-5 py-2 rounded-md font-medium hover:bg-red-100 transition-colors"
            >
              🏀 Jelentkezz! ⚽
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
