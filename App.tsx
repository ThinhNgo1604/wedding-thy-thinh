
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
  
  const [musicSourceIndex, setMusicSourceIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Đường dẫn file nhạc nằm cùng cấp với index.html
  const musicSources = [
    "https://res.cloudinary.com/dklced9dg/video/upload/v1767370423/wedding-music_gihg4k.mp3"
  ];

  const currentMusicUrl = musicSources[musicSourceIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || audioError) return;

    if (isAudioPlaying) {
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
            console.log("Audio play prevented:", error);
        });
      }
    } else {
      audio.pause();
    }
  }, [isAudioPlaying, audioError, currentMusicUrl]);

  const handleOpenInvitation = () => {
    setAppState(AppState.MAIN_CONTENT);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch(() => {
            console.log("Audio play blocked by browser. User interaction required.");
            setIsAudioPlaying(false);
        });
    }
  };

  const toggleAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (audioError) {
      setAudioError(false);
      setMusicSourceIndex(0);
      return;
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleAudioError = () => {
    if (musicSourceIndex < musicSources.length - 1) {
      setMusicSourceIndex(prev => prev + 1);
    } else {
      setAudioError(true);
      setIsAudioPlaying(false);
    }
  };

  return (
    <div className="relative animate-fadeIn">
      <audio 
        ref={audioRef}
        src={currentMusicUrl} 
        loop 
        preload="auto"
        playsInline
        onCanPlay={() => {
          setIsAudioReady(true);
          setAudioError(false);
        }}
        onError={handleAudioError}
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
              } ${audioError ? 'bg-gray-200 text-gray-500' : ''}`}
            >
              {isAudioPlaying && !audioError && (
                <span className="absolute inset-0 rounded-full bg-[#b04a5a] animate-ping opacity-40"></span>
              )}
              <div className={`${isAudioPlaying && !audioError ? 'animate-spin-slow' : ''} z-10`}>
                <MusicIcon className="w-6 h-6" />
              </div>
              {audioError && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md">!</div>
              )}
            </button>
          </div>
        </>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-zoomIn { animation: zoomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}} />
    </div>
  );
};

export default App;
