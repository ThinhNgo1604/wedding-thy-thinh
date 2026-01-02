
import React, { useState, useEffect } from 'react';
import { BRIDE_NAME, GROOM_NAME, HeartIcon, WEDDING_DATE } from '../constants';

interface EnvelopeProps {
  onOpen: () => void;
}

const EnvelopeCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(`${WEDDING_DATE}T00:00:00`).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 justify-center mt-6 font-serif">
      {[
        { label: 'Ngày', value: timeLeft.days },
        { label: 'Giờ', value: timeLeft.hours },
        { label: 'Phút', value: timeLeft.minutes },
        { label: 'Giây', value: timeLeft.seconds }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <span className="text-xl md:text-2xl font-light text-[#b04a5a]">{item.value.toString().padStart(2, '0')}</span>
          <span className="text-[8px] uppercase tracking-widest text-gray-400">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Tạo độ trễ nhỏ để animation chạy xong trước khi switch state
    setTimeout(onOpen, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7ebe4] p-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 border border-[#b04a5a] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 border border-[#b04a5a] rounded-full"></div>
      </div>

      <div className={`relative w-full max-w-lg transition-all duration-1000 ease-in-out ${isOpening ? 'scale-150 rotate-3 opacity-0 blur-lg' : 'scale-100 opacity-100'}`}>
        
        {/* Envelope Base */}
        <div className="relative bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden border border-[#e8d5cc] p-10 md:p-14 text-center">
          
          {/* LOGO WITH ENHANCED EFFECTS */}
          <div className="mb-6 flex justify-center">
            <div className="relative animate-float-slow">
              {/* Outer Glow Pulse */}
              <div className="absolute inset-0 bg-[#c9a68a] rounded-full blur-xl opacity-20 animate-pulse-slow"></div>
              
              <div className="w-20 h-20 bg-[#c9a68a] rounded-full flex items-center justify-center text-white shadow-2xl relative overflow-hidden group">
                 {/* Inner Border */}
                 <div className="absolute inset-1.5 border border-white/40 rounded-full z-10"></div>
                 
                 {/* Shine Sweep Effect */}
                 <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-shine"></div>
                 
                 {/* Logo Text */}
                 <span className="text-3xl font-serif tracking-tighter relative z-20 drop-shadow-md">T&T</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-lg md:text-xl font-serif text-[#8a6d5d] mb-2 uppercase tracking-[0.4em]">Wedding Invitation</h2>
          <div className="w-16 h-px bg-[#c9a68a] mx-auto mb-8"></div>
          
          <p className="font-serif italic text-base text-[#5d4037] mb-8 leading-relaxed">
            Chúng mình trân trọng kính mời Bạn<br/>đến tham dự buổi tiệc thân mật của
          </p>
          
          <div className="flex flex-col items-center gap-2 mb-10">
            <span className="text-5xl md:text-6xl font-cursive text-[#b04a5a]">{GROOM_NAME}</span>
            <div className="flex items-center gap-6 text-[#c9a68a]">
              <div className="h-px w-8 bg-[#c9a68a]"></div>
              <HeartIcon className="w-5 h-5 animate-heartbeat text-[#b04a5a]" />
              <div className="h-px w-8 bg-[#c9a68a]"></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-cursive text-[#b04a5a]">{BRIDE_NAME}</span>
              <EnvelopeCountdown />
            </div>
          </div>

          <button 
            onClick={handleOpen}
            className="group relative px-12 py-4 bg-[#b04a5a] text-white rounded-full font-bold uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-[#b04a5a]/40 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Mở Thiệp</span>
            <div className="absolute inset-0 bg-[#9a3d4c] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>

        {/* Corner Decorations */}
        <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-[#c9a68a] pointer-events-none opacity-40"></div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-[#c9a68a] pointer-events-none opacity-40"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.3); opacity: 0.3; }
        }
        .animate-shine {
          animation: shine 4s infinite ease-in-out;
        }
        .animate-float-slow {
          animation: float-slow 4s infinite ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default Envelope;
