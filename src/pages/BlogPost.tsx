
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface BlogPost {
  id: number;
  title: string;
  short_story: string;
  long_story: string;
  author: string;
  created_at: string;
  sports?: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("Blog")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching blog post:", error);
        setError("Blog poszt most nem érhető el, próbálkozz késöbb.");
      } else {
        // console.log(data)
        setPost(data);
      }
      setLoading(false);
    };

    fetchBlogPost();
  }, [id]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const authorDetails = (author: string) => {
    switch (author) {
      case "Luca":
        return {
          pic: "/lovable-uploads/Luca.jpg",
          job_title: "Ergo Sport szakág vezető"
        };
      case "Regi":
        return {
          pic: "/lovable-uploads/Regi.png",
          job_title: "Ergo Sport szakmai vezető"
        };;
      case "Csenge":
        return {
          pic: "/lovable-uploads/Luca.jpg",
          job_title: "Ergo Sport szakág vezető"
        };;
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-red-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl text-black">{error}</p>
        <Button asChild className="rounded-[3rem] bg-gradient-to-r from-red-500 to-orange-500">
          <Link to="/blog">Vissza a blog cimekhez</Link>
        </Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl">Poszt jelenleg nem elérhető 😣 </p>
        <Button asChild className="rounded-[3rem] bg-gradient-to-r from-red-500 to-orange-500">
          <Link to="/blog">Vissza a blog cimekhez</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto">
          <Button
            variant="ghost"
            className="mb-8 flex items-center gap-2 hover:bg-gray-100"
            asChild
          >
            <Link to="/blog">
              <ArrowLeft size={16} />
              Back to all posts
            </Link>
          </Button>

          <article>
            <header className="mb-10">
              <div className="flex items-center mt-6 text-sm justify-between w-full">
                <div className="inline-flex items-center gap-x-2">
                  <img
                    src={authorDetails(post.author).pic}
                    alt={`${post.author}' profil képe`}
                    className="h-[2.5rem] w-[2.5rem] rounded-full bg-gray-100"
                  />
                  <div>
                    <p className="font-bold text-[1.3rem] text-gray-900">{post.author}</p>
                    <span className="font-normal text-gray-500">{authorDetails(post.author).job_title}</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-1 text-gray-500">
                  <Calendar size={16} />
                  <p>{moment(post.created_at).format("YYYY/MM/DD")}</p>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pt-5">{post.title}</h1>
            </header>

            {post.sports != null ?
              <div className="bg-gradient-to-r from-white to-red-200 p-2 mb-5 rounded-lg mt-12">
                <div className="">
                  <p className="text-gray-800 italic text-center">
                    Sportágak: {post.sports}
                  </p>
                </div>
              </div>
              :
              ""}
            <div className="prose prose-lg max-w-none">
              <p className="lead text-xl text-gray-600 mb-8 text-justify">{post.short_story}</p>
              <div className="mt-10 mb-16 text-gray-700 text-[1.1rem] leading-[1.7] markdown text-justify">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {post.long_story}
                  </ReactMarkdown>
              </div>
            </div>
          </article>
          <div className="flex justify-center">
            <button onClick={scrollToTop} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-[10rem] text-sm px-5 py-2.5 text-center me-2 mb-2">
              <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
              </svg>
              <span className="sr-only">Vissza a tetejére</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;