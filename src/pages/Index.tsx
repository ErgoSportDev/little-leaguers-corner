
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Gallery from "@/components/Gallery";
import EventCalendar from "@/components/EventCalendar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Introduction />
      <Gallery />
      <EventCalendar />
    </div>
  );
};

export default Index;
