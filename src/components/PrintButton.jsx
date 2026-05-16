import React, { useState, useRef } from 'react';

export default function PrintButton() {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  
  const handlePrint = () => {
    alert('For best results, please set your print zoom to 63% before printing.');
    
    setTimeout(() => {
      window.print();
    }, 100);
    
    setShowOptions(false);
  };

  const handleDownloadPDF = () => {
    window.open(`${import.meta.env.BASE_URL}giuseppe-santoro.pdf`, '_blank');
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [optionsRef]);

  return (
    <div className="absolute top-4 right-16 print:hidden" ref={optionsRef}>
      <button 
        onClick={toggleOptions}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Print or Download Resume"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
      </button>
      
      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
          <ul>
            <li>
              <button 
                onClick={handlePrint}
                className="w-full text-left px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Print from Browser
              </button>
            </li>
            <li>
              <button 
                onClick={handleDownloadPDF}
                className="w-full text-left px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Download PDF File
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
} 