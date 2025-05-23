
import { useState, useEffect } from "react";
import supabase from "../supabase-client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid2X2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import moment from "moment";

interface NewsItem {
  id: string;
  title: string;
  long_desc: string;
  short_desc: string;
  picture: string;
  highlight: boolean;
  created_at: string;
  type: string;
}

const Hirek = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("News").select("id, created_at, title, short_desc, picture, highlight, type").order('created_at', { ascending: false });

    if (error) {
      console.log("Error fetching news: ", error);
    } else {
      setNews(data);
    }
    setLoading(false);
  };

  return (
    <section className="py-36">

      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-100 via-red-400 to-red-700 flex items-center justify-center">
        <img src="/lovable-uploads/download.svg" />
      </div>

      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white">Aktuális</h2>
          <p className="font-light text-gray-100 sm:text-xl dark:text-gray-400">
            Legfrissebb hírek és beszámolók az Ergo Sport világából
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
          </div>
        ) : (
          <>
            <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {news.map((item) => (
                <Card key={item.id} className="border-none w-mav h-max overflow-hidden hover:shadow-lg transition-shadow bg-white/60 backdrop-blur-sm">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.picture}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <Link to={`/aktualis/${item.id}`}>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </Link>
                    <CardDescription className="text-xs">
                      {moment(item.created_at).format("YYYY/MM/DD")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="line-clamp-3 text-sm">{item.short_desc}</p>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-end self-end">
                    {item.highlight && (
                      <span className="mr-[0.5rem] px-2 py-1  bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white text-xs rounded-full">
                        Kiemelt
                      </span>
                    )}
                    <span className="opacity-75 mr-auto px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full">
                      {item.type}
                    </span>
                    <Link to={`/aktualis/${item.id}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                      Olvasd Tovább
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {news.length === 0 && !loading && (
              <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-[1rem] shadow-lg p-[1rem]">
                <p className="text-black">Nincs hír! 🤷‍♂️☹</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Hirek;
