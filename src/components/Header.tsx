
import { useState } from "react";
import { Activity, Calendar, User, Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  scrollToSection: (id: string) => void;
}

const Header = ({ scrollToSection }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-red-700/90 backdrop-blur-sm py-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {isMobile ? (
          <>
            <div className="text-white font-bold">SportCentrum</div>
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
                <Button 
                  onClick={() => handleNavClick('activities')} 
                  variant="ghost" 
                  className="text-white hover:bg-red-500/50 w-full justify-start px-4 py-3"
                >
                  <Activity size={16} className="mr-2" /> Tevékenységeink
                </Button>
                <Button 
                  onClick={() => handleNavClick('events')} 
                  variant="ghost" 
                  className="text-white hover:bg-red-500/50 w-full justify-start px-4 py-3"
                >
                  <Calendar size={16} className="mr-2" /> Események
                </Button>
                <Button 
                  onClick={() => handleNavClick('teachers')} 
                  variant="ghost" 
                  className="text-white hover:bg-red-500/50 w-full justify-start px-4 py-3"
                >
                  <User size={16} className="mr-2" /> Oktatók
                </Button>
                <Button 
                  onClick={() => handleNavClick('contact')} 
                  variant="ghost" 
                  className="text-white hover:bg-red-500/50 w-full justify-start px-4 py-3"
                >
                  <Phone size={16} className="mr-2" /> Kapcsolat
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center w-full">
            <div className="flex gap-4">
              <Button 
                onClick={() => scrollToSection('activities')} 
                variant="ghost" 
                className="text-white hover:bg-red-500/50"
                size="sm"
              >
                <Activity size={16} className="mr-1" /> Tevékenységeink
              </Button>
              <Button 
                onClick={() => scrollToSection('events')} 
                variant="ghost" 
                className="text-white hover:bg-red-500/50"
                size="sm"
              >
                <Calendar size={16} className="mr-1" /> Események
              </Button>
              <Button 
                onClick={() => scrollToSection('teachers')} 
                variant="ghost" 
                className="text-white hover:bg-red-500/50"
                size="sm"
              >
                <User size={16} className="mr-1" /> Oktatók
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')} 
                variant="ghost" 
                className="text-white hover:bg-red-500/50"
                size="sm"
              >
                <Phone size={16} className="mr-1" /> Kapcsolat
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
