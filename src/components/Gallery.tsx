
import supabase from "../supabase-client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Gallery = () => {

  const [news, setNews] = useState([])
  const [showNews, setShowNews] = useState([])

  useEffect(() => {
    fetchNews();
  }, []);

  //fetching from supabase
  const fetchNews = async () => {
    const { data, error } = await supabase.from("News").select("*");
    if (error) {
      console.log("Error fetching: ", error);
    } else {
      console.log(data)
      setNews(filterNewsToShow(data))
    }
  };

  const filterNewsToShow = (news) => {
    return news.filter(item => item.highlight);
  }

  return (
    <>
      <section className="pb-16 pt-[8rem] bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Aktuális</h2>

          {news.map((e, index) => (
            <div key={e.id}>
              {index % 2 == 0 ?
                <div key={e.id} className="flex flex-col lg:flex-row items-center pt-5">
                  <Link to={`/hirek/${e.id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-xl hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-[11rem] md:w-48 md:rounded-none md:rounded-s-lg sm: h-[15rem]" src={e.picture} alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-xl font-[600] tracking-tight text-gray-900 dark:text-white">{e.title}</h5>
                      <p className="mb-3 font-normal text-[rgb(75,85,99)] dark:text-gray-400 text-justify">{e.short_desc}</p>
                    </div>
                  </Link>
                </div>
                :
                <div key={e.id} className="flex flex-col lg:flex-row-reverse items-center pt-5">
                  <Link to={`/hirek/${e.id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-xl hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-xl font-[600] tracking-tight text-gray-900 dark:text-white">{e.title}</h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">{e.short_desc}</p>
                    </div>
                    <img className="object-cover w-full rounded-r-lg h-96 md:h-[11rem] md:w-48 md:rounded-none md:rounded-r-lg sm: h-[15rem]" src={e.picture} alt="" />
                  </Link>
                </div>
              }
            </div>
          ))}


        </div>
      </section>
    </>
  );
};

export default Gallery;
