
import { motion } from "framer-motion";
import { User } from "lucide-react";

const Introduction = () => {
  const teachers = [
    {
      name: "Sarah Johnson",
      role: "Tennis Coach",
      description: "Former professional player with 10 years of teaching experience.",
      image: "/placeholder.svg"
    },
    {
      name: "Mike Peters",
      role: "Swimming Instructor",
      description: "Certified swimming instructor specializing in children's aquatics.",
      image: "/placeholder.svg"
    },
    {
      name: "Emily Chen",
      role: "Athletics Coach",
      description: "Physical education specialist focusing on child development.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Teachers</h2>
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
              <p className="text-gray-600">{teacher.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
