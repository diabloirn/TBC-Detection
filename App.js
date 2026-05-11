import React, { useState } from "react";
import Header from "./Header";
import AnalysisPage from "./AnalysisPage";


function App() {
  const [currentPage, setCurrentPage] = useState('analysis');
  const [selectedFile, setSelectedFile] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div className="min-h-screen bg-[#1B3C53] text-white pt-28">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'analysis' && (
        <AnalysisPage
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          patientName={patientName}
          setPatientName={setPatientName}
          notes={notes}
          setNotes={setNotes}
        />
      )}
    </div>
  );
}

export default App;
