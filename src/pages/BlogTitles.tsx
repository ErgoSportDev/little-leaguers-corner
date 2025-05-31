
import supabase from "../supabase-client";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const BlogTitles = () => {
  const [blog, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  //fetching from supabase
  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Blog").select("id, title, created_at, short_story, author").order('created_at', { ascending: false });
    if (error) {
      console.log("Error fetching: ", error);
    } else {
      // console.log(data);
      setBlogs(data);
    }
    setLoading(false);
  };

  const authorSelector = (e) => {
    switch (e.author) {
      case "Luca":
        return (
          <>
            <img className="w-7 h-7 rounded-full" src={`${import.meta.env.BASE_URL}/lovable-uploads/Luca.jpg`} alt="Kép Lucáról" />
            <span className="font-medium dark:text-white">
              {e.author}
            </span>
          </>
        );
      case "Regi":
        return (
          <>
            <img className="w-7 h-7 rounded-full" src={`${import.meta.env.BASE_URL}/lovable-uploads/Regi.png`} alt="Kép Regiről" />
            <span className="font-medium dark:text-white">
              {e.author}
            </span>
          </>
        );
      case "Csenge":
        return (
          <>
            <img className="w-7 h-7 rounded-full" src={`${import.meta.env.BASE_URL}/lovable-uploads/Csenge.png`} alt="Kép Csengéről" />
            <span className="font-medium dark:text-white">
              {e.author}
            </span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-36">

      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-100 via-red-400 to-red-700 flex items-center justify-center">
        <img src={`${import.meta.env.BASE_URL}/lovable-uploads/download.svg`} />
      </div>

      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white">Ergo Blog</h2>
          <p className="font-light text-gray-100 sm:text-xl dark:text-gray-100">Fedezd fel az Ergo Sport blogját, ahol hasznos tippeket, híreket és inspiráló történeteket találsz a gyerekek sportolásáról!.</p>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
          </div>
        ) : (
          <>
            {blog.length == 0 && (
              <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-[1rem] shadow-lg p-[1rem]">
                <p className="font-light text-black sm:text-xl dark:text-gray-400">Jelenleg nincs blog bejegyzés. ❌</p>
              </div>
            )}
            <div className="grid gap-8 lg:grid-cols-2">
              {blog.map((e) => (
                <article key={e.id} className="bg-white/60 backdrop-blur-sm w-mav h-max p-6 rounded-lg shadow-lg hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-5 text-gray-500">
                    <div className="flex items-center space-x-4">
                      {authorSelector(e)}
                    </div>
                    {moment().diff(moment(e.created_at), 'days') == 0 ?
                      <span className="text-sm">Mai napon</span>
                      :
                      <span className="text-sm">{moment().diff(moment(e.created_at), 'days')} napja</span>
                    }
                  </div>
                  <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    <Link to={`/blog/${e.id}`}>{e.title}</Link>
                  </h2>
                  <p className="mb-5 font-normal text-[rgb(75,85,99)] dark:text-gray-400">{e.short_story}</p>
                  <div className="flex justify-end items-center">
                    <Link to={`/blog/${e.id}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                      Olvasd Tovább
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogTitles;
