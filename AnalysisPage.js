import React, { useState } from "react";

export default function AnalysisPage({ selectedFile, setSelectedFile, patientName, setPatientName, notes, setNotes }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Palette Constants:
  // Deep Navy: #4d531bff (Page BG, Main Text, Button BG)
  // Medium Blue: #234C6A (Hover states, accents)
  // Steel Blue: #456882 (Borders, Subtext)
  // Light Gray: #E3E3E3 (Card BG)

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('patient_name', patientName);
    formData.append('notes', notes);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Gagal terhubung ke server.' });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#1B3C53] px-6 py-12 font-sans selection:bg-[#456882] selection:text-white">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          
          {/* Main Card: Light Gray */}
          <div className="bg-[#E3E3E3] border border-[#456882]/30 p-8 rounded-xl shadow-2xl shadow-black/20 text-[#1B3C53]">
            
            {/* Header */}
            <div className="mb-10 border-b border-[#456882]/30 pb-6">
              <h2 className="text-3xl font-light tracking-tight text-[#1B3C53] mb-2">Analisis X-ray</h2>
              <p className="text-[#456882] text-sm font-medium">
                Deteksi tuberkulosis berbasis AI
              </p>
            </div>

            {/* Upload Area */}
            <div className="mb-10">
              <div 
                className={`group relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 cursor-pointer
                  ${selectedFile 
                    ? 'border-[#234C6A] bg-white' 
                    : 'border-[#456882]/40 hover:border-[#234C6A] hover:bg-white/50'
                  }
                `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-[#1B3C53] rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  
                  <div>
                    <span className="text-[#1B3C53] font-bold border-b-2 border-[#234C6A]/30 pb-0.5">Pilih File</span>
                    <span className="text-[#456882] ml-2 font-medium">atau drag & drop</span>
                  </div>
                  
                  {selectedFile ? (
                     <p className="text-sm text-white mt-2 bg-[#234C6A] px-4 py-1 rounded-full shadow-sm font-medium">
                      {selectedFile.name}
                    </p>
                  ) : (
                    <p className="text-xs text-[#456882] uppercase tracking-widest font-bold">JPG, PNG, JPEG</p>
                  )}
                </div>
              </div>
              <input
                id="fileInput"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 gap-6 mb-10">
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-[#456882] mb-2 font-bold group-focus-within:text-[#234C6A] transition-colors">
                  Nama Pasien
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Nama lengkap..."
                  className="w-full px-4 py-3 bg-white border-2 border-[#456882]/30 rounded-lg text-[#1B3C53] placeholder-[#456882]/70 focus:outline-none focus:border-[#234C6A] focus:ring-0 transition-all font-medium"
                />
              </div>
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-[#456882] mb-2 font-bold group-focus-within:text-[#234C6A] transition-colors">
                  Catatan Klinis
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail tambahan..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white border-2 border-[#456882]/30 rounded-lg text-[#1B3C53] placeholder-[#456882]/70 focus:outline-none focus:border-[#234C6A] focus:ring-0 transition-all resize-none font-medium"
                />
              </div>
            </div>

            {/* Action Button */}
            <button 
              type="submit"
              className="w-full bg-[#1B3C53] text-white py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-[#234C6A] shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={!selectedFile || loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Mulai Analisis</span>
              )}
            </button>

            {/* Results Section */}
            {result && (
              <div className="mt-12 pt-12 border-t border-[#456882]/30 animate-fade-in">
                {result.error ? (
                  <div className="p-4 bg-red-100 border border-red-200 text-red-800 text-sm text-center rounded-lg font-medium">
                    {result.error}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Image Preview Container - White BG */}
                    <div className="bg-white border-2 border-[#456882]/30 rounded-lg p-2 flex items-center justify-center shadow-sm">
                      {selectedFile && (
                        <img 
                          src={URL.createObjectURL(selectedFile)} 
                          alt="X-ray Analysis" 
                          className="max-h-[300px] w-auto rounded-sm"
                        />
                      )}
                    </div>

                    {/* Data Display */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs uppercase tracking-widest text-[#456882] mb-4 font-bold">Hasil Diagnosa</h3>
                        
                        {/* CHANGED: Result container now uses White BG and Standard Border to match Inputs */}
                        <div className="flex items-center gap-4 mb-6 p-4 rounded-lg border-2 border-[#456882]/30 bg-white shadow-sm">
                          
                          {/* Dot Indicator */}
                          <div className={`w-3 h-3 rounded-full ${
                             result.label === 'Tuberculosis' ? 'bg-red-600' : 'bg-emerald-600'
                          }`} />
                          
                          <div>
                            {/* Text Color indicates the status */}
                            <div className={`text-xl font-black ${
                              result.label === 'Tuberculosis' ? 'text-red-900' : 'text-emerald-900'
                            }`}>
                              {result.label === 'Tuberculosis' ? 'Tuberculosis Terdeteksi' : 'Normal'}
                            </div>
                            <div className="text-xs text-[#456882] mt-1 font-medium">
                              Confidence: <span className="text-[#1B3C53] font-bold font-mono">{(result.confidence * 100).toFixed(2)}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                           <h4 className="text-xs uppercase tracking-widest text-[#456882] mb-2 font-bold">Rekomendasi</h4>
                           {result.label === 'Tuberculosis' ? (
                              <ul className="space-y-2 text-sm text-[#1B3C53] font-medium">
                                <li className="flex gap-3 items-center"><span className="text-red-600 text-lg">•</span> Konsultasi dokter spesialis paru</li>
                                <li className="flex gap-3 items-center"><span className="text-[#456882] text-lg">•</span> Lakukan tes sputum & darah</li>
                                <li className="flex gap-3 items-center"><span className="text-[#456882] text-lg">•</span> Gunakan masker medis</li>
                              </ul>
                           ) : (
                              <ul className="space-y-2 text-sm text-[#1B3C53] font-medium">
                                <li className="flex gap-3 items-center"><span className="text-emerald-600 text-lg">•</span> Tidak ditemukan anomali</li>
                                <li className="flex gap-3 items-center"><span className="text-[#456882] text-lg">•</span> Jaga kesehatan paru-paru</li>
                              </ul>
                           )}
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}