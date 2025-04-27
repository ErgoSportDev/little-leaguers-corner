
import { motion } from "framer-motion";

const Gallery = () => {
  const images = [
    { 
      src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742", 
      alt: "Children playing soccer in a field",
      title: "Soccer Training" 
    },
    { 
      src: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2", 
      alt: "Kids practicing tennis",
      title: "Tennis Classes" 
    },
    { 
      src: "/lovable-uploads/9fc4733a-7118-4bc3-a0b0-3090405285e1.png", 
      alt: "Basketball practice",
      title: "Basketball Training" 
    },
    { 
      src: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2", 
      alt: "Swimming lessons",
      title: "Swimming Classes" 
    },
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
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
