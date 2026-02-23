
import React, { useState, useRef } from 'react';
import { editImage } from '../services/geminiService';
import { Image, Wand2, RefreshCw, Download, Camera, Sparkles } from 'lucide-react';

// Added Props interface to accept theme from parent component
interface Props {
  theme: 'dark' | 'light';
}

// Updated component to accept theme prop
const ImageEditor: React.FC<Props> = ({ theme }) => {
  // Defined isDark based on the theme prop to fix the reference error on line 164
  const isDark = theme === 'dark';
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const prompts = [
    "Add a dynamic neon blue aura around the runner to signify 'Phase 2 Elite' status",
    "Apply a cinematic high-contrast look with golden lens flares",
    "Add a digital overlay showing '850 FUNITS' and 'GO RUN' text in a futuristic font",
    "Make it look like a high-end sports brand advertisement",
    "Transform the environment into a futuristic cyberpunk city marathon",
    "Apply a minimalist professional photography studio effect",
    "Add speed motion blur lines and a digital performance HUD",
    "Give it a gritty black and white documentary film look"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (prompt: string) => {
    if (!image) return;
    setLoading(true);
    try {
      const result = await editImage(image, prompt);
      setEditedImage(result);
    } catch (error) {
      alert("Failed to edit image. Ensure your API key is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 rounded-2xl shadow-inner">
            <Image className="text-blue-500 w-8 h-8"/>
          </div>
          <div>
            <h3 className="text-3xl font-black italic tracking-tighter uppercase">Hero Editor</h3>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Transform photos into digital trophies</p>
          </div>
        </div>
        {image && (
          <button 
             onClick={() => { setImage(null); setEditedImage(null); }}
             className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> New Project
          </button>
        )}
      </div>

      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="group relative overflow-hidden border-2 border-dashed border-slate-800 rounded-[3rem] h-[400px] flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="p-8 bg-slate-900 rounded-full group-hover:scale-110 transition-transform shadow-2xl">
            <Camera className="w-12 h-12 text-slate-400 group-hover:text-blue-500" />
          </div>
          <div className="mt-8 text-center">
            <p className="text-xl font-black uppercase italic tracking-tight">Upload Workout Photo</p>
            <p className="mt-1 text-sm text-slate-500 font-bold uppercase tracking-widest">Supports JPG, PNG (Max 5MB)</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>
      ) : (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Base Photo</span>
                <span className="text-[10px] font-bold text-slate-600">INPUT_CAM_01</span>
              </div>
              <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-slate-800 relative bg-slate-900 shadow-xl">
                <img src={image} className="w-full h-full object-cover" alt="Original" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">AI Result</span>
                {loading && <span className="text-[10px] font-bold text-blue-500 animate-pulse uppercase">Processing...</span>}
              </div>
              <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border-2 border-blue-900/30 relative bg-slate-900 flex items-center justify-center shadow-2xl">
                {editedImage ? (
                  <img src={editedImage} className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700" alt="Edited" />
                ) : (
                  <div className="text-center p-12 space-y-6">
                    {loading ? (
                      <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-black italic uppercase text-blue-500 tracking-tighter">Gemini is thinking</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Analyzing pixels & applying style</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 opacity-30">
                        <Wand2 className="w-20 h-20 mx-auto text-slate-400" />
                        <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Select an effect to begin</p>
                      </div>
                    )}
                  </div>
                )}
                
                {editedImage && (
                  <button 
                    className="absolute bottom-6 right-6 bg-blue-600 p-5 rounded-3xl text-white shadow-2xl shadow-blue-500/50 hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 group"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = editedImage;
                      link.download = 'funpace-hero.png';
                      link.click();
                    }}
                  >
                    <Download className="w-6 h-6 group-hover:animate-bounce" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-black uppercase italic tracking-tight">Style Presets</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {prompts.map((p, i) => (
                <button 
                  key={i}
                  disabled={loading}
                  onClick={() => handleEdit(p)}
                  className={`group p-5 text-[10px] font-black text-left rounded-3xl transition-all h-28 flex flex-col justify-between border ${
                    loading ? 'opacity-50 grayscale' : 'hover:border-blue-500 hover:bg-blue-500/5 hover:scale-105 active:scale-95'
                  } ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}
                >
                  <span className="line-clamp-3 leading-tight uppercase tracking-tight group-hover:text-blue-500 transition-colors">{p}</span>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[8px] opacity-40">GEMINI_CORE_V3</span>
                    <Wand2 className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
