import React, { useState } from "react";
import Popularclass from "../../PopularClass/Popularclass";
import Banner from "../Banner/Banner";
import FollowUsSection from "./FollowUs";

const Home = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const themeStyles = {
    light: {
      backgroundColor: "white",
      color: "black",
    },
    dark: {
      backgroundColor: "black",
      color: "white",
    },
  };

  return (
    <div className="text-center" style={{ ...themeStyles[theme] }}>
        <button className="btn mb-5"  onClick={toggleTheme}>Toggle DarkMode</button>
      <Banner />
      <Popularclass />
      <FollowUsSection />
      
    </div>
  );
};

export default Home;
