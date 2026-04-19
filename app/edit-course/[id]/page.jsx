"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  GraduationCap, 
  Trash2, 
  XCircle,
  RefreshCw,
  Type,
  IndianRupee,
  Upload,
  Video,
  LayoutGrid,
  BookOpen,
  TrendingUp,
  Check,
  Ban,
  Plus,
  PlayCircle,
  MoreVertical,
  Edit2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Manage Curriculum");

  // Basic Info State
  const [selectedCategories, setSelectedCategories] = useState([
    "Development", 
    "Machine Learning", 
    "Artificial Intelligence"
  ]);
  const allCategories = [
    "Development", "Machine Learning", "Artificial Intelligence", "Data Science", "Python"
  ];

  const handleCategoryToggle = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const [takeaways, setTakeaways] = useState([
    "Analyze data using Python libraries",
    "Clean and prepare real-world datasets",
    "Visualize data to uncover insights"
  ]);

  // Curriculum State
  const [topics, setTopics] = useState([]);
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTopicId, setEditingTopicId] = useState(null);

  // File Upload & Editor States
  const [promoFile, setPromoFile] = useState(null);
  const [subtopicVideoFile, setSubtopicVideoFile] = useState(null);
  const [subtopicPdfFile, setSubtopicPdfFile] = useState(null);
  const [editorSubtopicName, setEditorSubtopicName] = useState("");

  const handleAddTopic = () => {
    const newTopic = {
      id: Date.now(),
      title: `Topic ${topics.length + 1}`,
      subtopics: []
    };
    setTopics([...topics, newTopic]);
    setEditingTopicId(newTopic.id); // auto-focus title
  };

  const handleAddSubtopic = (topicId) => {
    const newSubtopic = {
      id: Date.now() + 1,
      title: "New Subtopic",
      duration: "",
      hasVideo: false,
      hasPdf: false
    };
    setTopics(topics.map(t => {
      if (t.id === topicId) {
        return { ...t, subtopics: [...t.subtopics, newSubtopic] };
      }
      return t;
    }));
    setActiveSubtopic({ topicId, subtopicId: newSubtopic.id });
    
    // Reset editor draft state directly during event handler
    setEditorSubtopicName(newSubtopic.title);
    setSubtopicVideoFile(null);
    setSubtopicPdfFile(null);

    if (window.innerWidth < 1024) {
      setIsDrawerOpen(true);
    }
  };

  const handleSubtopicClick = (topicId, subtopicId) => {
    setActiveSubtopic({ topicId, subtopicId });
    
    // Sync editor draft state directly during event handler
    const topic = topics.find(t => t.id === topicId);
    const sub = topic?.subtopics.find(s => s.id === subtopicId);
    if (sub) {
      setEditorSubtopicName(sub.title || "");
      setSubtopicVideoFile(sub.hasVideo ? {name: "uploaded_video.mp4"} : null);
      setSubtopicPdfFile(sub.hasPdf ? {name: "uploaded_doc.pdf"} : null);
    }

    if (window.innerWidth < 1024) {
      setIsDrawerOpen(true);
    }
  };

  const handleUpdateTopicTitle = (topicId, newTitle) => {
    if (!newTitle.trim()) return;
    setTopics(topics.map(t => t.id === topicId ? { ...t, title: newTitle } : t));
  };

  const handleSaveSubtopic = () => {
    if (!activeSubtopic) return;

    setTopics(topics.map(t => {
      if (t.id === activeSubtopic.topicId) {
        return {
          ...t,
          subtopics: t.subtopics.map(sub => {
            if (sub.id === activeSubtopic.subtopicId) {
              return {
                ...sub,
                title: editorSubtopicName,
                hasVideo: !!subtopicVideoFile,
                hasPdf: !!subtopicPdfFile,
                duration: subtopicVideoFile ? "04:20" : "" // mock duration added if video exists
              };
            }
            return sub;
          })
        };
      }
      return t;
    }));

    if (window.innerWidth < 1024) {
      setIsDrawerOpen(false);
    }
  };

  const handleDeleteSubtopic = () => {
    if (!activeSubtopic) return;
    setTopics(topics.map(t => {
      if (t.id === activeSubtopic.topicId) {
        return {
          ...t,
          subtopics: t.subtopics.filter(sub => sub.id !== activeSubtopic.subtopicId)
        };
      }
      return t;
    }));
    setActiveSubtopic(null);
    setIsDrawerOpen(false);
  };

  const renderEditorPanel = () => {
    if (!activeSubtopic && activeTab === "Manage Curriculum") {
      return (
        <div className="h-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[24px] p-6 bg-gray-50/50 lg:flex">
          <LayoutGrid className="w-10 h-10 text-gray-300 mb-3" />
          <h3 className="text-[16px] font-bold text-gray-400">Select a subtopic</h3>
          <p className="text-gray-400 font-medium text-center mt-1 text-[13px] max-w-[200px]">Click on any existing subtopic or add a new one.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 md:space-y-7 pb-8 md:pb-0 bg-white lg:border lg:border-gray-200 lg:rounded-[24px] lg:p-6 lg:shadow-xl lg:shadow-[#6434C7]/5">
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[14px] md:text-[15px] font-bold text-[#6434C7]">Preview Video</h3>
          </div>
          <div className="w-full h-[140px] md:h-[180px] bg-[#1a1a1c] rounded-[16px] flex items-center justify-center cursor-pointer hover:bg-[#2c2c2e] transition-colors relative overflow-hidden group border border-gray-100">
             <Video className="w-10 h-10 text-white/80 group-hover:text-white transition-colors group-hover:scale-110 duration-300" />
          </div>
        </section>
        
        <section>
          <h3 className="text-[14px] md:text-[15px] font-bold text-[#6434C7] mb-2.5">Upload video & PDF</h3>
          <div className="flex items-center gap-3">
            <label className="flex flex-col items-center justify-center flex-1 h-[85px] md:h-[95px] border-2 border-dashed border-gray-300 rounded-[16px] bg-[#fafafa] hover:bg-gray-50 hover:border-gray-400 transition-colors group relative overflow-hidden cursor-pointer">
              <input type="file" accept="video/mp4,video/x-m4v,video/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setSubtopicVideoFile(e.target.files[0])} />
              <Upload className="w-5 h-5 text-[#6434C7] mb-1.5 transition-transform group-hover:-translate-y-0.5 stroke-[2.5]" />
              <span className="text-[11px] font-bold text-gray-500 group-hover:text-gray-700 w-full truncate px-2 text-center">
                {subtopicVideoFile ? subtopicVideoFile.name : '.mp4'}
              </span>
            </label>
            <span className="text-[11px] font-bold text-gray-400 shrink-0 uppercase tracking-widest">and</span>
            <label className="flex flex-col items-center justify-center flex-1 h-[85px] md:h-[95px] border-2 border-dashed border-gray-300 rounded-[16px] bg-[#fafafa] hover:bg-gray-50 hover:border-gray-400 transition-colors group relative overflow-hidden cursor-pointer">
              <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setSubtopicPdfFile(e.target.files[0])} />
              <BookOpen className="w-5 h-5 text-[#6434C7] mb-1.5 transition-transform group-hover:-translate-y-0.5 stroke-[2.5]" />
              <span className="text-[11px] font-bold text-gray-500 group-hover:text-gray-700 w-full truncate px-2 text-center">
                {subtopicPdfFile ? subtopicPdfFile.name : '.pdf'}
              </span>
            </label>
          </div>
        </section>

        <section>
          <h3 className="text-[14px] md:text-[15px] font-bold text-[#6434C7] mb-2.5">Subtopic name</h3>
          <input 
            type="text" 
            value={editorSubtopicName}
            onChange={(e) => setEditorSubtopicName(e.target.value)}
            className="w-full h-11 md:h-12 bg-[#fafafa] border border-gray-200 rounded-[14px] px-4 text-[14px] text-text-main font-semibold outline-none focus:ring-2 focus:ring-[#6434C7]/20 focus:border-[#6434C7] focus:bg-white transition-all shadow-inner"
          />
        </section>

        <div className="flex gap-3 pt-2">
          <Button onClick={handleDeleteSubtopic} className="flex-[0.8] h-11 lg:h-12 bg-red-50 hover:bg-red-100 border border-red-100 text-red-500 font-bold rounded-[14px] text-[14px] md:text-[15px] transition-colors">
            Delete
          </Button>
          <Button onClick={handleSaveSubtopic} className="flex-[1.2] h-11 lg:h-12 bg-[#6434C7] hover:bg-[#572cae] text-white font-bold rounded-[14px] text-[14px] md:text-[15px] shadow-md hover:shadow-lg transition-all">
            Save
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-poppins pb-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#6434C7]/10">
              <GraduationCap className="w-7 h-7 md:w-9 md:h-9 text-[#6434C7] stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-[26px] md:text-3xl font-bold text-text-main m-0 leading-tight">Edit Course</h1>
              <p className="text-sm md:text-[15px] font-medium text-text-shaded m-0 mt-1">Update all course details, pricing, and content.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 md:flex-row flex-wrap sm:flex-nowrap w-full lg:w-auto">
            {/* Disable Course */}
            <Button variant="outline" className="flex-1 sm:flex-none border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold h-11 md:h-12 px-4 md:px-5 rounded-full shadow-sm text-sm md:text-[15px] bg-white">
              <Ban className="w-4 h-4 mr-2" />
              Disable
            </Button>
            {/* Delete Course */}
            <Button variant="outline" className="flex-1 sm:flex-none border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold h-11 md:h-12 px-4 md:px-5 rounded-full shadow-sm text-sm md:text-[15px] bg-white">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none border-gray-300 text-text-main hover:bg-gray-50 font-bold h-11 md:h-12 px-4 md:px-5 rounded-full shadow-sm text-sm md:text-[15px] bg-white">
              <XCircle className="w-5 h-5 mr-2 text-gray-500" />
              Cancel
            </Button>
            <Button className="w-full sm:w-auto bg-[#6434C7] hover:bg-[#572cae] text-white font-bold h-11 md:h-12 px-6 md:px-8 rounded-full shadow-md text-sm md:text-[15px]">
              <RefreshCw className="w-4 h-4 mr-2 stroke-3" />
              Update Course
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full border-b border-gray-200 mb-8 sm:mb-10">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
            {["Basic Course Information", "Manage Curriculum"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 md:py-4 px-1 text-[15px] md:text-[16px] font-bold border-b-2 transition-colors ${
                  activeTab === tab 
                    ? "border-[#6434C7] text-[#6434C7]" 
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300 font-semibold"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content wrapped in 12-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-12">
          
          {/* TAB: Basic Course Information */}
          {activeTab === "Basic Course Information" && (
            <>
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-10">
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Type className="w-7 h-7 md:w-8 md:h-8 text-[#6434C7]" />
                    <h2 className="text-[20px] md:text-2xl font-bold text-text-main m-0">Title and Description</h2>
                  </div>
                  <div className="space-y-6 md:space-y-8 pl-0 md:pl-2 md:ml-9">
                    <div className="space-y-2.5">
                      <label className="text-[14px] md:text-[15px] font-bold text-gray-600 block">Course Title</label>
                      <input type="text" className="w-full h-12 md:h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] md:text-[16px] text-text-main font-medium outline-none focus:ring-2 focus:ring-[#6434C7]/20 focus:border-[#6434C7] transition-all shadow-sm"/>
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[14px] md:text-[15px] font-bold text-gray-600 block">Description</label>
                      <textarea className="w-full h-40 md:h-48 bg-white border border-gray-200 rounded-2xl p-4 text-[15px] md:text-[16px] text-text-main font-medium outline-none focus:ring-2 focus:ring-[#6434C7]/20 focus:border-[#6434C7] transition-all resize-none shadow-sm"></textarea>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <IndianRupee className="w-7 h-7 md:w-8 md:h-8 text-[#6434C7]" />
                    <h2 className="text-[20px] md:text-2xl font-bold text-text-main m-0">Course Price and Video</h2>
                  </div>
                  <div className="space-y-6 md:space-y-8 pl-0 md:pl-2 md:ml-9">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Price fields */}
                      <div className="space-y-2.5">
                        <label className="text-[14px] md:text-[15px] font-bold text-gray-600 block">Current Price(₹)</label>
                        <div className="relative">
                          <input type="number" defaultValue="2999" className="w-full h-12 md:h-14 bg-white border border-gray-200 rounded-xl pr-10 pl-4 text-[16px] md:text-[18px] text-text-main font-semibold outline-none focus:ring-2 focus:ring-[#6434C7]/20 focus:border-[#6434C7] transition-all shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center">
                            <svg className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                            <svg className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <label className="text-[14px] md:text-[15px] font-bold text-gray-600 block">Original Price(₹)</label>
                        <div className="relative">
                          <input type="number" defaultValue="2999" className="w-full h-12 md:h-14 bg-white border border-gray-200 rounded-xl pr-10 pl-4 text-[16px] md:text-[18px] text-text-main font-semibold outline-none focus:ring-2 focus:ring-[#6434C7]/20 focus:border-[#6434C7] transition-all shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center">
                            <svg className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                            <svg className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[14px] md:text-[15px] font-bold text-gray-600 block">Promo Video URL or Upload Video</label>
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <label className="flex flex-col items-center justify-center w-full sm:w-[130px] h-[100px] md:h-[110px] border-2 border-dashed border-gray-400 rounded-xl bg-white/50 hover:bg-white transition-colors shrink-0 group relative overflow-hidden cursor-pointer">
                          <input type="file" accept="video/mp4,video/x-m4v,video/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setPromoFile(e.target.files[0])} />
                          <Upload className="w-5 h-5 text-[#6434C7] mb-2 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />
                          <span className="text-[11px] font-bold text-gray-600 truncate w-full px-2 text-center">
                            {promoFile ? promoFile.name : '.mp4'}
                          </span>
                        </label>
                        <span className="text-[14px] font-bold text-gray-400 px-1 shrink-0">OR</span>
                        <div className="relative w-full h-[60px] md:h-[65px]">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400">
                            <Video className="w-5 h-5 md:w-6 md:h-6 fill-current text-gray-400" strokeWidth={0} />
                          </div>
                          <input type="text" placeholder="https://example.com" className="w-full h-full bg-white border border-gray-200 rounded-xl pl-14 pr-4 text-[14px] md:text-[15px] text-text-main font-medium outline-none focus:ring-2 focus:ring-[#6434C7]/20 focus:border-[#6434C7] transition-all shadow-sm placeholder:text-gray-300"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 space-y-10 pt-2 lg:pt-0">
                <section>
                  <div className="flex items-center gap-3 mb-2">
                    <LayoutGrid className="w-7 h-7 md:w-8 md:h-8 text-[#6434C7] stroke-[2.5]" />
                    <h2 className="text-[20px] md:text-2xl font-bold text-text-main m-0">Categories</h2>
                  </div>
                  <p className="text-[14px] md:text-[15px] font-bold text-text-main pl-0 md:pl-2 md:ml-9 mb-4">Select appropriate categories</p>
                  <div className="flex flex-wrap gap-x-2.5 gap-y-3 pl-0 md:pl-2 md:ml-9 pt-2">
                    {allCategories.map(cat => {
                      const isSelected = selectedCategories.includes(cat);
                      return (
                        <button key={cat} onClick={() => handleCategoryToggle(cat)} className={`flex items-center gap-2 px-5 py-[10px] rounded-full text-[13px] md:text-[14px] font-bold transition-all ${isSelected ? "bg-[#6434C7] text-white border border-[#6434C7] shadow-sm transform hover:scale-[1.02]" : "bg-white text-gray-600 border border-gray-300 hover:border-gray-400 shadow-sm"}`}>
                          {cat}
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />}
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-[#6434C7]" />
                    <h2 className="text-[20px] md:text-2xl font-bold text-text-main m-0">What You&apos;ll Learn</h2>
                  </div>
                  <p className="text-[14px] md:text-[15px] font-bold text-text-main pl-0 md:pl-2 md:ml-9 mb-4">Key Takeaways</p>
                  <div className="pl-0 md:pl-2 md:ml-9">
                    <div className="w-full min-h-[140px] border border-gray-200 rounded-2xl p-4 bg-white shadow-sm flex flex-filter flex-wrap gap-2.5 items-start focus-within:ring-2 focus-within:ring-[#6434C7]/20 focus-within:border-[#6434C7] transition-all cursor-text" onClick={() => document.getElementById('takeawayInput').focus()}>
                      {takeaways.map((takeaway, i) => (
                        <div key={i} className="flex items-center gap-2 bg-[#F8F5FF] text-[#6434C7] border border-[#d3c2f7] px-4 py-2 rounded-[10px] transition-all">
                          <span className="text-[12px] md:text-[13px] font-bold leading-none select-none">{takeaway}</span>
                          <button onClick={(e) => { e.stopPropagation(); setTakeaways(takeaways.filter((_, idx) => idx !== i)); }} className="text-[#6434C7] hover:bg-[#6434C7]/10 p-0.5 rounded transition-colors">
                             <svg className="w-3 h-3 stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                      <input id="takeawayInput" type="text" placeholder="e.g Build basic machine learning models" className="flex-1 min-w-[200px] text-[13px] md:text-[14px] text-gray-700 outline-none bg-transparent placeholder-gray-400 font-medium py-1.5"
                        onKeyDown={(e) => { if(e.key === 'Enter' && e.target.value.trim() !== "") { setTakeaways([...takeaways, e.target.value.trim()]); e.target.value = ''; } }}/>
                    </div>
                  </div>
                </section>

                <section className="pt-2">
                  <div className="pl-0 md:pl-2 md:ml-9">
                    <div className="flex items-center justify-between p-5 md:p-6 border border-gray-200 rounded-2xl bg-white hover:border-gray-300 transition-colors shadow-sm cursor-pointer" onClick={(e) => { const cb = document.getElementById('trending-checkbox'); if(e.target !== cb) cb.click();}}>
                      <div className="flex items-start md:items-center gap-4">
                        <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-[#6434C7] shrink-0 mt-0.5 md:mt-0 stroke-[2.5]" />
                        <div className="space-y-0.5">
                          <h3 className="text-[16px] md:text-[18px] font-bold text-text-main m-0">Mark as Trending / Popular</h3>
                          <p className="text-[13px] md:text-[14px] font-medium text-gray-500 m-0 leading-tight">Show a highlight badge on the course page.</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        id="trending-checkbox"
                        className="w-5 h-5 md:w-[22px] md:h-[22px] rounded border-gray-300 text-[#6434C7] focus:ring-[#6434C7] accent-[#6434C7] cursor-pointer shrink-0 ml-4 hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </>
          )}

          {/* TAB: Manage Curriculum */}
          {activeTab === "Manage Curriculum" && (
            <>
              {/* Left Column - Topics List */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-6">
                  <div>
                    <h2 className="text-[20px] md:text-[22px] font-bold text-text-main m-0">Course Curriculum</h2>
                    <p className="text-[13px] md:text-[14px] font-medium text-gray-500 m-0 mt-1">Organize your course into sections and lectures. Select a lecture to edit content.</p>
                  </div>
                  <Button onClick={handleAddTopic} variant="outline" className="border-[#6434C7] text-[#6434C7] hover:bg-[#6434C7]/5 font-bold h-10 md:h-11 px-5 md:px-6 rounded-xl whitespace-nowrap shrink-0 shadow-sm bg-white">
                    <Plus className="w-4 h-4 mr-2 stroke-3" />
                    Add Section
                  </Button>
                </div>

                {/* Topics Container */}
                <div className="space-y-4 md:space-y-5">
                  {topics.length === 0 ? (
                     <div className="w-full text-center py-10 md:py-20 border-2 border-dashed border-gray-200 rounded-2xl bg-white/50 shadow-sm">
                        <p className="text-gray-500 font-semibold mb-4">No sections defined yet.</p>
                        <Button onClick={handleAddTopic} className="bg-[#6434C7] hover:bg-[#572cae] text-white rounded-xl shadow-md px-6">Let&apos;s create one!</Button>
                     </div>
                  ) : topics.map((topic) => (
                    <div key={topic.id} className="border border-gray-200 rounded-[20px] bg-white overflow-hidden shadow-sm">
                      <div className="flex items-center justify-between p-4 md:p-5 bg-white border-b border-gray-100">
                        {/* Topic Title Editor */}
                        {editingTopicId === topic.id ? (
                          <div className="flex-1 flex items-center mr-4 gap-2">
                            <input 
                              autoFocus
                              type="text" 
                              defaultValue={topic.title}
                              onBlur={(e) => {
                                handleUpdateTopicTitle(topic.id, e.target.value);
                                setEditingTopicId(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleUpdateTopicTitle(topic.id, e.target.value);
                                  setEditingTopicId(null);
                                }
                              }}
                              className="text-[15px] md:text-[16px] font-bold text-text-main m-0 px-2 py-1 outline-none border-b-2 border-[#6434C7] transition-all bg-[#fafafa] w-full rounded-sm"
                              placeholder="Enter section name"
                            />
                            <button 
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleUpdateTopicTitle(topic.id, e.currentTarget.previousSibling.value);
                                setEditingTopicId(null);
                              }}
                              className="p-1.5 bg-[#6434C7] text-white rounded-md hover:bg-[#572cae] transition-colors shrink-0 shadow-sm"
                            >
                              <Check className="w-4 h-4 stroke-3" />
                            </button>
                          </div>
                        ) : (
                          <h3 
                            className="text-[15px] md:text-[16px] font-bold text-text-main m-0 cursor-pointer hover:text-[#6434C7] transition-colors py-1 px-2 border-b-2 border-transparent"
                            onClick={() => setEditingTopicId(topic.id)}
                            title="Click to edit name"
                          >
                            {topic.title}
                          </h3>
                        )}

                        <div className="flex items-center gap-3 md:gap-4 ml-4">
                          <button 
                            onClick={() => setEditingTopicId(topic.id)}
                            className="text-gray-400 hover:text-[#6434C7] transition-colors bg-gray-50 hover:bg-[#F8F5FF] p-2 rounded-full"
                          >
                            <Edit2 className="w-4 h-4 md:w-4.5 md:h-4.5" />
                          </button>
                          <button 
                            onClick={() => setTopics(topics.filter(t => t.id !== topic.id))}
                            className="text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 p-2 rounded-full"
                          >
                            <Trash2 className="w-4 h-4 md:w-4.5 md:h-4.5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-white">
                        {topic.subtopics.map(subtopic => {
                          const isActive = activeSubtopic?.subtopicId === subtopic.id;
                          return (
                            <div 
                              key={subtopic.id} 
                              onClick={() => handleSubtopicClick(topic.id, subtopic.id)}
                              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 px-5 cursor-pointer border-l-[3px] transition-all group ${
                                isActive 
                                  ? "border-[#6434C7] bg-[#F8F5FF]" 
                                  : "border-transparent hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                <PlayCircle className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#6434C7]' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                <span className={`text-[14px] font-bold truncate pr-3 flex-1 ${isActive ? 'text-[#6434C7]' : 'text-gray-600 group-hover:text-gray-800'}`}>
                                  {subtopic.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 pl-8 sm:pl-0 shrink-0 self-start sm:self-auto opacity-80">
                                {/* Only conditionally render tags if true in state */}
                                {subtopic.hasPdf && (
                                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100/80 px-2 py-0.5 rounded-sm tracking-wide">PDF</span>
                                )}
                                {subtopic.hasVideo && (
                                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100/80 px-2 py-0.5 rounded-sm tracking-wide">VIDEO</span>
                                )}
                                {subtopic.duration && (
                                  <span className="text-[13px] font-bold text-gray-600 block min-w-[35px] text-right">{subtopic.duration}</span>
                                )}
                                <button className="text-gray-300 hover:text-gray-600 ml-1">
                                  <MoreVertical className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                        
                        <div className="p-4 px-5 border-t border-gray-100 hover:bg-gray-50/50 transition-colors rounded-b-[20px]">
                           <button 
                            onClick={() => handleAddSubtopic(topic.id)}
                            className="flex items-center text-[13px] font-bold text-[#6434C7] hover:opacity-80 transition-opacity"
                           >
                             <Plus className="w-4 h-4 mr-1.5 stroke-3" />
                             Add new sub-topic
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Desktop Editor Panel */}
              <div className="hidden lg:block lg:col-span-4">
                <div className="sticky top-28">
                  {renderEditorPanel()}
                </div>
              </div>

              {/* Mobile Editor Drawer */}
              <div className="lg:hidden">
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                  <DrawerContent className="px-5 pb-8 pt-4 max-h-[90vh]">
                    <div className="w-full overflow-y-auto no-scrollbar pb-6 px-1">
                      <DrawerHeader className="px-0 pt-0 pb-4 text-left">
                        <DrawerTitle className="text-xl font-bold text-text-main">Edit Subtopic</DrawerTitle>
                      </DrawerHeader>
                      {renderEditorPanel()}
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>

            </>
          )}

        </div>
      </div>
    </div>
  );
}
