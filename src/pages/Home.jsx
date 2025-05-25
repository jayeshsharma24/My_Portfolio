
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import About from '../components/Main/About';
import Techstack from '../components/Main/Techstack';
import Footer from '../components/Footer/Footer';
import ContactPage from '../components/Main/ContactPage';
import Project from '../components/Main/Project';
import { Element } from 'react-scroll';
import ScrollToTopButton  from '../components/ScrollToTopButton/ScrollToTopButton';
import SocialMediaLinks from '../components/Left-side-bar/SocialMediaLinks';
import Layout from '../components/Shopping/Layout';

const Home = () => {
  return (
         <div className="relative">
      {/* Sticky Navbar */}
      <Navbar />
       
      {/* Fixed Left Sidebar */}
     <SocialMediaLinks/>
      {/* Main Content */}
      <main
        className="
          ml-[90px] sm:ml-[100px] md:ml-[110px] lg:ml-[120px]
          px-4
          pt-[10px]
        "
      >
          <About />
          <Techstack />
          <Project />
          <ContactPage />
          <Layout/>
        <Footer />
      </main>
      <ScrollToTopButton />
    </div>
  
  )
}

export default Home;
