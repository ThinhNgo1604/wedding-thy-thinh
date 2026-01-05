
import React, { useState, useEffect, useRef } from 'react';
import { BRIDE_NAME, GROOM_NAME } from '../constants';

const Couple: React.FC = () => {
  const [groomImgError, setGroomImgError] = useState(false);
  const [brideImgError, setBrideImgError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const groomImg = "https://lh3.googleusercontent.com/pw/AP1GczOzm_p6rkM5pS_RpjzyAbRkmclE0JddNNcorH-pCZ6sGmCinHe-xtU8wa2YjlI_yHA1-LmT2VM8GBbQZiMEYtpuhPXwc1ZIqoG-_xNhF2aGFJi2Jzdq5kIet6iC2aXP2GWNLwptQHeXDwIZHu4L1FVKTw=w1246-h1662-s-no-gm?authuser=0";
  const brideImg = "https://lh3.googleusercontent.com/pw/AP1GczMaEqOSQLx4ucG7KcfIOJvJkrgqrYmmWw7eYu_aavCWt5b8Th74jk-5xWpApCpMEHuLcGHuimkvf3JJHcp4pyNpu3NTDJIDx2BY9yQu9J7LvR6e9A0o6cYFjNDuvTbb5feSWAF-KxXgcNCuyQuopU4aHQ=w2506-h1662-s-no-gm?authuser=0";

  const fallbackGroom = "https://images.unsplash.com/photo-1550005814-266453966fb7?auto=format&fit=crop&q=80&w=800";
  const fallbackBride = "https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&q=80&w=800";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="couple" ref={sectionRef} className="py-24 bg-[#fdf8f5] overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-cursive text-[#b04a5a] mb-4">Cô dâu và Chú Rể</h2>
          <p className="text-gray-500 font-serif italic tracking-widest uppercase text-sm">The Happy Couple</p>
          <div className="w-24 h-px bg-[#c9a68a] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          
          {/* Chú Rể - Reveal from Left */}
          <div 
            className={`flex flex-col items-center group transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-12 scale-95'}`}
          >
            <div className="relative mb-8">
              <div className="absolute -inset-4 border-2 border-[#c9a68a]/30 rounded-full scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10 bg-gray-100">
                <img 
                  src={groomImgError ? fallbackGroom : groomImg} 
                  alt={GROOM_NAME} 
                  onError={() => setGroomImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className={`absolute -bottom-4 -right-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 text-[#c9a68a] transition-all duration-500 delay-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
            </div>
            <div className={`text-center transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h3 className="text-4xl font-cursive text-[#b04a5a] mb-2">{GROOM_NAME}</h3>
              <p className="text-gray-600 font-serif italic text-lg border-t border-[#e8d5cc] pt-4 mt-2 px-6">
                Chú rể lịch thiệp, luôn dành trọn tình yêu cho cô dâu.
              </p>
            </div>
          </div>

          {/* Cô Dâu - Reveal from Right with 0.5s delay */}
          <div 
            className={`flex flex-col items-center group transition-all duration-500 ease-out delay-500 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}
          >
            <div className="relative mb-8">
              <div className="absolute -inset-4 border-2 border-[#b04a5a]/30 rounded-full scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10 bg-gray-100">
                <img 
                  src={brideImgError ? fallbackBride : brideImg} 
                  alt={BRIDE_NAME} 
                  onError={() => setBrideImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className={`absolute -bottom-4 -left-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 text-[#b04a5a] transition-all duration-500 delay-[1000ms] ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                 </svg>
              </div>
            </div>
            <div className={`text-center transition-all duration-500 delay-[700ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h3 className="text-4xl font-cursive text-[#b04a5a] mb-2">{BRIDE_NAME}</h3>
              <p className="text-gray-600 font-serif italic text-lg border-t border-[#e8d5cc] pt-4 mt-2 px-6">
                Cô dâu xinh đẹp, là món quà tuyệt vời nhất của chú rể.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Couple;
