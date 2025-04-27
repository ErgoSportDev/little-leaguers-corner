
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
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <span>info@ergosportclub.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>123 Sports Lane, Fitness City</span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Hours of Operation */}
        <div>
          <h3 className="text-xl font-bold mb-4">Hours</h3>
          <div className="space-y-2">
            <p>Monday - Friday: 3 PM - 8 PM</p>
            <p>Saturday: 9 AM - 2 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-4 border-t border-white/20">
        <p>&copy; 2025 Ergo Sport Club. All Rights Reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
