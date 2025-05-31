
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import supabase from "../supabase-client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface Shirt {
  id: number;
  title: string;
  price: number;
  image: string;
  short_desc: string;
  long_desc: string;
  pictures: string;
}

const Shirts = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopItems();
  }, []);

  const fetchShopItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Shop").select('id, title, price, short_desc, pictures').order('created_at', { ascending: false });

    if (error) {
      console.log("Error fetching news: ", error);
    } else {
      setItems(splitURL(data));
    }
    setLoading(false);
  };

  const splitURL = (data) => {
    data.map((item) => {
      item.pictures = item.pictures.split("|")
    })

    return data
  }

  return (
    <div className="container mx-auto py-52">

      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-100 via-red-400 to-red-700 flex items-center justify-center">
        <img src={`${import.meta.env.BASE_URL}/lovable-uploads/download.svg`} />
      </div>

      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h1 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white text-center">Ergo Sport Felszerelések</h1>
        <p className="text-center font-light text-gray-100 sm:text-xl dark:text-gray-400">
          Vásárold meg az Ergo Sport hivatalos felszereléseit! Minden darabunk kényelmes,
          tartós és tökéletesen képviseli az Ergo Sport szellemiségét.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <Card key={item.id} className="bg-white/60 backdrop-blur-sm overflow-hidden flex flex-col h-full border-none shadow-lg hover:shadow-md transition-shadow">
                <Link to={`/felszereles/${item.id}`} className="h-64 overflow-hidden">
                  <img
                    src={item.pictures[0]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </Link>
                <CardHeader>
                  <Link to={`/felszereles/${item.id}`}>
                    <CardTitle className="text-lg">
                      {item.title}
                    </CardTitle>
                  </Link>
                  <CardDescription className="text-lg font-medium text-red-600">
                    {item.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.short_desc}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Link to={`/felszereles/${item.id}`} className="w-full">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Részletek
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {items.length == 0 && (
            <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-[1rem] shadow-lg p-[1rem]">
              <p className="font-light text-black sm:text-xl dark:text-gray-400">Jelenleg nincs termék. ❌</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shirts;
