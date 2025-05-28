
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { User, ChevronLeft, Bike, Volleyball } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "../styles/counter.css";
import { useEffect, useRef, useState } from "react";

const Teachers = () => {

  const numberRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // optional: run only once
        }
      },
      { threshold: 0.5 }
    );

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    ["0deg", "180deg"]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "200px"],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.3],
  );

  const teachers = [
    {
      name: "Tóth Regina",
      role: "Ergo Sport szakmai vezető",
      description: "Tóth Regina Eszter vagyok és életem szerves részét a sport alakította/ alakítja. Leányfalui gyökereim és a sport szeretetem motivált leginkább arra, hogy a Dunakanyarban egy sport közösséget építsünk ki, ahol a gyermekek a személyiség fejlődésük mellett a koordináció és kondicionális képességeikben is fejlődjenek. Az Ergo ezen célok mentén alakul! Szeretnénk, hogy a gyermekek mellett mi is fejlődjünk a gyerekek/edzőtársak/szülők visszajelzéseiből, ezért a reflexióra szeretnénk nagy hangsúlyt fektetni a sportszervezetünkben. A Magyar Testnevelési Egyetemen töltött éveimben megismerkedhettem a legtöbb - egy hétköznapi ember által elért - sporttal, és az ott megszerzett tudást szeretném tovább adni másoknak! Leányfalun, a cserkész éveim alatt kezdtem először gyermekekkel foglalkozni, ami segített abban, hogy a hivatásomat megtaláljam.",
      experience: "5+ év szakmai tapasztalat",
      specialization: "Gyermek és ifjúság nevelés a sport szellemiségében",
      education: "Testnevelési Egyetem Osztatlan tanár képzés, továbbképzések",
      image: "/lovable-uploads/Regi.png",
      motto: "Az ember igazi jelleme játék közben nyilvánul meg"
    },
    {
      name: "Horváth Luca",
      role: "Ergo Sport szakág vezető",
      description: "Amióta az eszemet tudom a sport, a mozgás szerves része az életemnek. Nem csak kikapcsolódás és fejlődés, hanem önmegvalósítás és lelki feltöltődés is számomra. Nálam a labdarúgás a befutó, de az össze sportágban képes vagyok megélni egy olyan önfeledt állapotot, ami rengeteget hozzáad a személyiségemhez. A közösség ereje és a játék adaléka olyan helyzetekkel fűszerezi a testem lendületbe ugrását, amivel a lelkem belül mosolyogni tud. Azért hoztuk létre az Ergo Sportot mert szeretném, ha ezt az érzést amit a sport nekem nyújtani tud mások is megízlelhetnék. Szerintem mindenkinek van egy sportja és ha ezt elég korán megtalálja az Ember, akkor, egész életét mankóként kíséri végig. Szeretek gyerekekkel foglalkozni, mert ők igazán őszintén élik meg a játék örömét, és az, az energia amit közben mozgatnak rendkívül felemelő érzés. Amit ezért viszontadhatok, az a figyelmem, ami segít kibontani a bennük lakozó tehetségüket, amiben boldogan önmaguk lehetnek. Mellettem pedig egy olyan Csapat áll, akik ugyanazzal az odaadással és szakmai hozzáértésükkel, minden lehetőséget megadnak a gyerekeknek ahhoz hogy megtalálják önmagukat a mozgás örömében. Várom hogy megismerjük egymást!",
      experience: "8 év szakmai tapasztalat",
      specialization: "Úszástechnikák, vízhez szoktatás, úszásoktatás minden korosztálynak",
      education: "Sportoktatói diploma, Úszóedzői minősítés",
      image: "/lovable-uploads/Luca.jpg",
      motto: "Az ember igazi jelleme játék közben nyilvánul meg"
    },
    {
      name: "Ferbert Csenge",
      role: "Ergo Sport szakág vezető",
      description: "Kedves Ergosok! Rólam még kevés szó esett itt a Facebook csoportban, mert nem vagyok egy nagy író, de ami késik az nem múlik. 2 éve végeztem a Testnevelesi egyetemen osztatlan tanári képzésen. Egyetemi képzésemmel  párhuzamosan elvégzetem IWI nemzetközi fitnesz instruktór  képzését. Egyeteme mellett végig dolgozatm úszó oktatóként. Egyetem elvégzését követően  haza költöztem a Dunakanyarba és Tahitótfaluba helyezkedtem  el, mint testnevelő. Tanítás mellett úszást oktatok a dunabogdanyi tanuszodában és segéd oktatóként síelés tartok Budakalászon. Mindig fejleszteni akarom magam, ezért is jelentkeztem izgő-mozgó torna tanfolyamra, amelyen az ovis gyermekek mozgás fejlesztéséről tanulunk.",
      experience: "12 év szakmai tapasztalat",
      specialization: "Művészi torna, egyensúly fejlesztés, rugalmasság fokozása",
      education: "Sporttudományi Egyetem, Tornász szakképesítés",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      motto: "A sport nemcsak testnevelés, hanem léleknek is az egyik legerőteljesebb nevelőeszköze"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pt-36">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-100 via-red-400 to-red-700 flex items-center justify-center">
        <img src="/lovable-uploads/download.svg" />
      </div>

      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white">Csapatunk</h2>
        <p className="font-light text-gray-100 sm:text-xl dark:text-gray-400">
          Ismerd meg elkötelezett és lelkes csapatunkat, akik szívüket-lelküket adják az Ergo Sportért!
        </p>
      </div>

      <section className="py-8 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="border-none shadow-xl h-full flex flex-col bg-white/90 backdrop-blur-sm">
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
                    <p className="text-gray-600 mb-4 text-justify">{teacher.description}</p>
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

      <section className="pt-16">
        <div className="py-16 px-4 mx-auto max-w-screen-xl text-center lg:py-26 lg:px-6">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white">Rólunk</h2>
          <p className="font-light text-gray-100 sm:text-xl dark:text-gray-400">
            Ismerd meg az Ergo Sport filozófiáját
          </p>
        </div>
        {/* <motion.div
          ref={targetRef}
          style={{
            rotate,
            y
          }}
          className="mx-auto size-48 bg-indigo-500"
        /> */}

        <motion.div
          // ref={targetRef}
          // style={{
          // rotate,
          // y,
          // scale
          // }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 }
          }}
          // transition={{ delay: 2 * 0.2 }}
          className="mt-[20rem] container p-0 mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg m-4 shadow-xl">
            <h2 className="pl-5 pt-5 font-bold text-xl">Az Ergo Sport filozófiája</h2>
            <p className="p-5 text-justify text-gray-600">
              Az Ergo nem csak sport. Az „Ergosok” egy olyan közösség, ahol mindenkit elfogadunk olyannak,
              amilyen így bátran mindenki önmaga lehet. Szeretnénk, ha mindenki jóindulatúan közeledne a társai
              felé és őszintén kommunikálnánk egymással. Nyilván ehhez kell egyfajta nyitottság, hogy be tudjuk
              fogadni a különbözőségeinket, de mindenben segítünk egymásnak. Egyenlőség van, ahol mindenki
              ugyan annyival járul hozzá a közösség működéséhez, amennyiben pedig ebben segítségre szorul, kér s
              adatik. Szeretnénk egy olyan biztonságos közeget teremteni, ahol mindenki ki tud kapcsolódni és fel
              tud szabadulni. A játék az eszköz, a mozgás a forma, a közösség pedig az összetartó erő.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1
          }}
        >
          <div className="container mx-auto">
            <img src="/lovable-uploads/image3.png"></img>
          </div>
        </motion.div>


        <motion.div
          // ref={targetRef}
          // style={{
          // rotate,
          // y,
          // scale
          // }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 }
          }}
          className="mt-[20rem] container p-0 mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg m-4 shadow-xl">
            <h2 className="pl-5 pt-5 text-xl font-bold">A módszertan</h2>
            <ul className="p-5 pl-10 space-y-2 text-gray-600 list-disc list-outside">
              <li>
                Mindenkinek van egy sportja!
              </li>
              <li>
                Cél az önfeledt mozgás élmény megtapasztalása játékos foglalkozásokon keresztül
              </li>
              <li>
                Nincs követelményrendszer és teljesítmény kényszer
              </li>
              <li>
                Éves periodizáció az időjáráshoz és a helyszínekhez igazítva egyéni- és csapatsportok váltakozásával.
              </li>
              <li>
                Pszichológiai, emocionális és kognitív megközelítésben
              </li>
              <li>
                Tudatos jelenlétre nevelés
              </li>
              <li>
                Az önkifejezés alapjainak letétele
              </li>
              <li>
                A természet szeretet kialakítása
              </li>
            </ul>
          </div>
        </motion.div>

        <div>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 container">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                y: 300
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              transition={{
                duration: 0.7,
                scale: { type: 'spring', visualDuration: 0.7, bounce: 0.5 }
              }}
            >
              <img className="mx-auto rounded-lg shadow-xl" src="/lovable-uploads/image2.png"></img>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                y: 300
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              transition={{
                duration: 0.7,
                scale: { type: 'spring', visualDuration: 0.7, bounce: 0.5 },
              }}
            >
              <img className="mx-auto rounded-lg shadow-xl" src="/lovable-uploads/image5.jpg"></img>
            </motion.div>
          </div>
        </div>

        <motion.div
          // ref={targetRef}
          // style={{
          // rotate,
          // y,
          // scale
          // }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 }
          }}
          className="mt-[20rem] container p-0 mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg m-4 shadow-xl">
            <h2 className="pl-5 pt-5 text-xl font-bold">Verseny- és rekreációs sport</h2>
            <ul className="p-5 pl-10 space-y-2 text-gray-600 list-disc list-outside">
              <li>
                Sportágválasztás
              </li>
              <li>
                Akik versenysportban szeretnének jeleskedni a jövőben, adunk egy sportági alapot és segítjük őket útjuk elindításában (megtalálni a sportágat, az egyesületet, felkészülni mind fizikailag, mind szellemileg)
              </li>
              <li>
                Akik a sportot, -mint rekreációs tevékenységet- szeretnék beilleszteni a mindennapjaikba, megmutatjuk a lehetőségeket és adunk egy közösséget, ahol változatos edzéseken játékosan sportolhat
              </li>
              <li>
                A sport nem csak fontos, hanem a mozgás valójában kikapcsolódás, feltöltődés
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="pl-4 pr-4 container"
          initial={{
            opacity: 0,
            scale: 0,
            y: 200
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          transition={{
            duration: 0.7,
            scale: { type: 'spring', visualDuration: 0.7, bounce: 0.5 },
          }}
        >
          <img className="mx-auto rounded-lg shadow-xl" src="/lovable-uploads/image4.jpg"></img>
        </motion.div>

        <motion.div
          // ref={targetRef}
          // style={{
          // rotate,
          // y,
          // scale

          // }}
          className="mt-[20rem] container p-0 mx-auto"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 }
          }}>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg m-4 shadow-xl">
            <h2 className="pl-5 pt-5 text-xl font-bold">„Az ember igazi jelleme játék közben nyilvánul meg”</h2>
            <ul className="p-5 pl-10 space-y-2 text-gray-600 list-disc list-outside">
              <li>
                Biztonságos tér kialakítása a keretek meghatározásával (szabályok betartása)
              </li>
              <li>
                Külső céltól függetlenül, magáért a tevékenységéért - belső motiváció
              </li>
              <li>
                Önfeledten, szabadon játszani az örömért
              </li>
              <li>
                Komoly szerepe van az egészséges lelki egyensúly kialakításában
              </li>
              <li>
                Az önismeret leghatékonyabb színtere
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="pl-4 pr-4 container"
          initial={{
            opacity: 0,
            scale: 0,
            y: 200
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          transition={{
            duration: 0.7,
            scale: { type: 'spring', visualDuration: 0.7, bounce: 0.5 },
          }}
        >
          <img className="mx-auto rounded-lg shadow-xl" src="/lovable-uploads/image7.jpg"></img>
        </motion.div>

        <motion.div
          // ref={targetRef}
          // style={{
          // rotate,
          // y,
          // scale
          // }}
          className="mt-[20rem] container p-0 mx-auto"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 }
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg m-4 shadow-xl">
            <h2 className="pl-5 pt-5 text-xl font-bold">Szülőkkel együtt</h2>
            <ul className="p-5 pl-10 space-y-2 text-gray-600 list-disc list-outside">
              <li>
                Teljes körű foglalkoztatás, ami a szülőknek az iskola utáni elhelyezésben is segítséget nyújt
              </li>
              <li>
                Havi egy hétvégi sportesemény, ahol a szülők aktív résztvevőként vagy szurkolóként lehetnek jelen
              </li>
              <li>
                Közös játék megélése
              </li>
              <li>
                Nagyszerű, segítőkész közösség kialakítása
              </li>
              <li>
                Folyamatos oda-vissza kommunikáció a gyermekekről
              </li>
              <li>
                Mindannyiunk közös érdeke a gyermekek jólléte
              </li>
            </ul>
          </div>
        </motion.div>

        <div>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 container">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                y: 300
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              transition={{
                duration: 0.7,
                scale: { type: 'spring', visualDuration: 0.7, bounce: 0.5 }
              }}
            >
              <img className="mx-auto rounded-lg shadow-xl" src="/lovable-uploads/image6.jpg"></img>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                y: 300
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              transition={{
                duration: 0.7,
                scale: { type: 'spring', visualDuration: 0.7, bounce: 0.5 },
              }}
            >
              <img className="mx-auto rounded-lg shadow-xl" src="/lovable-uploads/image8.jpg"></img>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-[20rem] container p-0 pb-[20rem] mx-auto"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 }
          }}>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg m-4 shadow-xl">
            <h2 className="pl-5 pt-5 text-xl font-bold">Vedd fel velünk a kapcsolatot, ha szeretnél csatlakozni az Ergosokhoz, mint…</h2>
            <ul className="p-5 pl-10 space-y-2 text-gray-600 list-disc list-outside">
              <li>
                játékos - aki a közösségünkben sporto
              </li>
              <li>
                edző - aki a közösségünk edzéseit segíti
              </li>
              <li>
                sportági partner - akivel közös együttműködés keretein belül a saját sportágukat népszerűsítik és segítik a tehetségek kiválasztását, befogadását
              </li>
              <li>
                iskola/szülő - aki a gyermekeinek sportfoglalkozást szeretne biztosítani
              </li>
              <li>
                egyesület/község - ahol szeretnének egy saját Ergo Sport szakágat létrehozni
              </li>
              <li>
                támogató - aki szeretne részese lenni az Ergo álom megvalósításának
              </li>
            </ul>
          </div>
        </motion.div>

      </section>

      <section>
        <div className="pt-[7rem] pb-[10rem] bg-white dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white text-center">Ergo Sport Számokban</h2>
          <dl className="grid max-w-screen-xl grid-cols-2 gap-4 p-4 mx-auto text-gray-900 md:grid-cols-4 dark:text-white sm:p-8">
            <div className="flex flex-col items-center justify-center rounded-[1rem] shadow-xl p-5 border border-black">
              <dt id="sportok" ref={numberRef} className={`number ${inView ? "animate" : ""}` + " mb-2 text-3xl font-extrabold"}></dt>
              <dd className="text-gray-500 dark:text-gray-400">Sportok</dd>
            </div>
            <div className="flex flex-col items-center justify-center rounded-[1rem] shadow-xl p-5 border border-black">
              <dt id="gyerekek" ref={numberRef} className={`number ${inView ? "animate" : ""}` + " mb-2 text-3xl font-extrabold"}></dt>
              <dd className="text-gray-500 dark:text-gray-400">Gyerekek</dd>
            </div>
            <div className="flex flex-col items-center justify-center rounded-[1rem] shadow-xl p-5 border border-black">
              <dt id="edzok" ref={numberRef} className={`number ${inView ? "animate" : ""}` + " mb-2 text-3xl font-extrabold"}></dt>
              <dd className="text-gray-500 dark:text-gray-400">Edzők</dd>
            </div>
            <div className="flex flex-col items-center justify-center rounded-[1rem] shadow-xl p-5 border border-black">
              <dt id="helyszinek" ref={numberRef} className={`number ${inView ? "animate" : ""}` + " mb-2 text-3xl font-extrabold"}></dt>
              <dd className="text-gray-500 dark:text-gray-400">Helyszinek</dd>
            </div>
          </dl>
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
            <Link
              to="/"
              state={{ scrollTo: 'test-id' }}
              className="drop-shadow-md hover:drop-shadow-xl bg-black text-white p-5 py-2 rounded-[2rem] text-[1.5rem] font-[600] hover:bg-red-500 transition-colors"
            >
              <span className="m-5">🏀 Jelentkezek! ⚽</span>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Teachers;
