
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bike, Volleyball } from "lucide-react";

const Hero = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-[60vh] bg-red-600 text-white flex items-center justify-center overflow-hidden"
    >
      {/* Sports equipment pattern overlay - smaller size, less opacity */}
      <div className="absolute inset-0 -z-5">
        {/* Smaller sports equipment icons */}
        <div className="absolute top-[10%] left-[5%] opacity-10">
          <Bike className="w-8 h-8 text-white" />
        </div>
        <div className="absolute top-[70%] left-[20%] opacity-10">
          <Bike className="w-6 h-6 text-white" />
        </div>
        <div className="absolute top-[40%] right-[15%] opacity-10">
          <Bike className="w-10 h-10 text-white" />
        </div>
        
        {/* Volleyballs scattered around */}
        <div className="absolute top-[30%] left-[30%] opacity-10">
          <Volleyball className="w-7 h-7 text-white" />
        </div>
        <div className="absolute top-[60%] right-[30%] opacity-10">
          <Volleyball className="w-8 h-8 text-white" />
        </div>
        <div className="absolute top-[20%] right-[5%] opacity-10">
          <Volleyball className="w-5 h-5 text-white" />
        </div>
        
        {/* More bike icons */}
        <div className="absolute bottom-[10%] right-[10%] opacity-10">
          <Bike className="w-10 h-10 text-white" />
        </div>
        <div className="absolute top-[50%] left-[10%] opacity-10">
          <Bike className="w-8 h-8 text-white" />
        </div>
        <div className="absolute bottom-[20%] left-[40%] opacity-10">
          <Bike className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        <img 
          src="/lovable-uploads/9fc4733a-7118-4bc3-a0b0-3090405285e1.png" 
          alt="Ergo Sport Logó" 
          className="w-32 h-32 mx-auto mb-8"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Ergo Sport Klub</h1>
        <p className="text-xl md:text-2xl mb-8">Közösség · Mozgás · Játék</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/oktatoink" 
            className="bg-white text-red-600 px-6 py-3 rounded-md font-medium hover:bg-red-100 transition-colors"
          >
            Találkozz Oktatóinkkal
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-red-700/30 to-red-600/10 z-0"></div>
    </motion.section>
  );
};

export default Hero;
