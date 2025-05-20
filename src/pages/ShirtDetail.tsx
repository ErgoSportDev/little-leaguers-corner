
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shirt as LucideShirt, ShoppingCart, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Shirt {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
}

const ShirtDetail = () => {
  const { id } = useParams();
  const [shirt, setShirt] = useState<Shirt | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const fetchShirt = () => {
      setLoading(true);
      
      // This would be replaced with an actual API call in production
      const shirts = [
        {
          id: 1,
          name: "Ergo Sport Póló - Piros",
          price: 5990,
          image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Kényelmes pamut póló az Ergo Sport logójával. Ez a piros póló tökéletes választás edzéshez, vagy hétköznapi viseletre. 100% pamut anyagból készült, kellemes viseletet biztosít egész nap.",
          sizes: ["S", "M", "L", "XL"]
        },
        {
          id: 2,
          name: "Ergo Sport Póló - Fekete",
          price: 5990,
          image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Elegáns fekete póló az Ergo Sport logójával. Kiváló minőségű anyagból készült, bármilyen alkalomra tökéletes választás. A póló anyaga rugalmas, így kényelmes viseletet biztosít edzés közben is.",
          sizes: ["S", "M", "L", "XL", "XXL"]
        },
        {
          id: 3,
          name: "Ergo Sport Edzőpóló",
          price: 6990,
          image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Technikai anyagból készült edzőpóló, amely elvezeti az izzadságot és szárazon tartja a testet intenzív edzés közben is. Légáteresztő anyagának köszönhetően tökéletes választás sportoláshoz.",
          sizes: ["S", "M", "L", "XL"]
        },
        {
          id: 4,
          name: "Ergo Sport Női Top",
          price: 4990,
          image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Kényelmes női edző top, mely tökéletesen illeszkedik a testhez. Rugalmas anyagból készült, így biztosítja a szabad mozgást edzés közben. Légáteresztő és gyorsan száradó.",
          sizes: ["XS", "S", "M", "L"]
        },
        {
          id: 5,
          name: "Ergo Sport Gyerek Póló",
          price: 4490,
          image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Gyerekeknek készült pamut póló, vidám színekben és mintákkal. Puha anyagból készült, így kényelmes viseletet biztosít egész nap. Tartós anyagból készült, amely ellenáll a gyakori mosásnak is.",
          sizes: ["3-4", "5-6", "7-8", "9-10", "11-12"]
        },
        {
          id: 6,
          name: "Ergo Sport Hosszú Ujjú Póló",
          price: 7990,
          image: "https://images.unsplash.com/photo-1552660018-3a3350c5a174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Hűvösebb időre hosszú ujjú változat, mely melegen tart, miközben kényelmes viseletet biztosít. Kiváló minőségű, tartós anyagból készült, amely megőrzi formáját mosás után is.",
          sizes: ["S", "M", "L", "XL"]
        }
      ];
      
      const foundShirt = shirts.find(s => s.id === Number(id));
      
      setTimeout(() => {
        setShirt(foundShirt || null);
        setLoading(false);
        if (foundShirt) {
          setSelectedSize(foundShirt.sizes[0]);
        }
      }, 500); // Simulate network delay
    };
    
    fetchShirt();
  }, [id]);

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
          <p className="mb-8">A keresett termék nem található vagy már nem elérhető.</p>
          <Link to="/polok">
            <Button>
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
      <Link to="/polok" className="inline-flex items-center text-gray-600 hover:text-red-600 mb-8">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Vissza a pólókhoz
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg">
          <img 
            src={shirt.image} 
            alt={shirt.name} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{shirt.name}</h1>
          <p className="text-2xl font-medium text-red-600 mb-4">
            {shirt.price} Ft
          </p>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{shirt.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Válassz méretet:</h2>
            <div className="flex flex-wrap gap-2">
              {shirt.sizes.map((size) => (
                <button 
                  key={size} 
                  className={`px-4 py-2 rounded-full text-sm border ${
                    selectedSize === size 
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
            Kosárba
          </Button>
          
          <div className="mt-6 text-sm text-gray-500">
            <p className="flex items-center">
              <LucideShirt className="mr-2 h-4 w-4" />
              Kiváló minőségű, 100% pamut anyag
            </p>
            <p className="mt-1">Ingyenes kiszállítás 15.000 Ft feletti rendelés esetén</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShirtDetail;
