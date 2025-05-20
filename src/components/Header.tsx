
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Activity, Calendar, User, Phone, Menu, Newspaper, Pencil, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useAnimation } from "framer-motion";
import { useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  scrollToSection: (id: string) => void;
}

const Header = ({ scrollToSection }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        // Wait briefly for DOM to render
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 2800));

      await controls.start({
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
        }
      });
    };

    sequence();
  }, [controls]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-red-700/90 backdrop-blur-sm py-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {isMobile ? (
          <>
            <Link to="/">
              <div className="bg-gradient-to-b from-[#ff0000] to-[#b91c1ce6] p-2 rounded-full">
                <motion.img
                  src="/lovable-uploads/logo.png"
                  className="w-[2rem] h-[2rem] rounded-[2rem]"
                  alt="Ergo Sport Logo"
                  initial={{ opacity: 1, scale: 0, y: -100, }}
                  animate={controls}
                />
              </div>
            </Link>
            <div className="text-white font-bold text-[1.3rem]">Ergo Sport</div>
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-red-500/50"
            >
              <Menu />
            </Button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-red-700/95 backdrop-blur-sm py-2 shadow-md flex flex-col items-center">
                <Link
                  to="/"
                  state={{ scrollTo: 'activities', behavior: 'smooth' }}
                  className="text-white hover:bg-red-500/50 w-full justify-start">
                  <Button
                    variant="ghost"
                    onClick={toggleMenu}
                  >
                    <Activity size={16} className="mr-2" /> Aktuális
                  </Button>
                </Link>
                <Link
                  to="/"
                  state={{ scrollTo: 'events', behavior: 'smooth' }}
                  className="text-white hover:bg-red-500/50 w-full justify-start">
                  <Button
                    variant="ghost"
                    onClick={toggleMenu}
                  >
                    <Calendar size={16} className="mr-2" /> Események
                  </Button>
                </Link>
                <Link
                  to="/"
                  state={{ scrollTo: 'teachers', behavior: 'smooth' }}
                  className="text-white hover:bg-red-500/50 w-full justify-start">
                  <Button
                    variant="ghost"
                    onClick={toggleMenu}
                  >
                    <User size={16} className="mr-2" /> Csapatunk
                  </Button>
                </Link>
                <Button
                  onClick={() => { toggleMenu(); scrollToSection('contact'); }}
                  variant="ghost"
                  className="text-white hover:bg-red-500/50 w-full justify-start px-4 py-3"
                >
                  <Phone size={16} className="mr-2" /> Kapcsolatt
                </Button>
                <Link to="/hirek" className="text-white hover:bg-red-500/50 w-full justify-start">
                  <Button
                    variant="ghost"
                    onClick={toggleMenu}
                  >
                    <Newspaper size={16} className="mr-2" /> Hírek
                  </Button>
                </Link>
                <Link to="/beszamolok" className="text-white hover:bg-red-500/50 w-full justify-start">
                  <Button
                    variant="ghost"
                    onClick={toggleMenu}
                  >
                    <ClipboardList size={16} className="mr-2" /> Beszámolók
                  </Button>
                </Link>
                <Link to="/blog" className="text-white hover:bg-red-500/50 w-full justify-start">
                  <Button
                    variant="ghost"
                    onClick={toggleMenu}
                  >
                    <Pencil size={16} className="mr-2" /> Blog
                  </Button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center w-full">
            <Link to="/">
              <div className="bg-gradient-to-b from-[#ff0000] to-[#b91c1ce6] p-2 rounded-full">
                <motion.img
                  src="/lovable-uploads/logo.png"
                  className="w-[1.6rem] h-[1.6rem] rounded-[1rem]"
                  alt="Ergo Sport Logo"
                  initial={{ opacity: 1, scale: 0, y: -100, }}
                  animate={controls}
                />
              </div>
            </Link>
            <div className="flex gap-4">
              <Link
                to="/"
                state={{ scrollTo: 'activities', behavior: 'smooth' }}>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-red-500/50"
                  size="sm"
                >
                  <Activity size={16} className="mr-1" /> Aktuális
                </Button>
              </Link>
              <Link
                to="/"
                state={{ scrollTo: 'events', behavior: 'smooth' }}>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-red-500/50"
                  size="sm"
                >
                  <Calendar size={16} className="mr-1" /> Eseményekk
                </Button>
              </Link>
              <Link
                to="/"
                state={{ scrollTo: 'teachers', behavior: 'smooth' }}>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-red-500/50"
                  size="sm"
                >
                  <User size={16} className="mr-1" /> Csapatunk
                </Button>
              </Link>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="ghost"
                className="text-white hover:bg-red-500/50"
                size="sm"
              >
                <Phone size={16} className="mr-1" /> Kapcsolat
              </Button>
              <Link to="/hirek">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-red-500/50"
                  size="sm"
                >
                  <Newspaper size={16} className="mr-1" /> Hírek
                </Button>
              </Link>
              <Link to="/beszamolok">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-red-500/50"
                  size="sm"
                >
                  <ClipboardList size={16} className="mr-1" /> Beszámolók
                </Button>
              </Link>
              <Link to="/blog">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-red-500/50"
                  size="sm"
                >
                  <Pencil size={16} className="mr-1" /> Blog
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
