
import { motion } from "framer-motion";

const Gallery = () => {
  const images = [
    { src: "/placeholder.svg", alt: "Children playing volleyball" },
    { src: "/placeholder.svg", alt: "Tennis practice" },
    { src: "/placeholder.svg", alt: "Cycling activity" },
    { src: "/placeholder.svg", alt: "Team building activities" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
