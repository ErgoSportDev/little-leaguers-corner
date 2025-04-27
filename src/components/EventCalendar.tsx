
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EventCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events = [
    {
      date: new Date(2025, 3, 28),
      title: "Tennis Tournament",
      description: "Junior tennis tournament for ages 8-12",
      time: "2:00 PM - 5:00 PM",
      location: "Main Tennis Court"
    },
    {
      date: new Date(2025, 3, 30),
      title: "Swimming Class",
      description: "Regular swimming practice session",
      time: "4:00 PM - 5:30 PM",
      location: "Indoor Pool"
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
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
            {events.map((event, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>
                    {event.date.toLocaleDateString()} • {event.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    {event.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    📍 {event.location}
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
