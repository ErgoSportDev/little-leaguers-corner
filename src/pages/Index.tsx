
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Gallery from "@/components/Gallery";
import EventCalendar from "@/components/EventCalendar";
// import Footer from "@/components/Footer";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useEffect, useRef } from "react";

const Index = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const hasScrolledRef = useRef(false);

  //scroll to from different page with link
  // useEffect(() => {
    // if (!hasScrolledRef.current && location.state?.scrollTo) {
    //   const el = document.getElementById(location.state.scrollTo);
    //   if (el) {
    //     el.scrollIntoView({ behavior: 'smooth' });
    //     hasScrolledRef.current = true;

    //     // Clear the scrollTo from history state to prevent reuse on refresh
    //     navigate(location.pathname, { replace: true, state: {} });
    //   }
    // }
  // }, [location, navigate]);

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
    </div>
  );
};

export default Index;
