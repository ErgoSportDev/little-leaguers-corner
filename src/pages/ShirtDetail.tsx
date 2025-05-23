
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shirt as LucideShirt, ShoppingCart, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import supabase from "../supabase-client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Shirt {
  id: number;
  title: string;
  price: string;
  pictures: [];
  long_desc: string;
  sizes: string[];
}

const ShirtDetail = () => {
  const { id } = useParams();
  const [shirt, setShirt] = useState<Shirt | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    fetchShopItem();
  }, []);

  const fetchShopItem = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Shop").select('id, title, price, pictures, long_desc').eq("id", id).single();

    if (error) {
      console.log("Error fetching news: ", error);
    } else {
      setShirt(splitURL(data));
    }
    setLoading(false);
  };

  const splitURL = (data) => {
    data.pictures = data.pictures.split("|")
    return data
  }

  if (loading) {
    return (
      <div className="container mx-auto py-24">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-2/3 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <div>
              <Skeleton className="h-8 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-8" />
              <div className="flex flex-wrap gap-2 mb-8">
                <Skeleton className="h-8 w-12 rounded-full" />
                <Skeleton className="h-8 w-12 rounded-full" />
                <Skeleton className="h-8 w-12 rounded-full" />
                <Skeleton className="h-8 w-12 rounded-full" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!shirt) {
    return (
      <div className="container mx-auto py-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Termék nem található</h1>
          <p className="mb-8">A keresett termék nem található vagy már nem elérhető. ❌</p>
          <Link to="/polok">
            <Button className="rounded-[3rem] bg-gradient-to-r from-red-500 to-orange-500">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Vissza a pólókhoz
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24">

      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-100 via-red-400 to-red-700 flex items-center justify-center">
        <img src="/lovable-uploads/download.svg" />
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-[1rem] shadow-lg p-[1rem]">
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2 hover:bg-gray-100 max-w-3xl mx-auto"
          asChild
        >
          <Link to="/polok">
            <ArrowLeft size={16} />
            Vissza a többi termékhez
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            {shirt.pictures.length > 0 && (
              <div className="mt-16 mb-10">
                <div className="w-full">
                  <Carousel className="w-full max-w-3xl mx-auto">
                    <CarouselContent>
                      {shirt.pictures.map((image, index) => (
                        <CarouselItem key={index} >
                          <div className="p-1">
                            <div className="flex flex-col items-center justify-center overflow-hidden rounded-lg">
                              <img
                                src={image}
                                alt={shirt.title + " termék képei"}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="grid grid-cols-2">
                      <div className="flex justify-center">
                        <CarouselPrevious className="relative text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50" />
                      </div>
                      <div className="flex justify-center">
                        <CarouselNext className="relative text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50" />
                      </div>
                    </div>
                  </Carousel>
                </div>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{shirt.title}</h1>
            <p className="text-2xl font-medium text-red-600 mb-4">
              {shirt.price}
            </p>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{shirt.long_desc}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-medium mb-3">Válassz méretet:</h2>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-full text-sm border ${selectedSize === size
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-gray-100 text-gray-800 border-gray-200 hover:border-red-300'
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg"
              disabled={!selectedSize}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Megrendelem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShirtDetail;
