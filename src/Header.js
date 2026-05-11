import React from "react";

export default function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 flex justify-between items-center px-8 py-4 font-sans">
      <div className="flex items-center space-x-4">
        {/* Minimalist Icon Container */}
        <div className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center">
          <svg className="w-5 h-5 text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v8m0-8V4m0 8c-2.5 0-4.5 2-4.5 4.5V20m4.5-8c2.5 0 4.5 2 4.5 4.5V20M8 20H6.5A2.5 2.5 0 016 15.5V14c0-2.5 2-4.5 4.5-4.5M16 20h1.5A2.5 2.5 0 0018 15.5V14c0-2.5-2-4.5-4.5-4.5" />
          </svg>
        </div>
        {/* Cleaner Typography */}
        <h1 className="text-lg font-light tracking-widest text-white uppercase">TB Detector</h1>
      </div>
      <nav className="flex space-x-8">
        <button 
          onClick={() => setCurrentPage('analysis')}
          // High contrast active state, subtle inactive state
          className={`flex items-center space-x-2 transition-all text-sm uppercase tracking-widest ${
            currentPage === 'analysis' ? 'text-white font-medium' : 'text-neutral-500 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span>Analisis</span>
        </button>
      </nav>
    </header>
  );
}