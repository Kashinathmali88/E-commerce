import React from "react";
import OnlyTitle from "../components/OnlyTitle";
import SubscribeNow from "../components/SubscribeNow";
import hero from "../assets/hero-left.avif";
function About() {
  return (
    <div>
      <OnlyTitle text1={"About"} text2={"Us"} fontSize={"4xl"} />
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 max-w-6xl mx-auto">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={hero}
            alt="Sneaker World"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Right Text Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <p className="text-gray-600 text-lg">
            Welcome to <strong>Sneaker World</strong> – your ultimate
            destination for premium sneakers that blend fashion, function, and
            flair. We're passionate about helping sneaker lovers step into
            style.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
          <p className="text-gray-600 text-lg">
            Our mission is simple: to deliver authentic, trend-setting sneakers
            that reflect who you are. We believe sneakers are more than shoes –
            they’re a lifestyle, and we’re here to help you live it.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800">
            Why Choose Us?
          </h3>
          <ul className="list-disc list-inside text-gray-600 text-lg space-y-1">
            <li>100% authentic products, verified by experts</li>
            <li>Exclusive and latest drops from top brands</li>
            <li>Fast, secure, and reliable delivery</li>
            <li>A community built by sneakerheads, for sneakerheads</li>
          </ul>
        </div>
      </div>
      <SubscribeNow />
    </div>
  );
}

export default About;
