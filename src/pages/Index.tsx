
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Gallery from "@/components/Gallery";
import EventCalendar from "@/components/EventCalendar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Introduction />
      <Gallery />
      <EventCalendar />
      <Footer />
    </div>
  );
};

export default Index;
