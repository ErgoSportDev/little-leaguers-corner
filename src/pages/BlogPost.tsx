
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";

interface BlogPost {
  id: number;
  title: string;
  short_story: string;
  content: string;
  author: string;
  created_at: string;
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
        setError("Couldn't load the blog post. Please try again later.");
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchBlogPost();
  }, [id]);

  const renderAuthorAvatar = (author: string) => {
    switch (author) {
      case "Luca":
        return "/lovable-uploads/Luca.jpg";
      case "Regi":
        return "/lovable-uploads/Regi.png";
      case "Csenge":
        return "/lovable-uploads/Luca.jpg";
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
        <p className="text-xl text-red-600">{error}</p>
        <Button asChild>
          <Link to="/blog">Go back to blog</Link>
        </Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl">Blog post not found</p>
        <Button asChild>
          <Link to="/blog">Go back to blog</Link>
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
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
              
              <div className="flex items-center gap-x-4 mt-6 text-sm">
                <div className="flex items-center gap-x-2">
                  <img 
                    src={renderAuthorAvatar(post.author)} 
                    alt={`${post.author}'s avatar`} 
                    className="h-10 w-10 rounded-full bg-gray-100" 
                  />
                  <p className="font-semibold text-gray-900">{post.author}</p>
                </div>
                <div className="flex items-center gap-x-1 text-gray-500">
                  <Calendar size={16} />
                  <p>{moment(post.created_at).format("YYYY. MMMM DD.")}</p>
                </div>
              </div>
            </header>
            
            <div className="prose prose-lg max-w-none">
              <p className="lead text-xl text-gray-600 mb-8">{post.short_story}</p>
              <div className="mt-10" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
