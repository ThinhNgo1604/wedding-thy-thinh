
import React from 'react';
import { DISPLAY_DATE, WEDDING_TIME, WEDDING_LOCATION, WEDDING_ADDRESS, MapPinIcon } from '../constants';

const Info: React.FC = () => {
  return (
    <section id="info" className="py-24 bg-[#fdf8f5]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#e8d5cc]">
          
          <div className="w-full md:w-1/2 p-12 md:p-16 bg-[#c9a68a] text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full"></div>

            <h2 className="text-3xl font-serif mb-10 uppercase tracking-[0.2em] border-b border-white/20 pb-6 w-full z-10">Lễ Thành Hôn</h2>
            
            <div className="mb-10 z-10">
              <p className="text-4xl md:text-5xl font-cursive mb-4">{DISPLAY_DATE}</p>
              <div className="flex items-center justify-center gap-3 text-lg opacity-90">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Vào lúc: {WEDDING_TIME}</span>
              </div>
            </div>
            
            <div className="space-y-4 z-10">
              <div className="flex flex-col items-center">
                <MapPinIcon className="w-8 h-8 mb-4 opacity-80" />
                <p className="text-2xl font-serif italic mb-2">{WEDDING_LOCATION}</p>
                <p className="text-sm opacity-80 max-w-xs">{WEDDING_ADDRESS}</p>
              </div>
            </div>

            <div className="mt-12 z-10">
                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(WEDDING_ADDRESS)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#c9a68a] rounded-full font-bold hover:bg-[#f7ebe4] transition-all shadow-xl group"
                >
                    Chỉ đường đến tiệc
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative group">
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000" 
              alt="Venue" 
              className="w-full h-full object-cover min-h-[500px] transition-transform duration-[3s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#b04a5a]/10 group-hover:bg-transparent transition-colors"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
