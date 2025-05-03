"use client";
import React, { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FaFileDownload } from "react-icons/fa";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { supabase } from "@/app/supabaseClient";

interface Experience {
  companyName: string;
  role: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string;
}
interface Project {
  projectName: string;
  deployLink: string;
  repoLink: string;
  description: string;
}
interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}
interface Skill {
  name: string;
  skillList: string;
}
interface Language {
  name: string;
  level: string;
}
const CreateResume = () => {
  const [openExp, setOpenExp] = useState(false);
  const [openPro, setOpenPro] = useState(false);
  const [openEdu, setOpenEdu] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [openSkill, setOpenSkill] = useState(false);
  const [general, setGeneral] = useState({
    fullname: "",
    email: "",
    mobileNumber: "",
    linkedIn: "",
    gitHub: "",
    portfolio: "",
    address: "",
    jobTitle: "",
    summary: "",
  });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [currentExperience, setCurrentExperience] = useState({
    companyName: "",
    role: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjects, setCurrentProjects] = useState({
    projectName: "",
    deployLink: "",
    repoLink: "",
    description: "",
  });
  const [education, setEducation] = useState<Education[]>([]);
  const [currentEducation, setCurrentEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [currentSkills, setCurrentSkills] = useState({
    name: "",
    skillList: "",
  });
  const [language, setLanguage] = useState<Language[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState({
    name: "",
    level: "",
  });
  const [editingIndex, setEditingIndex] = useState<null | number>(null);
  useEffect(() => {
    if (!openEdu) {
      setEditingIndex(null);
      setCurrentEducation({
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  }, [openEdu]);

  useEffect(() => {
    const editResume = localStorage.getItem("editResume");
    if (editResume) {
      fetchResumeData(editResume);
    }
  }, []);
  // edit function
  async function fetchResumeData(id: string) {
    // general
    const { data: generalQuestion } = await supabase
      .from("resumes")
      .select("*")
      .eq("resume_title_id", id)
      .single();
    if (generalQuestion) {
      setGeneral({
        fullname: generalQuestion.fullName,
        email: generalQuestion.email,
        mobileNumber: generalQuestion.mobileNumber,
        linkedIn: generalQuestion.linkedIn,
        gitHub: generalQuestion.gitHub,
        portfolio: generalQuestion.portfolio,
        address: generalQuestion.address,
        jobTitle: generalQuestion.jobTitle,
        summary: generalQuestion.summary,
      });
    }

    // experience
    const { data: experience } = await supabase
      .from("experiences")
      .select("*")
      .eq("resume_id", id);

    if (experience) {
      setExperiences(experience);
    }
    // projects
    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .eq("resume_id", id);

    if (projects) {
      setProjects(projects);
    }
    // education
    const { data: education } = await supabase
      .from("educations")
      .select("*")
      .eq("resume_id", id);

    if (education) {
      setEducation(education);
    }
    // skills
    const { data: skills } = await supabase
      .from("skills")
      .select("*")
      .eq("resume_id", id);

    if (skills) {
      setSkills(skills);
    }
    // language
    const { data: language } = await supabase
      .from("languages")
      .select("*")
      .eq("resume_id", id);

    if (language) {
      setLanguage(language);
    }
  }

  const toggleDrawer = () => setOpenExp(!openExp);
  const toggleDrawerPro = () => setOpenPro(!openPro);
  const toggleDrawerEdu = () => setOpenEdu(!openEdu);
  const toggleDrawerLang = () => setOpenLang(!openLang);
  const toggleDrawerSkill = () => setOpenSkill(!openSkill);
  async function handleSaveExperience() {
    if (!currentExperience.start_date) {
      alert("Iltimos, start date ni tanlang.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const newExperience = {
      companyName: currentExperience.companyName,
      role: currentExperience.role,
      location: currentExperience.location,
      start_date: currentExperience.start_date,
      end_date: currentExperience.end_date || today,
      description: currentExperience.description,
    };
    if (editingIndex !== null) {
      const updated = [...experiences];
      updated[editingIndex] = currentExperience;
      setExperiences(updated);
    } else {
      setExperiences((prevExperiences) => [...prevExperiences, newExperience]);
    }
    setCurrentExperience({
      companyName: "",
      role: "",
      location: "",
      description: "",
      start_date: "",
      end_date: "",
    });
    setEditingIndex(null);
    setOpenExp(false);
  }
  async function handleSaveProjects() {
    const newProjects = {
      projectName: currentProjects.projectName,
      deployLink: currentProjects.deployLink,
      repoLink: currentProjects.repoLink,
      description: currentProjects.description,
    };
    if (editingIndex !== null) {
      const updated = [...projects];
      updated[editingIndex] = currentProjects;
      setProjects(updated);
    } else {
      setProjects((prevProjects) => [...prevProjects, newProjects]);
      setCurrentProjects({
        projectName: "",
        deployLink: "",
        repoLink: "",
        description: "",
      });
    }
    setEditingIndex(null);
    setOpenPro(false);
  }
  async function handleSaveEducation() {
    const today = new Date().toISOString().split("T")[0];
    const newEducation = {
      institution: currentEducation.institution,
      degree: currentEducation.degree,
      field: currentEducation.field,
      startDate: currentEducation.startDate,
      endDate: currentEducation.endDate || today,
      description: currentEducation.description,
    };
    if (editingIndex !== null) {
      const updated = [...education];
      updated[editingIndex] = currentEducation;
      setEducation(updated);
      setCurrentEducation({
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } else {
      setEducation((prevEducation) => [...prevEducation, newEducation]);
      setCurrentEducation({
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }

    setEditingIndex(null);
    setOpenEdu(false);
  }
  async function handleSaveSkill() {
    const newSkill = {
      name: currentSkills.name,
      skillList: currentSkills.skillList,
    };

    if (editingIndex !== null) {
      const updated = [...skills];
      updated[editingIndex] = currentSkills;
      setSkills(updated);
    } else {
      setSkills((prevSkill) => [...prevSkill, newSkill]);
    }
    setCurrentSkills({
      name: "",
      skillList: "",
    });
    setEditingIndex(null);
    setOpenSkill(false);
  }
  async function handleSaveLanguage() {
    const newLang = {
      name: currentLanguage.name,
      level: currentLanguage.level,
    };

    if (editingIndex !== null) {
      const updated = [...language];
      updated[editingIndex] = currentLanguage;
      setLanguage(updated);
    } else {
      setLanguage((prevLang) => [...prevLang, newLang]);
    }
    setCurrentLanguage({
      name: "",
      level: "",
    });
    setEditingIndex(null);
    setOpenLang(false);
  }
  function deleteExperience(index: number) {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  }
  function editExperience(index: number) {
    setCurrentExperience(experiences[index]);
    setEditingIndex(index);
    setOpenExp(true);
  }
  function deleteProject(index: number) {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  }
  function editProject(index: number) {
    setCurrentProjects(projects[index]);
    setEditingIndex(index);
    setOpenPro(true);
  }
  function editEducation(index: number) {
    setCurrentEducation(education[index]);
    setEditingIndex(index);
    setOpenEdu(true);
  }
  function deleteEducation(index: number) {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  }
  function editSkill(index: number) {
    setCurrentSkills(skills[index]);
    setEditingIndex(index);
    setOpenSkill(true);
  }
  function deleteSkill(index: number) {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  }
  function deleteLang(index: number) {
    setLanguage((prev) => prev.filter((_, i) => i !== index));
  }
  function editLang(index: number) {
    setCurrentLanguage(language[index]);
    setEditingIndex(index);
    setOpenLang(true);
  }

  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const inputData = contentRef.current;
    if (!inputData) return;

    try {
      const canvas = await html2canvas(inputData, {
        scale: 2, // Rasm sifatini yaxshilaydi
        useCORS: true, // Tashqi rasmlar uchun
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio =
        Math.min(pageWidth / imgWidth, pageHeight / imgHeight) * 1.07;

      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
      pdf.save("my-resume.pdf");
    } catch (error) {
      console.error("PDF export error:", error);
    }

    // save to supabase
    const resumeId = localStorage.getItem("resume");

    // general
    const { data: existingResume } = await supabase
      .from("resumes")
      .select("id")
      .eq("resume_title_id", resumeId)
      .maybeSingle();

    const generalData = {
      fullName: general.fullname,
      email: general.email,
      mobileNumber: general.mobileNumber,
      linkedIn: general.linkedIn,
      gitHub: general.gitHub,
      portfolio: general.portfolio,
      address: general.address,
      jobTitle: general.jobTitle,
      summary: general.summary,
      resume_title_id: resumeId,
    };

    if (existingResume) {
      await supabase
        .from("resumes")
        .update(generalData)
        .eq("resume_title_id", resumeId);
    } else {
      await supabase.from("resumes").insert([generalData]);
    }

    await supabase.from("projects").delete().eq("resume_id", resumeId);
    await supabase.from("experiences").delete().eq("resume_id", resumeId);
    await supabase.from("educations").delete().eq("resume_id", resumeId);
    await supabase.from("skills").delete().eq("resume_id", resumeId);
    await supabase.from("languages").delete().eq("resume_id", resumeId);

    // INSERT
    await supabase.from("projects").insert(
      projects.map((project) => ({
        ...project,
        resume_id: resumeId,
      }))
    );

    await supabase.from("experiences").insert(
      experiences.map((experience) => ({
        ...experience,
        resume_id: resumeId,
      }))
    );

    await supabase.from("educations").insert(
      education.map((edu) => ({
        ...edu,
        resume_id: resumeId,
      }))
    );

    await supabase.from("skills").insert(
      skills.map((skill) => ({
        ...skill,
        resume_id: resumeId,
      }))
    );

    const { error } = await supabase.from("languages").insert(
      language.map((lang) => ({
        ...lang,
        resume_id: resumeId,
      }))
    );

    if (error) console.log("Language insert error:", error);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 md:p-8 bg-gray-100">
      {/* Left form */}
      <div className="w-full md:w-1/2 md:pr-8">
        <h2 className="text-2xl font-bold mb-6">General – Social</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Inputs */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Full Name
            </label>
            <input
              value={general.fullname}
              required
              onChange={(e) =>
                setGeneral({ ...general, fullname: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              value={general.email}
              required
              onChange={(e) =>
                setGeneral({ ...general, email: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Mobile Number
            </label>
            <input
              value={general.mobileNumber}
              required
              onChange={(e) =>
                setGeneral({ ...general, mobileNumber: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="+998 91 123 45 67"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">LinkedIn</label>
            <input
              value={general.linkedIn}
              required
              onChange={(e) =>
                setGeneral({ ...general, linkedIn: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="linkedin.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">GitHub</label>
            <input
              value={general.gitHub}
              required
              onChange={(e) =>
                setGeneral({ ...general, gitHub: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="github.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Portfolio
            </label>
            <input
              value={general.portfolio}
              required
              onChange={(e) =>
                setGeneral({ ...general, portfolio: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              value={general.address}
              required
              onChange={(e) =>
                setGeneral({ ...general, address: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="Tashkent, Uzbekistan"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Job Title
            </label>
            <input
              value={general.jobTitle}
              required
              onChange={(e) =>
                setGeneral({ ...general, jobTitle: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="Frontend Developer"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Summary</label>
          <textarea
            value={general.summary}
            required
            onChange={(e) =>
              setGeneral({ ...general, summary: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Write your message..."
          ></textarea>
        </div>

        {/* Experiences */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Experiences</h3>
          <div>
            {experiences.map((itm, index) => (
              <div
                key={index}
                className="mb-3 p-3 border rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {itm.companyName}
                  </h3>
                  <p className="text-gray-600">{itm.role}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => editExperience(index)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => deleteExperience(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={toggleDrawer}
            className="border-dashed border-2 p-4 rounded text-center cursor-pointer"
          >
            Add New Item +
          </div>

          {/* Drawer */}
          <Drawer.Root open={openExp} onOpenChange={setOpenExp}>
            <Drawer.Trigger />
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 flex justify-center" />
              <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none flex justify-center">
                <div className="p-8 flex flex-col w-full max-w-2xl">
                  <Drawer.Title className="text-lg text-center font-semibold">
                    Your Experiences
                  </Drawer.Title>
                  <div className="text-sm text-gray-500 mb-4 flex flex-col">
                    {/* Company */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Company Name
                        </label>
                        <input
                          required
                          value={currentExperience.companyName}
                          onChange={(e) =>
                            setCurrentExperience({
                              ...currentExperience,
                              companyName: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Role
                        </label>
                        <input
                          required
                          value={currentExperience.role}
                          onChange={(e) =>
                            setCurrentExperience({
                              ...currentExperience,
                              role: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter role"
                        />
                      </div>
                    </div>
                    {/* Location */}
                    <div className="mt-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Location
                        </label>
                        <input
                          required
                          value={currentExperience.location}
                          onChange={(e) =>
                            setCurrentExperience({
                              ...currentExperience,
                              location: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter location"
                        />
                      </div>
                    </div>
                    {/* date */}
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Start date
                        </label>
                        <input
                          required
                          type="date"
                          value={currentExperience.start_date}
                          onChange={(e) =>
                            setCurrentExperience({
                              ...currentExperience,
                              start_date: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded "
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          End date
                        </label>
                        <input
                          value={currentExperience.end_date}
                          onChange={(e) =>
                            setCurrentExperience({
                              ...currentExperience,
                              end_date: e.target.value,
                            })
                          }
                          type="date"
                          className="w-full border p-2 rounded "
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={currentExperience.description}
                        onChange={(e) =>
                          setCurrentExperience({
                            ...currentExperience,
                            description: e.target.value,
                          })
                        }
                        className="w-full border  focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg p-3 min-h-[120px] resize-none"
                        placeholder="Write your description..."
                      />
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={handleSaveExperience}
                        className="py-2 w-40 rounded bg-black text-white "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Projects</h3>
          <div>
            {projects.map((itm, index) => (
              <div
                key={index}
                className="mb-3 p-3 border rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {itm.projectName}
                  </h3>
                  <p className="text-gray-600">{itm.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editProject(index)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => deleteProject(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={toggleDrawerPro}
            className="border-dashed border-2 p-4 rounded text-center cursor-pointer"
          >
            Add New Item +
          </div>
          <Drawer.Root open={openPro} onOpenChange={setOpenPro}>
            <Drawer.Trigger />
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 flex justify-center" />
              <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none flex justify-center">
                <div className="p-8 flex flex-col w-full max-w-2xl">
                  <Drawer.Title className="text-lg text-center font-semibold">
                    Your Projects
                  </Drawer.Title>
                  <div className="text-sm text-gray-500 mb-4 flex flex-col">
                    {/* Project */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Project Name
                        </label>
                        <input
                          required
                          value={currentProjects.projectName}
                          onChange={(e) =>
                            setCurrentProjects({
                              ...currentProjects,
                              projectName: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter project name"
                        />
                      </div>
                    </div>
                    {/* Location */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Deploy link
                        </label>
                        <input
                          required
                          value={currentProjects.deployLink}
                          onChange={(e) =>
                            setCurrentProjects({
                              ...currentProjects,
                              deployLink: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter deploy link"
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Repository link
                        </label>
                        <input
                          required
                          value={currentProjects.repoLink}
                          onChange={(e) =>
                            setCurrentProjects({
                              ...currentProjects,
                              repoLink: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter repository link"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={currentProjects.description}
                        onChange={(e) =>
                          setCurrentProjects({
                            ...currentProjects,
                            description: e.target.value,
                          })
                        }
                        className="w-full border  focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg p-3 min-h-[120px] resize-none"
                        placeholder="Write your description..."
                      />
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={handleSaveProjects}
                        className="py-2 w-40 rounded bg-black text-white "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Education</h3>
          <div>
            {education.map((itm, index) => (
              <div
                key={index}
                className="mb-3 p-3 border rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {itm.institution}
                  </h3>
                  <p className="text-gray-600">{itm.degree}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => editEducation(index)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => deleteEducation(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={toggleDrawerEdu}
            className="border-dashed border-2 p-4 rounded text-center cursor-pointer"
          >
            Add New Item +
          </div>
          <Drawer.Root open={openEdu} onOpenChange={setOpenEdu}>
            <Drawer.Trigger />
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 flex justify-center" />
              <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none flex justify-center">
                <div className="p-8 flex flex-col w-full max-w-2xl">
                  <Drawer.Title className="text-lg text-center font-semibold">
                    Institution
                  </Drawer.Title>
                  <div className="text-sm text-gray-500 mb-4 flex flex-col">
                    {/* Education */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Institution Name
                        </label>
                        <input
                          required
                          value={currentEducation.institution}
                          onChange={(e) =>
                            setCurrentEducation({
                              ...currentEducation,
                              institution: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter institution name"
                        />
                      </div>
                    </div>
                    {/* Degree */}
                    <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Degree
                        </label>
                        <input
                          required
                          value={currentEducation.degree}
                          onChange={(e) =>
                            setCurrentEducation({
                              ...currentEducation,
                              degree: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter degree"
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Field of study
                        </label>
                        <input
                          required
                          value={currentEducation.field}
                          onChange={(e) =>
                            setCurrentEducation({
                              ...currentEducation,
                              field: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter field of study"
                        />
                      </div>
                    </div>
                    {/* date */}
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Start date
                        </label>
                        <input
                          required
                          value={currentEducation.startDate}
                          onChange={(e) =>
                            setCurrentEducation({
                              ...currentEducation,
                              startDate: e.target.value,
                            })
                          }
                          type="date"
                          className="w-full border p-2 rounded "
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          End date
                        </label>
                        <input
                          value={currentEducation.endDate}
                          onChange={(e) =>
                            setCurrentEducation({
                              ...currentEducation,
                              endDate: e.target.value,
                            })
                          }
                          type="date"
                          className="w-full border p-2 rounded "
                        />
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        onChange={(e) =>
                          setCurrentEducation({
                            ...currentEducation,
                            description: e.target.value,
                          })
                        }
                        className="w-full border  focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg p-3 min-h-[120px] resize-none"
                        placeholder="Write your description..."
                      />
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={handleSaveEducation}
                        className="py-2 w-40 rounded bg-black text-white "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* skills */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Skills</h3>
          <div>
            {skills.map((itm, index) => (
              <div
                key={index}
                className="mb-3 p-3 border rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {itm.name}
                  </h3>
                  <p className="text-gray-600">{itm.skillList} </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => editSkill(index)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => deleteSkill(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={toggleDrawerSkill}
            className="border-dashed border-2 p-4 rounded text-center cursor-pointer"
          >
            Add New Item +
          </div>
          <Drawer.Root open={openSkill} onOpenChange={setOpenSkill}>
            <Drawer.Trigger />
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 flex justify-center" />
              <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none flex justify-center">
                <div className="p-8 flex flex-col w-full max-w-2xl">
                  <Drawer.Title className="text-lg text-center font-semibold">
                    Your Skills
                  </Drawer.Title>
                  <div className="text-sm text-gray-500 mb-4 flex flex-col">
                    <div className="flex flex-col  gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Skills
                        </label>
                        <input
                          required
                          value={currentSkills.name}
                          onChange={(e) =>
                            setCurrentSkills({
                              ...currentSkills,
                              name: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter Language"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mt-4  gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Skill list
                        </label>
                        <input
                          required
                          value={currentSkills.skillList}
                          onChange={(e) =>
                            setCurrentSkills({
                              ...currentSkills,
                              skillList: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter Language"
                        />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={handleSaveSkill}
                        className="py-2 w-40 rounded bg-black text-white "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* Language */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Language</h3>
          <div>
            {language.map((itm, index) => (
              <div
                key={index}
                className="mb-3 p-3 border rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {itm.name}
                  </h3>
                  <p className="text-gray-600">{itm.level} </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => editLang(index)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => deleteLang(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={toggleDrawerLang}
            className="border-dashed border-2 p-4 rounded text-center cursor-pointer"
          >
            Add New Item +
          </div>
          <Drawer.Root open={openLang} onOpenChange={setOpenLang}>
            <Drawer.Trigger />
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 flex justify-center" />
              <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none flex justify-center">
                <div className="p-8 flex flex-col w-full max-w-2xl">
                  <Drawer.Title className="text-lg text-center font-semibold">
                    Your Language Skills
                  </Drawer.Title>
                  <div className="text-sm text-gray-500 mb-4 flex flex-col">
                    {/* Language */}
                    <div className="flex flex-col  gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Language
                        </label>
                        <input
                          value={currentLanguage.name}
                          required
                          onChange={(e) =>
                            setCurrentLanguage({
                              ...currentLanguage,
                              name: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          placeholder="Enter Language"
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-1">
                          Level
                        </label>
                        <select
                          value={currentLanguage.level}
                          required
                          onChange={(e) =>
                            setCurrentLanguage({
                              ...currentLanguage,
                              level: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="fluent">Fluent</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={handleSaveLanguage}
                        className="py-2 w-40 rounded bg-black text-white "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>

      {/* Right  */}
      <div
        ref={contentRef}
        style={{ color: "#1f2937", height: "1123px" }}
        className="w-full md:w-1/2 mt-8 md:mt-0 bg-white rounded-lg p-8 space-y-6 text-gray-800"
      >
        {/* Header */}
        <div className="text-center pb-4">
          <h1 className="text-3xl font-bold">{general.fullname}</h1>
          <p className="text-sm">{general.jobTitle}</p>
          <div className="mt-2 space-y-1 text-sm">
            <p>{general.address}</p>
            <p>
              Email: {general.email} | Phone: {general.mobileNumber}
            </p>
            <p>
              <a
                style={{ color: "blue" }}
                href={general.portfolio}
                className=" hover:underline"
              >
                Portfolio
              </a>{" "}
              |
              <a
                style={{ color: "blue" }}
                href={general.gitHub}
                className=" hover:underline ml-1"
              >
                GitHub
              </a>{" "}
              |
              <a
                style={{ color: "blue" }}
                href={general.linkedIn}
                className=" hover:underline ml-1"
              >
                LinkedIn
              </a>
            </p>
          </div>

          <div className="mt-4">
            <p style={{ color: "#374151" }} className="text-sm italic">
              {general.summary}
            </p>
          </div>
        </div>
        {/* Experience */}
        <div>
          <h2 className="text-xl font-semibold border-b mb-2 pb-3 ">
            Experience
          </h2>
          {experiences.map((itm, index) => (
            <div key={index} className="mb-4 flex justify-between">
              <div>
                <h3 className="text-lg font-bold">{itm.companyName}</h3>
                <p className="text-sm">{itm.role}</p>
              </div>
              <div style={{ color: "#374151" }} className="text-sm">
                <p>
                  {itm.start_date} – {itm.end_date} | {itm.location}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Projects */}
        <div>
          <h2 className="text-xl font-semibold border-b  mb-2 pb-3">
            Projects
          </h2>
          {projects.map((itm, i) => {
            return (
              <div key={i}>
                <h3 className="font-semibold">{itm.projectName}</h3>
                <div className="text-sm flex gap-2 font-medium ">
                  <i>
                    <a
                      href={itm.deployLink}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live link
                    </a>
                  </i>
                  <span className="text-black">/</span>
                  <i>
                    <a
                      href={itm.repoLink}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github link
                    </a>
                  </i>
                </div>
                <p style={{ color: "#6b7280" }} className="text-sm ">
                  {itm.description}
                </p>
              </div>
            );
          })}
        </div>
        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold border-b  mb-2 pb-3">
            Education
          </h2>
          {education.map((itm, i) => {
            return (
              <div key={i} className="flex justify-between">
                <div>
                  <h3 className="font-semibold">
                    {itm.degree} in {itm.field}
                  </h3>
                  <p className="text-sm">{itm.institution}</p>
                  <p className="text-sm">{itm.description}</p>
                </div>
                <div>
                  <p style={{ color: "#4b5563" }} className="text-sm">
                    {itm.startDate} – {itm.endDate}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold border-b  mb-2 pb-3">Skills</h2>
          {skills.map((itm, i) => {
            return (
              <div key={i} className="flex justify-between">
                <div>
                  <h3 className="font-semibold">
                    {itm.name} :{" "}
                    <span
                      style={{ color: "#6b7280" }}
                      className="text-sm font-normal"
                    >
                      {itm.skillList}
                    </span>
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        {/* Languages */}
        <div>
          <h2 className="text-xl font-semibold border-b  mb-2 pb-3">
            Languages
          </h2>
          {language.map((itm, i) => {
            return (
              <div key={i}>
                <p className="text-sm">
                  {itm.name} — {itm.level}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="fixed bottom-4 right-4 w-15 h-15 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl shadow-lg hover:bg-blue-600 transition"
      >
        <FaFileDownload />
      </button>
    </div>
  );
};

export default CreateResume;
