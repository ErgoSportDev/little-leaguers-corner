
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface NewsPost {
  id: string;
  title: string;
  short_desc: string;
  long_desc: string;
  picture: string;
  highlight: boolean;
  created_at: string;
  content?: string;
}

const HirekPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsPost = async () => {
      if (!id) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("News")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching news post:", error);
        setError("Couldn't load the news post. Please try again later.");
      } else {
        console.log(data);
        setPost(data);
      }
      setLoading(false);
    };

    fetchNewsPost();
  }, [id]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
        <p className="text-xl text-red-600">{error}</p>
        <Button asChild>
          <Link to="/hirek">Vissza a hírekhez</Link>
        </Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl">A hír nem található</p>
        <Button asChild>
          <Link to="/hirek">Vissza a hírekhez</Link>
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
            <Link to="/hirek">
              <ArrowLeft size={16} />
              Vissza a hírekhez
            </Link>
          </Button>

          <article>
            <header className="mb-10">
              {post.highlight && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-4">
                  Kiemelt hír
                </div>
              )}
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
              <div className="mt-2 text-sm text-gray-500">
                {moment(post.created_at).format("YYYY/MM/DD")}
              </div>
            </header>

            {post.long_desc && (
              <div className="prose prose-lg max-w-none">
                <div className="mt-10 mb-16 text-gray-700 text-[1.1rem] leading-[1.7]">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.long_desc}</ReactMarkdown>
                </div>
              </div>
            )}

            {post.picture && (
              <div className="w-full overflow-hidden rounded-lg mb-10">
                <img
                  src={post.picture}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </article>
          <div className="flex justify-center mt-8">
            <button
              onClick={scrollToTop}
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            >
              <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
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

export default HirekPost;
