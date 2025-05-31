
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import About from '../components/Main/About';
import Techstack from '../components/Main/Techstack';
import Footer from '../components/Footer/Footer';
import ContactPage from '../components/Main/ContactPage';
import Project from '../components/Main/Project';
import { Element } from 'react-scroll';
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton';
import SocialMediaLinks from '../components/Left-side-bar/SocialMediaLinks';
import Layout from '../components/Shopping/Layout';

const Home = () => {
  return (
    <div className="relative">

      <div className="fixed top-0 left-0 w-full z-50 bg-yellow-200 h-10 flex items-center overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-red-600 font-semibold text-sm sm:text-base px-4">

          • Currently working on Next.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          • Currently working on React &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          • Currently working on Kubernetes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          • Currently working on Terraform &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          • Currently working on AWS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          • Currently working on Docker &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>

      <Navbar isHomePage={true} />

      {/* Fixed Left Sidebar */}
      <SocialMediaLinks />
      {/* Main Content */}
      <main
        className="ml-[90px] sm:ml-[100px] md:ml-[110px] lg:ml-[120px] px-4 pt-[10px] " >
        <About />
        <Techstack />
        <Project />
        <Layout />
        <section id="contact"><ContactPage /></section>
        <Footer />
      </main>
      <ScrollToTopButton />
    </div>

  )
}

export default Home;
