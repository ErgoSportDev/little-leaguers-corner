
import supabase from "../supabase-client";
import { useEffect, useState } from "react";
import moment from "moment";

const BlogTitles = (props) => {

  const [blog, setBlogs] = useState([])
  const [show, setShowNews] = useState([])

  useEffect(() => {
    fetchNews();
  }, []);

  //fetching from supabase
  const fetchNews = async () => {
    const { data, error } = await supabase.from("Blog").select("*");
    if (error) {
      console.log("Error fetching: ", error);
    } else {
      console.log(data)
      setBlogs(data)
      console.log(data[0].created_at)
      console.log(moment().diff(moment('2025-05-10T21:16:07.754044+00:00'), 'days'))
      // setNews(filterNewsToShow(data))
    }
  };

  const authorSelector = (e) => {
    switch (e.author) {
      case "Luca":
        return (
          <>
            <img className="w-7 h-7 rounded-full" src="/lovable-uploads/Luca.jpg" alt="Jese Leos avatar" />
            <span className="font-medium dark:text-white">
              {e.author}
            </span>
          </>
        )
      case "Regi":
        return (
          <>
            <img className="w-7 h-7 rounded-full" src="/lovable-uploads/Regi.png" alt="Jese Leos avatar" />
            <span className="font-medium dark:text-white">
              {e.author}
            </span>
          </>
        )
      case "Csenge":
        return (
          <>
            <img className="w-7 h-7 rounded-full" src="/lovable-uploads/Luca.jpg" alt="Jese Leos avatar" />
            <span className="font-medium dark:text-white">
              {e.author}
            </span>
          </>
        )
      default:
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-36">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white">Ergo Blog</h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Fedezd fel az Ergo Sport blogját, ahol hasznos tippeket, híreket és inspiráló történeteket találsz a gyerekek sportolásáról!.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {blog.map((e) => (
            <article key={e.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
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
              <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"><a href="#">{e.title}</a></h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{e.short_story}</p>
              <div className="flex justify-end items-center">
                <a href="#" className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                  Olvasd Tovább
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogTitles;