"use client";
import React from "react";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import About from "./sections/About";
import Podcasts from "./sections/Podcasts";
import FeaturedEpisodes from "./sections/FeaturedEpisodes";
import Blog from "./sections/Blog";
import Faq from "./sections/Faq";
import Newsletter from "./sections/Newsletter";
import Footer from "./sections/Footer";
import "../styles/JasminJayAlic.css";

function JasminJayAlic() {
  return (
    <div className="portfolio-container">
      <div className="portfolio-content">
        <Hero />
        <Features />
        <About />
        <Podcasts />
        <FeaturedEpisodes />
        <Blog />
        <Faq />
        <div className="footer-wrapper">
          <Newsletter />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default JasminJayAlic;
