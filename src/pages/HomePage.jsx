import React from "react";
import Header from "../components/Header";
import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import Problem from "../components/sections/Problem";
import Solution from "../components/sections/Solution";
import About from "../components/sections/About";
import Features from "../components/sections/Features";
import Process from "../components/sections/Process";
import Investment from "../components/sections/Investment";
import FeaturedEpisodes from "../components/sections/FeaturedEpisodes";
import Team from "../components/sections/Team";
import Blog from "../components/sections/Blog";
import Newsletter from "../components/sections/Newsletter";
import Faq from "../components/sections/Faq";

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Problem />
      <Solution />
      <About />
      <Features />
      <Process />
      <Investment />
      <Team />
      <Blog />
      <Newsletter />
      <Faq />
    </>
  );
};

export default HomePage; 