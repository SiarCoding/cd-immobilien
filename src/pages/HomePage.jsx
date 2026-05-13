import React, { useEffect } from "react";
import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import Problem from "../components/sections/Problem";
import Solution from "../components/sections/Solution";
import About from "../components/sections/About";
import Features from "../components/sections/Features";
import Process from "../components/sections/Process";
import Investment from "../components/sections/Investment";
import Team from "../components/sections/Team";
import Faq from "../components/sections/Faq";
import SEOHead from "../components/SEOHead";
import { useSEO } from "../contexts/SEOContext";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const { seoData } = useSEO();
  const homePageSEO = seoData.home;
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerHeight = 80; // Header height in pixels
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <SEOHead 
        title={homePageSEO.title}
        description={homePageSEO.description}
        keywords={homePageSEO.keywords}
        canonical={homePageSEO.canonical}
        ogImage={homePageSEO.ogImage}
        ogType="website"
      />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <Solution />
        <div id="about">
          <About />
        </div>
        <div id="features">
          <Features />
        </div>
        <Process />
        <Investment />
        <div id="team">
          <Team />
        </div>
        <Faq />
      </main>
    </>
  );
};

export default HomePage; // trigger redeploy
