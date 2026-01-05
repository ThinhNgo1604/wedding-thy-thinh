
import React, { useState, useEffect, useRef } from 'react';
import Envelope from './components/Envelope';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Couple from './components/Couple';
import Story from './components/Story';
import Info from './components/Info';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import { AppState } from './types';
import { MusicIcon } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ENVELOPE);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Đường dẫn file nhạc - Đảm bảo thư mục music/ nằm cùng cấp với index.html
  // Đã xóa dấu / ở đầu để trình duyệt tìm kiếm tương đối từ vị trí file chạy
  const musicUrl = 'https://res.cloudinary.com/dklced9dg/video/upload/v1767622581/Vanessa_Carlton_-_A_Thousand_Miles_qx8mzh.mp3';
  

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
            console.warn("Autoplay bị chặn bởi trình duyệt. Đang chờ tương tác...", error);
            setIsAudioPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  const handleOpenInvitation = () => {
    setAppState(AppState.MAIN_CONTENT);
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.5;
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch((err) => {
            console.error("Lỗi phát nhạc khi mở thiệp:", err);
            setTimeout(() => {
              audioRef.current?.play().then(() => setIsAudioPlaying(true));
            }, 500);
        });
    }
  };

  const toggleAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (audioError) {
      if (audioRef.current) {
        audioRef.current.load();
        setAudioError(false);
      }
      return;
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="relative animate-fadeIn">
      <audio 
        ref={audioRef}
        src={musicUrl} 
        loop 
        preload="auto"
        playsInline
        onCanPlay={() => {
          setIsAudioReady(true);
          setAudioError(false);
        }}
        onError={(e) => {
          console.error("Không thể tải file nhạc tại:", musicUrl, e);
          setAudioError(true);
        }}
      />

      {appState === AppState.ENVELOPE ? (
        <Envelope onOpen={handleOpenInvitation} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Couple />
          <Story />
          <Gallery />
          <Info />
          <RSVP />
          <Guestbook />
          <Footer isAudioPlaying={isAudioPlaying} onToggleAudio={toggleAudio} />

          <div className="fixed bottom-6 right-6 z-[60]">
            <button
              onClick={toggleAudio}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-90 relative ${
                isAudioPlaying 
                  ? 'bg-[#b04a5a] text-white' 
                  : 'bg-white text-[#b04a5a] border border-[#e8d5cc]'
              } ${audioError ? 'bg-red-50 text-white' : ''}`}
            >
              {isAudioPlaying && !audioError && (
                <span className="absolute inset-0 rounded-full bg-[#b04a5a] animate-ping opacity-40"></span>
              )}
              <div className={`${isAudioPlaying && !audioError ? 'animate-spin-slow' : ''} z-10`}>
                <MusicIcon className="w-6 h-6" />
              </div>
              {audioError && (
                <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md">!</div>
              )}
            </button>
            {audioError && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/80 text-white text-[10px] py-1 px-3 rounded whitespace-nowrap">
                  Lỗi file nhạc: {musicUrl}
                </div>
            )}
          </div>
        </>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}} />
    </div>
  );
};

export default App;
