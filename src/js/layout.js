import React, { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import Home from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import Card from "./views/card";
import injectContext from "./store/appContext";
import Details from "./component/details";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import CustomCursor from './component/customCursor';

const Layout = () => {
  const basename = process.env.BASENAME || "";

  useEffect(() => {
    generateStars();
  }, []);

  const starsRef = useRef(null);

  const generateStars = () => {
    const starsContainer = starsRef.current;
    const starCount = 1300;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = `${Math.random() * 3 + 1}px`;
      starsContainer.appendChild(star);
    }
  };

  return (
    <div id="root">
      <CustomCursor />
      <div className="main-content light-speed-background text-center">
        <div className="stars" ref={starsRef}></div>
        <BrowserRouter basename={basename}>
          <ScrollToTop>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/single/:theid" element={<Single />} />
              <Route path="*" element={<h1>Not found!</h1>} />
              <Route path="/card" element={<Card />} />
              <Route path="/details/:type/:uid" element={<Details />} />
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
};

export default injectContext(Layout);
