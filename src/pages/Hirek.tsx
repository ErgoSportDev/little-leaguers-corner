
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
  desc: string;
  picture: string;
  highlight: boolean;
  created_at: string;
}

const Hirek = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("News").select("*").order('created_at', { ascending: false });
    
    if (error) {
      console.log("Error fetching news: ", error);
    } else {
      console.log("News data:", data);
      setNews(data || []);
    }
    setLoading(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-36">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white">Hírek</h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Legfrissebb hírek és események az Ergo Sport világából
          </p>
        </div>
        
        <div className="flex justify-end mb-4 space-x-2">
          <Button 
            variant={viewMode === 'grid' ? "default" : "outline"} 
            size="icon"
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? "default" : "outline"} 
            size="icon"
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {news.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.picture} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105" 
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-xs">
                        {moment(item.created_at).format("YYYY. MMMM DD.")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="line-clamp-3 text-sm">{item.desc}</p>
                    </CardContent>
                    <CardFooter className="p-4 flex justify-end">
                      {item.highlight && (
                        <span className="mr-auto px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Kiemelt
                        </span>
                      )}
                      <Link to={`/hirek/${item.id}`} className="text-red-600 hover:underline text-sm">
                        Tovább olvasom →
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={item.picture} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="md:w-2/3 p-4">
                        <CardHeader className="p-0 pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle>{item.title}</CardTitle>
                            {item.highlight && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                Kiemelt
                              </span>
                            )}
                          </div>
                          <CardDescription>
                            {moment(item.created_at).format("YYYY. MMMM DD.")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 py-2">
                          <p className="line-clamp-3">{item.desc}</p>
                        </CardContent>
                        <CardFooter className="p-0 pt-2 flex justify-end">
                          <Link to={`/hirek/${item.id}`} className="text-red-600 hover:underline">
                            Tovább olvasom →
                          </Link>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {news.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nincsenek elérhető hírek.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Hirek;
