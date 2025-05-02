"use client";
import { supabase } from "@/app/supabaseClient";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCog, FaFileAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

interface Resume {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}
const DashboardUser = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState<Resume[]>([]);
  const { user } = useUser();
  useEffect(() => {
    getResume();
  }, [user?.id]);
  async function getResume() {
    await supabase.from("resume_titles").select("*").eq("user_id", user?.id);
    const { data } = await supabase
      .from("resume_titles")
      .select("*")
      .eq("user_id", user?.id);
    console.log(data);

    setResume(data || []);
  }
  async function handleSave() {
    const { error } = await supabase.from("resume_titles").insert([
      {
        user_id: user?.id,
        title: title,
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
    ]);
    setIsOpen(false);
    if (!error) {
      redirect(`${user?.id}/createResume`);
    }
    console.log(error);
  }
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-8">Resume Builder</h2>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setActiveTab("profile")}
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <FaUser /> <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab("resumes")}
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <FaFileAlt /> <span>My Resumes</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <FaCog /> <span>Settings</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-red-400 mt-10">
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        {activeTab === "profile" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <p>Update your profile information here.</p>
          </div>
        )}
        {activeTab === "resumes" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">My Resumes</h1>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                ➕ Create New
              </button>
            </div>
            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center">
                <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
                  <h2 className="text-xl font-bold mb-4">Create New Resume</h2>

                  <input
                    type="text"
                    placeholder="Enter resume title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Resume Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resume.map((itm) => {
                return (
                  <div
                    key={itm.id}
                    className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                  >
                    <h2 className="text-xl font-bold mb-2">{itm.title}</h2>
                    <p className="text-gray-600 text-sm mb-4">
                      Last updated:{" "}
                      {itm.created_at.split("T")[0] +
                        " " +
                        itm.created_at.split("T")[1].split("+")[0]}
                    </p>
                    <div className="flex space-x-4">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm">
                        View
                      </button>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab === "settings" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <p>Adjust your preferences and app settings here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardUser;
