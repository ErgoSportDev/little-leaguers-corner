import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface BlogPostType {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author: string | {
    name: string;
    pic: string;
    job_title: string;
  };
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
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
        setError("Failed to load the blog post. Please try again later.");
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchBlogPost();
  }, [id]);

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
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl">Blog post not found</p>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const { title, content, created_at, author } = post;

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
              Vissza a bloghoz
            </Link>
          </Button>

          <article>
            <header className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
              <div className="mt-2 text-sm text-gray-500">
                {moment(created_at).format("YYYY/MM/DD")}
              </div>
              {typeof author === 'string' ? (
                <div className="mt-2 text-sm text-gray-500">
                  Author: {author}
                </div>
              ) : author && typeof author === 'object' ? (
                <div className="mt-2 text-sm text-gray-500">
                  Author: {author.name}
                  {author.pic && <img src={author.pic} alt="Author" />}
                  {author.job_title && <div>{author.job_title}</div>}
                </div>
              ) : null}
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="mt-10 mb-16 text-gray-700 text-[1.1rem] leading-[1.7] markdown text-justify">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
