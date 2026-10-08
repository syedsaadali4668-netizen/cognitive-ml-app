'use client';
import { useState } from 'react';
import { Sparkles, Brain, Clock, Smartphone, Moon, Zap } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    study_hours: 4,
    deep_work_pct: 70,
    distraction_index: 3,
    sleep_quality: 7,
    retention_profile: 'Standard',
  });
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          study_hours: Number(formData.study_hours),
          deep_work_pct: Number(formData.deep_work_pct),
          distraction_index: Number(formData.distraction_index),
          sleep_quality: Number(formData.sleep_quality),
          retention_profile: formData.retention_profile,
        }),
      });
      const data = await res.json();
      if (data.score) setResult(data.score);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-70 -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100 rounded-full blur-[120px] opacity-70 -z-10" />

      <div className="max-w-4xl w-full z-10 mt-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-200 text-sm font-medium text-gray-700 shadow-sm mb-6">
            <Sparkles size={16} className="text-blue-500" />
            Neuro-Cognitive AI Engine
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Predict Academic Performance
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Move beyond time tracking. Discover how deep work, sleep quality, and cognitive retention impact your final exam score.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 md:p-10 w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100/50">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <Brain size={18} className="text-indigo-600"/> Cognitive Retention Profile
              </label>
              <select 
                name="retention_profile" 
                value={formData.retention_profile} 
                onChange={handleChange}
                className="w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all cursor-pointer shadow-sm text-gray-700"
              >
                <option value="High-Speed">High-Speed (Quick Grasp, Minimal Review)</option>
                <option value="Standard">Standard (Average Pacing)</option>
                <option value="Requires_Repetition">High-Friction (Requires Spaced Repetition)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex justify-between text-sm font-semibold text-gray-700">
                  <span className="flex items-center gap-2"><Clock size={16} className="text-gray-400"/> Study Hours</span>
                  <span className="text-indigo-600 font-bold">{formData.study_hours}h</span>
                </label>
                <input type="range" name="study_hours" min="1" max="12" step="0.5" value={formData.study_hours} onChange={handleChange} className="w-full accent-indigo-600" />
              </div>

              <div className="space-y-3">
                <label className="flex justify-between text-sm font-semibold text-gray-700">
                  <span className="flex items-center gap-2"><Zap size={16} className="text-amber-400"/> Deep Work</span>
                  <span className="text-amber-600 font-bold">{formData.deep_work_pct}%</span>
                </label>
                <input type="range" name="deep_work_pct" min="10" max="100" value={formData.deep_work_pct} onChange={handleChange} className="w-full accent-amber-500" />
              </div>

              <div className="space-y-3">
                <label className="flex justify-between text-sm font-semibold text-gray-700">
                  <span className="flex items-center gap-2"><Smartphone size={16} className="text-red-400"/> Distractions / Hr</span>
                  <span className="text-red-600 font-bold">{formData.distraction_index}</span>
                </label>
                <input type="range" name="distraction_index" min="0" max="15" value={formData.distraction_index} onChange={handleChange} className="w-full accent-red-500" />
              </div>

              <div className="space-y-3">
                <label className="flex justify-between text-sm font-semibold text-gray-700">
                  <span className="flex items-center gap-2"><Moon size={16} className="text-blue-400"/> Sleep Quality</span>
                  <span className="text-blue-600 font-bold">{formData.sleep_quality}/10</span>
                </label>
                <input type="range" name="sleep_quality" min="1" max="10" value={formData.sleep_quality} onChange={handleChange} className="w-full accent-blue-500" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 mt-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold shadow-xl shadow-gray-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {loading ? "Processing AI Matrix..." : "Run Prediction Model"}
            </button>
          </form>
        </div>

        {result !== null && (
          <div className="mt-8 glass-panel rounded-3xl p-8 max-w-2xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-gray-500 font-semibold mb-2 uppercase tracking-widest text-xs">Projected Outcome</h3>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-7xl font-black text-gray-900 tracking-tighter">{result}</span>
              <span className="text-2xl text-gray-400 font-bold">/100</span>
            </div>
            <p className="mt-4 text-gray-600 font-medium">
              {result >= 85 ? "Exceptional cognitive alignment. Keep up the deep work." : 
               result >= 65 ? "Solid performance. Reducing distractions will push this higher." : 
               "High friction detected. Prioritize sleep quality and deep work state."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}