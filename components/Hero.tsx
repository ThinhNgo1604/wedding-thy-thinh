
import React, { useState, useEffect } from 'react';
import { BRIDE_NAME, GROOM_NAME, DISPLAY_DATE, WEDDING_DATE } from '../constants';

const Countdown: React.FC = () => {
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
    <div className="flex gap-4 md:gap-8 justify-center mt-8 font-serif">
      {[
        { label: 'Ngày', value: timeLeft.days },
        { label: 'Giờ', value: timeLeft.hours },
        { label: 'Phút', value: timeLeft.minutes },
        { label: 'Giây', value: timeLeft.seconds }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-light">{item.value.toString().padStart(2, '0')}</span>
          <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-70 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  const handleScrollToRSVP = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('rsvp');
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] hover:scale-110"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Floating Petals Effect (CSS Only) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`petal petal-${i + 1}`}></div>
        ))}
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <p className="text-lg md:text-xl font-serif italic mb-6 tracking-[0.3em] uppercase opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Trân Trọng Kính Mời
        </p>
        
        <h1 className="text-6xl md:text-9xl font-cursive mb-8 flex flex-col md:flex-row items-center justify-center md:gap-12 drop-shadow-2xl">
          <span className="opacity-0 animate-name-in-left inline-block">
            <span className="inline-block animate-float">{GROOM_NAME}</span>
          </span>
          <span className="text-3xl md:text-5xl text-[#ffccd5] opacity-0 animate-fadeInScale" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>&</span>
          <span className="opacity-0 animate-name-in-right inline-block">
            <span className="inline-block animate-float-delayed">{BRIDE_NAME}</span>
          </span>
        </h1>
        
        <div className="w-32 h-px bg-white/50 mx-auto mb-8 opacity-0 animate-expandWidth" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}></div>
        
        <p className="text-xl md:text-2xl font-serif tracking-[0.2em] mb-4 opacity-0 animate-fadeIn" style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
          {DISPLAY_DATE}
        </p>
        
        <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
          <Countdown />
        </div>
        
        <div className="mt-16 opacity-0 animate-fadeInUp" style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
            <a 
                href="#rsvp" 
                onClick={handleScrollToRSVP}
                className="px-10 py-4 border border-white/30 text-white rounded-full font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-[#b04a5a] transition-all cursor-pointer bg-white/10 backdrop-blur-md inline-block animate-buttonPulse text-sm"
            >
                Xác Nhận Tham Dự
            </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes nameInLeft {
          from { opacity: 0; transform: translateX(-40px); filter: blur(10px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes nameInRight {
          from { opacity: 0; transform: translateX(40px); filter: blur(10px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes expandWidth {
          from { width: 0; opacity: 0; }
          to { width: 8rem; opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes petal-fall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(110vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
        .petal {
          position: absolute;
          width: 15px;
          height: 15px;
          background: #ffccd5;
          border-radius: 150% 0 150% 0;
          opacity: 0.6;
          animation: petal-fall 10s linear infinite;
        }
        ${[...Array(12)].map((_, i) => `
          .petal-${i+1} {
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
            animation-duration: ${7 + Math.random() * 5}s;
            width: ${10 + Math.random() * 10}px;
            height: ${10 + Math.random() * 10}px;
          }
        `).join('')}

        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 1.5s ease-out forwards; }
        .animate-fadeInScale { animation: fadeInScale 1.2s ease-out forwards; }
        .animate-name-in-left { animation: nameInLeft 1.2s ease-out 0.5s forwards; }
        .animate-name-in-right { animation: nameInRight 1.2s ease-out 0.5s forwards; }
        .animate-expandWidth { animation: expandWidth 1s ease-out forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float 4s ease-in-out 2s infinite; }
        .animate-buttonPulse { animation: buttonPulse 3s infinite ease-in-out; }
        
        @keyframes buttonPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); transform: scale(1); }
          50% { box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.2); transform: scale(1.02); }
        }
      `}} />
    </section>
  );
};

export default Hero;
