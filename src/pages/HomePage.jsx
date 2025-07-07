import React from "react";
import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import Problem from "../components/sections/Problem";
import Solution from "../components/sections/Solution";
import About from "../components/sections/About";
import Features from "../components/sections/Features";
import Process from "../components/sections/Process";
import Team from "../components/sections/Team";
import Blog from "../components/sections/Blog";
import Faq from "../components/sections/Faq";
import SEOHead from "../components/SEOHead";
import { useSEO } from "../contexts/SEOContext";

const HomePage = () => {
  const { seoData } = useSEO();
  const homePageSEO = seoData.home;

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
        <div id="team">
          <Team />
        </div>
        <div id="blog">
          <Blog />
        </div>
        <Faq />
      </main>
    </>
  );
};

export default HomePage; // trigger redeploy
