import React from "react";
import { CiSettings } from "react-icons/ci";
import { MdSecurity } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

const Features = () => {
  return (
    <div className="flex flex-col gap-20 px-5 py-10">
      <div className="flex items-center justify-center flex-col gap-5 text-center">
        <h1 className="text-4xl md:text-6xl font-medium">Our Features</h1>
        <p className="max-w-xl text-gray-600">
          Qui elit labore in nisi dolore tempor anim laboris ipsum ad ad
          consequat id. Dolore et sint mollit in nisi tempor culpa consectetur.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="flex gap-5 bg-white p-6 rounded-lg hover:shadow-lg transition">
          <div>
            <CiSettings className="bg-blue-50 text-5xl p-3 rounded-full" />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Customization</h2>
            <p className="text-gray-600 text-sm">
              Tailor our product to suit your needs. Tailor our product to suit
              your needs.
            </p>
          </div>
        </div>
        <div className="flex gap-5 bg-white p-6 rounded-lg hover:shadow-lg transition">
          <div>
            <MdSecurity className="bg-blue-50 text-5xl p-3 rounded-full" />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Security</h2>
            <p className="text-gray-600 text-sm">
              Protect your data with advanced security measures.
            </p>
          </div>
        </div>
        <div className="flex gap-5 bg-white p-6 rounded-lg hover:shadow-lg transition">
          <div>
            <BiSupport className="bg-blue-50 text-5xl p-3 rounded-full" />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Support</h2>
            <p className="text-gray-600 text-sm">
              24/7 support to help you whenever you need assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
