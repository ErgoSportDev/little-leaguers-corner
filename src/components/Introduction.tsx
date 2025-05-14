
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Introduction = () => {
  const teachers = [
    {
      name: "Tóth Regina",
      role: "Ergo Sport szakmai vezető",
      //description: "Ergo Sport szakmai vezető, Tóth Regina",
      image: "/lovable-uploads/Regi.png"
    },
    {
      name: "Horváth Luca",
      role: "Ergo Sport szakág vezető",
      //description: "Ergo Sport szakág vezető, Horváth Luca",
      image: "/lovable-uploads/Luca.jpg"
    },
    {
      name: "Ferbert Csenge",
      role: "Ergo Sport szakág vezető",
      //description: "Ergo Sport szakág vezető, Ferbert Csenge",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Ismerd Meg Edzőinket</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg"
            >
              <div className="w-32 h-32 mb-4 rounded-full overflow-hidden bg-gray-100">
                {teacher.image ? (
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{teacher.name}</h3>
              <p className="text-red-600 font-medium mb-3">{teacher.role}</p>
              {/*<p className="text-gray-600">{teacher.description}</p>*/}
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link 
            to="/oktatoink" 
            className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors"
          >
            Részletes bemutatkozás
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
