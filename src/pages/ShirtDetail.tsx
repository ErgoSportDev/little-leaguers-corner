
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shirt as LucideShirt, ShoppingCart, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import supabase from "../supabase-client";
import { corsHeaders } from "../cors"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
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
  const sizes = ["128", "140", "152", "164", "XS", "S", "M", "L", "XL", "XXL"];
  const [open, setOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [respMessage, setRespMessage] = useState(null);
  const [orderLoader, setOrderLoader] = useState(false);

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

  const emailOrder = async (message) => {
    try {
      setOrderLoader(true)
      const response = await fetch("https://vwcicmjfgefjlumdetva.supabase.co/functions/v1/email-send-shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message
        }),
      });

      if (response.ok) {
        setOrderLoader(false)
        setRespMessage("A megrendelés sikeresen megtörtént! Hamarosan felvesszük Önnel a kapcsolatot emailben a további teendőkkel és részletekkel kapcsolatban. ✅")
      } else {
        setOrderLoader(false)
        setRespMessage("Hiba történt a rendelés során, kérlek próbáld újra később. ❌")
      }

    } catch (error) {
      setOrderLoader(false)
      setRespMessage("Hiba történt a rendelés során, kérlek próbáld újra később. ❌")
    }
  }

  const orderItem = () => {
    if (selectedSize) {
      if (isValidEmail(customerEmail)) {
        setEmailValid(true)
        let message = "Újabb Termék Került Megrendelésre!<br><br><strong>Termék:</strong> " + shirt.title + "<br> <strong>Méret:</strong> " + selectedSize + "<br> <strong>Megrendelő:</strong> " + customerEmail
        emailOrder(message)
      } else {
        setEmailValid(false)
      }
    }
  }

  const splitURL = (data) => {
    data.pictures = data.pictures.split("|")
    return data
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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
          <Link to="/felszereles">
            <Button className="rounded-[3rem] bg-gradient-to-r from-red-500 to-orange-500">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Vissza a felszerelésekhez
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
          <Link to="/felszereles">
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
              onClick={() => setOpen(true)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Megrendelem
            </Button>
            {!selectedSize && <span className="text-red-400">Kérem válasszon méretet!</span>}
          </div>

          <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                        {/* <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" /> */}👕
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                          {shirt.title} megrendelése
                        </DialogTitle>
                        {respMessage != null ?
                          <div className="pt-10 pb-5 font-semibold">
                            <span className="text-lg">
                              {respMessage}
                            </span>
                          </div>
                          :
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 pb-5">
                              A megrendelés leadásához kérjük, adja meg e-mail címét, hogy a rendelés részleteiről és állapotáról értesíteni tudjuk.
                            </p>
                            <div className="mb-6">
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail Cím</label>
                              <input
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="gipsz.jakab@email.com"
                                required />
                              {!emailValid && <span className="text-red-400 text-sm">Email formátuma nem megfelelő!</span>}
                            </div>
                            <div className="mb-6">
                              <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pb-2">Választott Méret</span>
                              <span className="rounded-full text-xxl border bg-red-300 text-white border-red-400 text-center pl-[10px] pr-[10px] p-[7px]">{selectedSize}</span>
                            </div>
                          </div>
                        }
                        {orderLoader &&
                          <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="pl-3">Kérem Várjon!</span>
                            <span className="sr-only">Betöltés...</span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={orderItem}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Megrendelés
                    </button>
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Vissza
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>


        </div>
      </div>
    </div>
  );
};

export default ShirtDetail;
