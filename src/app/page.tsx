"use client";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import "./section1.css";
import Features from "./features/page";
import { FiLogIn } from "react-icons/fi";
import Testimonials from "./testimonials/page";
import Footer from "./footer/page";
const Home = () => {
  const { user } = useUser();
  function goToDashboard() {
    if (user?.id) {
      redirect(`/dashboard/${user?.id}`);
    } else {
      alert("You need to sign-in.");
      redirect("/sign-in");
    }
  }
  return (
    <div>
      <div className="section1">
        <nav className="flex items-center justify-between px-6 py-4 shadow-md min-h-[80px]">
          <div className="text-2xl font-semibold text-gray-800">
            Smart Resume
          </div>

          <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
            <li className="hover:text-black cursor-pointer transition-colors">
              <a href="#">Home</a>
            </li>
            <li className="hover:text-black cursor-pointer transition-colors">
              <a href="#">Team</a>
            </li>
            <li className="hover:text-black cursor-pointer transition-colors">
              <a href="#">Feature</a>
            </li>
            <li className="hover:text-black cursor-pointer transition-colors">
              <a href="#">Pricing</a>
            </li>
          </ul>

          <div
            onClick={() => redirect("/sign-in")}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-black px-4 py-2 rounded-md transition-colors"
          >
            {user ? (
              <div>
                <SignOutButton />
              </div>
            ) : (
              <div >
                <FiLogIn size={20} />
              </div>
            )}
          </div>
        </nav>
        <div className="flex flex-col justify-center items-center my-20 gap-12">
          <h1 className="text-5xl md:text-6xl max-w-[405px] md:max-w-[800px] text-center sm:leading-18 font-medium">
            Create Professional Resumes with Ease
          </h1>
          <p className="max-w-4xl text-center  tracking-normal">
            Effortlessly create and customize your professional resume using our
            easy-to-use form builder. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <button
            onClick={goToDashboard}
            className="bg-[#164E63] py-3 rounded text-white px-5 hover:bg-cyan-800 cursor-pointer"
          >
            Get Started
          </button>
        </div>
        <div className="flex items-center justify-center">
          <hr
            style={{ width: "80%", margin: "auto" }}
            className="border-gray-300"
          />
        </div>
      </div>

      <div className="bg-[#f8f9ff]">
        <Features />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
