
import { useState, useEffect } from "react";
import supabase from "../supabase-client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid2X2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import moment from "moment";

interface Report {
  id: string;
  title: string;
  long_desc: string;
  short_desc: string;
  picture: string;
  highlight: boolean;
  created_at: string;
  date_start: string;
  date_end: string;
  pictures: string;
}

const Beszamolok = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Reports").select("*").order('created_at', { ascending: false });

    if (error) {
      console.log("Error fetching reports: ", error);
    } else {
      setReports(splitURL(data));
    }
    setLoading(false);
  };

  const splitURL = (data) => {
    if (data.length != 0) {
      data.forEach(e => {
        e.pictures = e.pictures.split("|")
      });
      return data;
    } else {
      return []
    }
  }

  const SameDayOrNot = (start, end) => {
    return moment(start).isSame(moment(end), 'day')
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-36">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white">Beszámolók</h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Részletes beszámolók az Ergo Sport eseményeiről és tevékenységeiről
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {reports.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-50">
                      <img
                        src={item.pictures[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/4 p-4">
                      <CardHeader className="p-4">
                        <Link to={`/beszamolok/${item.id}`}>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </Link>
                        <CardDescription className="text-xs">
                          {SameDayOrNot(item.date_start, item.date_end)
                            ?
                            <>
                              {moment(item.date_start).locale('hu').format('YYYY/MM/DD')}
                            </>
                            :
                            <>
                              {moment(item.date_start).locale('hu').format('YYYY/MM/DD')} → {moment(item.date_end).locale('hu').format('YYYY/MM/DD')}
                            </>
                          }
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="line-clamp-3 text-sm">{item.short_desc}</p>
                      </CardContent>
                      <CardFooter className="p-4 flex justify-end self-end">
                        {item.highlight && (
                          <span className="mr-auto px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            Kiemelt
                          </span>
                        )}
                        <Link to={`/beszamolok/${item.id}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                          Olvasd Tovább
                          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {reports.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">Jelenleg nincs beszámoló! 🤷‍♂️☹</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Beszamolok;
