
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
      role: "Ergo Sport szakmai vezető",
      description: "Tóth Regina Eszter vagyok és életem szerves részét a sport alakította/ alakítja. Leányfalui gyökereim és a sport szeretetem motivált leginkább arra, hogy a Dunakanyarban egy sport közösséget építsünk ki, ahol a gyermekek a személyiség fejlődésük mellett a koordináció és kondicionális képességeikben is fejlődjenek. Az Ergo ezen célok mentén alakul! Szeretnénk, hogy a gyermekek mellett mi is fejlődjünk a gyerekek/edzőtársak/szülők visszajelzéseiből, ezért a reflexióra szeretnénk nagy hangsúlyt fektetni a szakosztályunkban. A Magyar Testnevelési Egyetemen töltött éveimben megismerkedhettem a legtöbb - egy hétköznapi ember által elért - sporttal, és az ott megszerzett tudást szeretném tovább adni másoknak! Leányfalun, a cserkész éveim alatt kezdtem először gyermekekkel foglalkozni, ami segített abban, hogy a hivatásomat megtaláljam.",
      experience: "10+ év szakmai tapasztalat",
      specialization: "Gyermek és ifjúsági sziklamászás, biztonsági technikák",
      education: "Testnevelési Egyetem, Sport szakedző",
      image: "/lovable-uploads/Regi.png",
      motto: "Az ember igazi jelleme játék közben nyilvánul meg"
    },
    {
      name: "Horváth Luca",
      role: "Ergo Sport szakág vezető",
      description: "Amióta az eszemet tudom a sport, a mozgás szerves része az életemnek. Nem csak kikapcsolódás és fejlődés, hanem önmegvalósítás és lelki feltöltődés is számomra. Nálam a labdarúgás a befutó, de az össze sportágban képes vagyok megélni egy olyan önfeledt állapotot, ami rengeteget hozzáad a személyiségemhez. A közösség ereje és a játék adaléka olyan helyzetekkel fűszerezi a testem lendületbe ugrását, amivel a lelkem belül mosolyogni tud. Azért hoztuk létre ezt a szakágat mert szeretném, ha ezt az érzést amit a sport nekem nyújtani tud mások is megízlelhetnék. Szerintem mindenkinek van egy sportja és ha ezt elég korán megtalálja az Ember, akkor, egész életét mankóként kíséri végig. Szeretek gyerekekkel foglalkozni, mert ők igazán őszintén élik meg a játék örömét, és az, az energia amit közben mozgatnak rendkívül felemelő érzés. Amit ezért viszontadhatok, az a figyelmem, ami segít kibontani a bennük lakozó tehetségüket, amiben boldogan önmaguk lehetnek. Mellettem pedig egy olyan Csapat áll, akik ugyanazzal az odaadással és szakmai hozzáértésükkel, minden lehetőséget megadnak a gyerekeknek ahhoz hogy megtalálják önmagukat a mozgás örömében. Várom hogy megismerjük egymást!",
      experience: "8 év szakmai tapasztalat",
      specialization: "Úszástechnikák, vízhez szoktatás, úszásoktatás minden korosztálynak",
      education: "Sportoktatói diploma, Úszóedzői minősítés",
      image: "/lovable-uploads/Luca.jpg",
      motto: "Az ember igazi jelleme játék közben nyilvánul meg"
    },
    {
      name: "Ferbert Csenge",
      role: "Ergo Sport szakmai vezető",
      description: "Kedves Ergosok! Rólam még kevés szó esett itt a Facebook csoportban, mert nem vagyok egy nagy író, de ami késik az nem múlik. 2 éve végeztem a Testnevelesi egyetemen osztatlan tanári képzésen. Egyetemi képzésemmel  párhuzamosan elvégzetem IWI nemzetközi fitnesz instruktór  képzését. Egyeteme mellett végig dolgozatm úszó oktatóként. Egyetem elvégzését követően  haza költöztem a Dunakanyarba és Tahitótfaluba helyezkedtem  el, mint testnevelő. Tanítás mellett úszást oktatok a dunabogdanyi tanuszodában és segéd oktatóként síelés tartok Budakalászon. Mindig fejleszteni akarom magam, ezért is jelentkeztem izgő-mozgó torna tanfolyamra, amelyen az ovis gyermekek mozgás fejlesztéséről tanulunk.",
      experience: "12 év szakmai tapasztalat",
      specialization: "Művészi torna, egyensúly fejlesztés, rugalmasság fokozása",
      education: "Sporttudományi Egyetem, Tornász szakképesítés",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      motto: "A sport nemcsak testnevelés, hanem léleknek is az egyik legerőteljesebb nevelőeszköze"
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
              Edzőink
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
                      "{teacher.motto}"
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
            <h2 className="text-3xl font-bold text-red-700 mb-6">Jelentkezz</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Fedezd fel a mozgás örömét, szerezz új barátokat, és válj igazi csapattaggá a sporton keresztül.
              Csatlakozz most, és élvezd a sport minden percét!
            </p>
            <Button asChild>
              <Link
                to="/"
                state={{ scrollTo: 'test-id' }}
              >
                🏀 Jelentkezek! ⚽
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
