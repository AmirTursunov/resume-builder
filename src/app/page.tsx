"use client";
import { SignOutButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import { redirect } from "next/navigation";

const Home = () => {
  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md min-h-[80px]">
        <div className="text-2xl font-semibold text-gray-800">Smart Resume</div>

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

        <button
          onClick={() => redirect("/sign-in")}
          className="flex items-center gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-black px-4 py-2 rounded-md transition-colors"
        >
          <span>Login</span>
          <LogIn size={20} />
        </button>
        <div>
          <SignOutButton />
        </div>
      </nav>
      <div className="flex flex-col justify-center items-center my-20 gap-10">
        <h1 className="text-5xl md:text-6xl max-w-[405px] md:max-w-[800px] text-center  sm:leading-18 font-medium">
          Create Professional Resumes with Ease
        </h1>
        <p className="max-w-4xl text-center  tracking-normal">
          Effortlessly create and customize your professional resume using our
          easy-to-use form builder. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </p>
        <button className="bg-blue-500 p-3 rounded">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
