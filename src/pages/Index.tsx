
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Gallery from "@/components/Gallery";
import EventCalendar from "@/components/EventCalendar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <div id="activities">
        <Gallery />
      </div>
      <div id="events">
        <EventCalendar />
      </div>
      <div id="teachers">
        <Introduction />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
