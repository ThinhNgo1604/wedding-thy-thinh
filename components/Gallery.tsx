
import React, { useState, useEffect, useRef } from 'react';

interface GalleryItemProps {
  src: string;
  idx: number;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, idx, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.2, // Hiện ra khi thấy 20% tấm ảnh
        rootMargin: '0px 0px -50px 0px' // Kích hoạt sớm một chút trước khi vào hẳn khung hình
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={itemRef}
      className={`group relative overflow-hidden rounded-xl md:rounded-2xl aspect-square md:aspect-[3/4] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 transform 
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-90'}`}
      style={{ 
        // Độ trễ 0.5s giữa các ảnh trong cùng một đợt hiển thị
        transitionDelay: isVisible ? `${(idx % 2) * 500}ms` : '0ms'
      }}
      onClick={onClick}
    >
      <img 
        src={src} 
        alt={`Gallery ${idx}`} 
        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        loading="lazy"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out hidden md:block">
          <span className="text-white border border-white/80 px-6 py-2 rounded-full uppercase text-[10px] tracking-[0.2em] font-medium backdrop-blur-[2px]">
            Xem ảnh
          </span>
        </div>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const images = [
    "https://lh3.googleusercontent.com/pw/AP1GczOs0hNN2M7cfWbgW6OF-lj0VvFc0mGfjqpl34eTYNO6G7tm2fbWQ_zmdbA1sAZ4hqfiYqdAZRm_-jBfhewrdmzN7proXSvfADj69WetkSguizR0ANH4znzSJXbPRDlrPpVZ5la85uOUyziBIFMV9UXRQA=w2212-h1662-s-no-gm?authuser=0",
    "https://lh3.googleusercontent.com/pw/AP1GczNj4mXu04SrXs_CE6KPi9sU9rpm7cRl54LeDGLnrtj5tog_y2-fxrlYxjjwkk0SGAtcXXavskp7rvyxb24FvylRY_LnhwKsZak7mQMy3TYiw6wsZ4rvVODGdz-Og7fL1aLRyM2gBKzDepf7KW8ZrBCSDQ=w2216-h1662-s-no-gm?authuser=0",
    "https://lh3.googleusercontent.com/pw/AP1GczPizWwAxCCvHfnifIJShHKA6X4yVZBiHsEseJtsthrG_kzz_C_xDmVokZuKS2AvRM_U1IXnkap89Az6Zxq_PaT8Lrxg775BVSpVT9E7YbMf8zyKdc4SqY2SnJSmG4_CdZ2WqJTtOrnF9cfzQxgPcWLjqQ=w2758-h1551-s-no-gm?authuser=0",
    "https://lh3.googleusercontent.com/pw/AP1GczMRYO1VOC3Oh4zilumoWa-sHteHJbmWBodo_ZkOPDEERWMBhfdOTAUwW93mPnEJ3b8MkYB7Ua6WHQOwlf0Q-p5uXWJ8tUATbvooVdns6fDz2AXDMj9pHx11hGDneu0bLsttn56wJMEuWPBC7u6cmRdT1Q=w2216-h1662-s-no-gm?authuser=0",
    "https://lh3.googleusercontent.com/pw/AP1GczMmejyzV02UioKDOStKidydnmyH-z_00x7juwSvEVUEl5RGyUUvyFZbfKmik8YlyTQfDNaFqVB8BT1kQbemEyH9Vhkiuyvs5IeG9ntO7aMTG2OcFVMlJcNhyVAy7lSUYRflO4Zzc5zPkMIUrKtT0pXuZA=w2216-h1662-s-no-gm?authuser=0",
    "https://lh3.googleusercontent.com/pw/AP1GczPxdLTOP9btnQwQQfk5gaN2lqdljoDDAbABDXgYSJMo0-YGNxUWpkNPE95OD9sbmirMjXaHkqEddd0xrJBTK1CWXgHZM98DZRuKO7O-eGyq8bWXJN5Ab9WdLknUUQxcV_NtRMKwiuOPgv2_7sf_tPYFyw=w2940-h1654-s-no-gm?authuser=0",
  ];

  const openLightbox = (idx: number) => {
    setSelectedIdx(idx);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % images.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cursive text-[#b04a5a] mb-2">Album Hình Cưới</h2>
          <p className="text-gray-500 font-serif italic tracking-widest uppercase text-[10px]">Our Wedding Gallery</p>
          <div className="w-20 h-px bg-[#c9a68a] mx-auto mt-4"></div>
        </div>

        {/* Grid: 2 cột trên mobile, 3 cột trên desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
          {images.map((src, idx) => (
            <GalleryItem 
              key={idx} 
              src={src} 
              idx={idx} 
              onClick={() => openLightbox(idx)} 
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadeInFast"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
            onClick={closeLightbox}
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button 
            className="absolute left-2 md:left-8 text-white/50 hover:text-white transition-all transform hover:scale-110 z-[110]"
            onClick={prevImage}
          >
            <svg className="w-10 h-10 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative max-w-[95vw] md:max-w-[90vw] max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[selectedIdx]} 
              alt="Full Size" 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-lg animate-zoomIn"
            />
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/60 font-serif tracking-widest text-xs">
              {selectedIdx + 1} / {images.length}
            </div>
          </div>

          <button 
            className="absolute right-2 md:right-8 text-white/50 hover:text-white transition-all transform hover:scale-110 z-[110]"
            onClick={nextImage}
          >
            <svg className="w-10 h-10 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInFast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeInFast {
          animation: fadeInFast 0.3s ease-out forwards;
        }
        .animate-zoomIn {
          animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </section>
  );
};

export default Gallery;
