
import { Activity, Calendar, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  scrollToSection: (id: string) => void;
}

const Header = ({ scrollToSection }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-red-700/90 backdrop-blur-sm py-2 shadow-md">
      <div className="container mx-auto flex justify-center">
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
    </header>
  );
};

export default Header;
