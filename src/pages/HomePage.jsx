import React from "react";
import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import Problem from "../components/sections/Problem";
import Solution from "../components/sections/Solution";
import About from "../components/sections/About";
import Features from "../components/sections/Features";
import Process from "../components/sections/Process";
import FeaturedEpisodes from "../components/sections/FeaturedEpisodes";
import Team from "../components/sections/Team";
import Blog from "../components/sections/Blog";
import Newsletter from "../components/sections/Newsletter";
import Faq from "../components/sections/Faq";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Problem />
      <Solution />
      <About />
      <Features />
      <Process />
      <Team />
      <Blog />
      <Newsletter />
      <Faq />
    </>
  );
};

export default HomePage; 