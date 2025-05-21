import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-[10rem] font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4 pb-4">Hoppá, ez az oldal nem található!</p>
        <a href="/" className="text-white bg-gradient-to-r from-amber-500 to-pink-500 rounded-[4rem] p-4">
          Vissza a főoldalra!
        </a>
      </div>
    </div>
  );
};

export default NotFound;
