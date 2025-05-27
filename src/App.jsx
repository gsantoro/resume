import React, { useEffect, useState, useRef } from "react";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Languages from "./components/Languages";
import Certification from "./components/Certification";
import Extras from "./components/Extras";
import Summary from "./components/Summary";
import ThemeToggle from "./components/ThemeToggle";
import PrintButton from "./components/PrintButton";

function App() {
  const [resume, setResume] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const originalModeRef = useRef(null); // Use a ref instead of state to avoid dependency issues

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}resume.json`)
      .then(res => res.json())
      .then(setResume);

    // Detect print mode
    const beforePrint = () => {
      // Save the current theme mode
      originalModeRef.current = document.documentElement.classList.contains('dark');
      
      // Force light mode for printing
      if (originalModeRef.current) {
        document.documentElement.classList.remove('dark');
      }
      
      setIsPrinting(true);
    };
    
    const afterPrint = () => {
      // Restore the original theme mode
      if (originalModeRef.current) {
        document.documentElement.classList.add('dark');
      }
      
      setIsPrinting(false);
    };

    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);

    // Apply dark mode to document on initial load
    document.documentElement.classList.toggle('dark', isDarkMode);

    return () => {
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
    };
  }, []); // No need for dependencies with the useRef approach

  // Toggle theme function
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  if (!resume) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className={`relative max-w-5xl mx-auto my-8 mb-12 bg-white dark:bg-gray-800 rounded-md
      ${!isPrinting ? 'shadow-[0_10px_20px_rgba(0,0,0,0.19),_0_6px_6px_rgba(0,0,0,0.23)]' : 'shadow-none'} 
      border border-gray-100 dark:border-gray-700 p-14 md:p-20 font-sans 
      ${!isPrinting ? 'transform hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)] transition-all duration-300 ease-in-out' : ''} 
      text-[#00629b] dark:text-[#3282b8] print:shadow-none print:border-0 print:p-8 print:mx-8 print:max-w-none print:bg-white! print:text-[#00629b]!`}>
      
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <PrintButton />
      
      <header className="mb-8 pb-4 print:mb-8">
        <h1 className="text-5xl font-bold dark:text-gray print:text-gray! print:text-black!">{resume.basics.name}</h1>
        <h2 className="text-3xl text-gray-500 dark:text-gray-400 font-semibold print:text-gray-500!">{resume.basics.label}</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-4 print:grid-cols-3 print:gap-4">
          <aside className="md:col-span-1 space-y-6 print:col-span-1 print:space-y-3 print:break-inside-avoid">
            <Contact basics={resume.basics} />
          </aside>
          <div className="md:col-span-2 space-y-6 print:col-span-2 print:space-y-3">
            <Summary summary={resume.basics.summary} />
          </div>
        </div>
      </header>
      <main className="space-y-8 print:space-y-4">
        <Skills skills={resume.skills} />
        <Experience work={resume.work} />
        <Certification certificates={resume.certificates} />
        <Extras extras={resume.extras} />
        <Education education={resume.education} />
        <Languages languages={resume.languages} />
      </main>
      <footer className="py-6 mt-8 print:hidden"></footer>
    </div>
  );
}

export default App;