
import React from 'react';
import { BRIDE_NAME, GROOM_NAME, HeartIcon, MusicIcon } from '../constants';

interface FooterProps {
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}

const Footer: React.FC<FooterProps> = ({ isAudioPlaying, onToggleAudio }) => {
  return (
    <footer className="py-16 bg-white text-center border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-cursive text-[#b04a5a] mb-4">{BRIDE_NAME} & {GROOM_NAME}</h2>
        
        <div className="flex justify-center items-center gap-4 text-[#c9a68a] mb-8">
          <div className="h-px w-8 bg-[#c9a68a]"></div>
          <HeartIcon className="w-6 h-6 animate-heartbeat" />
          <div className="h-px w-8 bg-[#c9a68a]"></div>
        </div>

        {onToggleAudio && (
          <div className="mb-10">
            <button 
              onClick={onToggleAudio}
              className="inline-flex items-center gap-3 px-6 py-2 border border-[#c9a68a] rounded-full text-[#c9a68a] hover:bg-[#f7ebe4] transition-all group"
            >
              <div className={isAudioPlaying ? 'animate-spin' : ''}>
                <MusicIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-widest">
                {isAudioPlaying ? 'Tắt Nhạc Nền' : 'Bật Nhạc Nền'}
              </span>
            </button>
          </div>
        )}

        <p className="text-gray-500 font-serif italic mb-2">"Hạnh phúc là khi được cùng nhau già đi"</p>
        <p className="text-gray-400 text-sm">© 2026 Wedding Invitation. All rights reserved.</p>
        <span className="text-[11px] opacity-40">by T.Corny</span>
      </div>
    </footer>
  );
};

export default Footer;
