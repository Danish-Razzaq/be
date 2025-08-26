import React from "react";
import HeroSection from "./HeroSection";
import Slider from "./slider/page";
import DarkVeil from "./Components/DarkVeil/DarkVeil";
import MobileScreenPage from "./Components/MobileScreenPage.jsx";

const App = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  // if screen is less then 700px then show this mobile screen page
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? <MobileScreenPage /> : <Slider />}
    </>
  );
};

export default App;
