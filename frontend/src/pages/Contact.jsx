import React from "react";
import OnlyTitle from "../components/OnlyTitle";
import SubscribeNow from "../components/SubscribeNow";

function Contact() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-7">
        <OnlyTitle text1={"Contact"} text2={"Us"} fontSize={"4xl"} />
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Contact Form */}
        <form className="w-full md:w-1/2 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="6"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-slate-700 transition cursor-pointer"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 text-gray-700">
          <h3 className="text-2xl font-semibold mb-2">Get in Touch</h3>
          <p>
            Have questions about our sneakers or your order? We’re here to help.
            Feel free to reach out through the form or use the contact details
            below.
          </p>

          <div>
            <p>
              <strong>📍 Address:</strong> 123 Sneaker Street, Cityname, Country
            </p>
            <p>
              <strong>📞 Phone:</strong> +1-000-000-0000
            </p>
            <p>
              <strong>✉️ Email:</strong> support@sneakerworld.com
            </p>
          </div>

          <p>We usually respond within 24 hours.</p>
        </div>
      </div>

      <SubscribeNow />
    </div>
  );
}

export default Contact;
