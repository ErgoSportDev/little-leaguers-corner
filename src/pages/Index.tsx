
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Gallery from "@/components/Gallery";
import EventCalendar from "@/components/EventCalendar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  // Function to scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header scrollToSection={scrollToSection} />
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
