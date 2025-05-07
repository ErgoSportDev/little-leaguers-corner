
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { User, ChevronLeft, Bike, Volleyball } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Teachers = () => {
  const teachers = [
    {
      name: "Tóth Regina",
      role: "Sziklamászás Oktató",
      description: "Professzionális hegymászó, ifjúsági atlétikai oktatási szakértelemmel. Regina több mint 10 éve foglalkozik sziklamászással, és különleges figyelmet fordít a gyerekek biztonságára és a megfelelő technika oktatására.",
      experience: "10+ év szakmai tapasztalat",
      specialization: "Gyermek és ifjúsági sziklamászás, biztonsági technikák",
      education: "Testnevelési Egyetem, Sport szakedző",
      image: "/lovable-uploads/799f524e-05e6-4728-80a0-0876cfda2097.png"
    },
    {
      name: "Emma Wilson",
      role: "Úszás Edző",
      description: "Képesített úszásoktató, ifjúsági fejlesztésre specializálódva. Emma különösen jó az úszni tanuló kisgyermekekkel, és minden korosztály számára egyedi megközelítést alkalmaz.",
      experience: "8 év szakmai tapasztalat",
      specialization: "Úszástechnikák, vízhez szoktatás, úszásoktatás minden korosztálynak",
      education: "Sportoktatói diploma, Úszóedzői minősítés",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      name: "Sophie Chen",
      role: "Tornász Edző",
      description: "Egykori versenyző tornász, aki fiatal sportolók képzésére szakosodott. Sophie technikai tudása és türelme segít a gyerekeknek a tornász alapok elsajátításában.",
      experience: "12 év szakmai tapasztalat",
      specialization: "Művészi torna, egyensúly fejlesztés, rugalmasság fokozása",
      education: "Sporttudományi Egyetem, Tornász szakképesítés",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        {/* Stylish header background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 -z-10"></div>
        
        {/* Sports equipment pattern overlay - smaller size, less opacity */}
        <div className="absolute inset-0 -z-5">
          {/* Smaller sports equipment icons */}
          <div className="absolute top-[10%] left-[5%] opacity-10">
            <Bike className="w-8 h-8 text-white" />
          </div>
          <div className="absolute top-[70%] left-[20%] opacity-10">
            <Bike className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-[40%] right-[15%] opacity-10">
            <Bike className="w-10 h-10 text-white" />
          </div>
          
          {/* Volleyballs scattered around */}
          <div className="absolute top-[30%] left-[30%] opacity-10">
            <Volleyball className="w-7 h-7 text-white" />
          </div>
          <div className="absolute top-[60%] right-[30%] opacity-10">
            <Volleyball className="w-8 h-8 text-white" />
          </div>
          <div className="absolute top-[20%] right-[5%] opacity-10">
            <Volleyball className="w-5 h-5 text-white" />
          </div>
          
          {/* More bike icons */}
          <div className="absolute bottom-[10%] right-[10%] opacity-10">
            <Bike className="w-10 h-10 text-white" />
          </div>
          <div className="absolute top-[50%] left-[10%] opacity-10">
            <Bike className="w-8 h-8 text-white" />
          </div>
          <div className="absolute bottom-[20%] left-[40%] opacity-10">
            <Bike className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Oktatóink
            </motion.h1>
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <Button 
                variant="secondary"
                size="sm"
                className="group"
                asChild
              >
                <Link to="/" className="flex items-center">
                  <ChevronLeft className="mr-1 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Vissza a főoldalra</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <section className="py-8 bg-white flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
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
                    <h3 className="text-xl font-semibold">{teacher.name}</h3>
                    <p className="text-red-600 font-medium mb-2">{teacher.role}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 mb-4">{teacher.description}</p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Tapasztalat:</strong> {teacher.experience}</p>
                      <p><strong>Szakterület:</strong> {teacher.specialization}</p>
                      <p><strong>Végzettség:</strong> {teacher.education}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <p className="text-sm text-gray-500 italic w-full text-center">
                      "A sport nem csak mozgás, hanem életforma és közösség is."
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-red-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-red-700 mb-6">Oktatóink</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Tapasztalt és szenvedélyes oktatóink segítenek minden sportolónak elérni a kitűzött céljaikat. 
              Akár kezdő, akár haladó, nálunk személyre szabott figyelmet és szakértelmet kap.
            </p>
            <Button asChild>
              <Link to="/kapcsolat">
                Kapcsolatfelvétel oktatóinkkal
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Teachers;
