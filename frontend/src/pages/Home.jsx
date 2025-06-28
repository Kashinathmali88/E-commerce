import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OutPolicy from "../components/OutPolicy";
import SubscribeNow from "../components/SubscribeNow";

function Home() {
  return (
    <div className="">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OutPolicy />
      <SubscribeNow />
    </div>
  );
}

export default Home;
