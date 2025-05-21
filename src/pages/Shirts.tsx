
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface Shirt {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
}

const Shirts = () => {
  const [shirts] = useState<Shirt[]>([
    {
      id: 1,
      name: "Ergo Sport Póló - Piros",
      price: 5990,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Kényelmes pamut póló az Ergo Sport logójával",
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 2,
      name: "Ergo Sport Póló - Fekete",
      price: 5990,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Elegáns fekete póló az Ergo Sport logójával",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 3,
      name: "Ergo Sport Edzőpóló",
      price: 6990,
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Technikai anyagból készült edzőpóló",
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 4,
      name: "Ergo Sport Női Top",
      price: 4990,
      image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Kényelmes női edző top",
      sizes: ["XS", "S", "M", "L"]
    },
    {
      id: 5,
      name: "Ergo Sport Gyerek Póló",
      price: 4490,
      image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Gyerekeknek készült pamut póló",
      sizes: ["3-4", "5-6", "7-8", "9-10", "11-12"]
    },
    {
      id: 6,
      name: "Ergo Sport Hosszú Ujjú Póló",
      price: 7990,
      image: "https://images.unsplash.com/photo-1552660018-3a3350c5a174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Hűvösebb időre hosszú ujjú változat",
      sizes: ["S", "M", "L", "XL"]
    }
  ]);

  return (
    <div className="container mx-auto py-52">
      <h1 className="mb-4 text-3xl lg:text-4xl tracking-tight font-[700] text-black dark:text-white text-center">Ergo Sport Pólók</h1>
      <p className="text-center mb-10 max-w-2xl mx-auto">
        Vásárold meg az Ergo Sport hivatalos pólóit! Minden darabunk kényelmes, 
        tartós és tökéletesen képviseli az Ergo Sport szellemiségét.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shirts.map((shirt) => (
          <Card key={shirt.id} className="overflow-hidden flex flex-col h-full">
            <Link to={`/polok/${shirt.id}`} className="h-64 overflow-hidden">
              <img 
                src={shirt.image} 
                alt={shirt.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </Link>
            <CardHeader>
              <Link to={`/polok/${shirt.id}`}>
                <CardTitle className="hover:text-red-600 transition-colors">
                  {shirt.name}
                </CardTitle>
              </Link>
              <CardDescription className="text-lg font-medium text-red-600">
                {shirt.price} Ft
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{shirt.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {shirt.sizes.map((size) => (
                  <span 
                    key={size} 
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link to={`/polok/${shirt.id}`} className="w-full">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Részletek
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shirts;
