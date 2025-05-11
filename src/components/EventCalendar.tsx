
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import supabase from "../supabase-client";

const EventCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    fetchTodos();
  }, []);

  const [esemenyek, setEsemenyek] = useState([]);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("Events").select("*");
    if (error) {
      console.log("Error fetching: ", error);
    } else {
      setEsemenyek(data)
    }
  };

  const events = [
    {
      date: new Date(2025, 3, 28),
      title: "Tenisz Bajnokság",
      description: "Junior tenisz verseny 8-12 éves korosztály számára",
      time: "14:00 - 17:00",
      location: "Fő Teniszpálya"
    },
    {
      date: new Date(2025, 3, 30),
      title: "Úszás Óra",
      description: "Rendszeres úszás edzés",
      time: "16:00 - 17:30",
      location: "Beltéri Medence"
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Közelgő Események</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border shadow-lg bg-white p-4"
              classNames={{
                day_selected: "bg-red-600 text-white hover:bg-red-500 focus:bg-red-500",
                day_today: "bg-red-100 text-red-600",
              }}
            />
          </div>
          <div className="space-y-4">
            {esemenyek.map((event, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">{event.event_name}</CardTitle>
                  <CardDescription>
                    {new Date(event.start_date).toLocaleDateString()} • {new Date(event.start_date).toLocaleTimeString()}
                    {/*console.log(new Date(event.start_date).toLocaleTimeString())*/}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    {event.event_description}
                  </p>
                  <p className="text-sm text-gray-500">
                    📍 {event.event_place}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;
