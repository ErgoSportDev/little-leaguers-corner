
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-red-600 text-white py-12 px-4"
    >
      <div id="contact" className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-bold mb-4">Kapcsolat</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <span>ergosportinfo@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <span>+36 30 350 3854</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>123 Sport utca, Fitnesz Város</span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Kövess Minket</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/rgosport" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
              <Instagram className="h-6 w-6" />
            </a> */}
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-4 border-t border-white/20">
        <p>&copy; 2025 Ergo Sport. Minden jog fenntartva.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
