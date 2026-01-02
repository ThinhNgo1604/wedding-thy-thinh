
import React, { useState } from 'react';
import { BRIDE_NAME, GROOM_NAME } from '../constants';

const Couple: React.FC = () => {
  const [groomImgError, setGroomImgError] = useState(false);
  const [brideImgError, setBrideImgError] = useState(false);

  // ĐÃ SỬA: Bỏ dấu "/" ở đầu để dùng đường dẫn tương đối từ folder image/
  const brideImg = "https://lh3.googleusercontent.com/pw/AP1GczMaEqOSQLx4ucG7KcfIOJvJkrgqrYmmWw7eYu_aavCWt5b8Th74jk-5xWpApCpMEHuLcGHuimkvf3JJHcp4pyNpu3NTDJIDx2BY9yQu9J7LvR6e9A0o6cYFjNDuvTbb5feSWAF-KxXgcNCuyQuopU4aHQ=w2506-h1662-s-no-gm?authuser=0";
  const groomImg = "https://lh3.googleusercontent.com/pw/AP1GczOzm_p6rkM5pS_RpjzyAbRkmclE0JddNNcorH-pCZ6sGmCinHe-xtU8wa2YjlI_yHA1-LmT2VM8GBbQZiMEYtpuhPXwc1ZIqoG-_xNhF2aGFJi2Jzdq5kIet6iC2aXP2GWNLwptQHeXDwIZHu4L1FVKTw=w1246-h1662-s-no-gm?authuser=0";

  const fallbackGroom = "https://images.unsplash.com/photo-1550005814-266453966fb7?auto=format&fit=crop&q=80&w=800";
  const fallbackBride = "https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&q=80&w=800";

  return (
    <section id="couple" className="py-24 bg-[#fdf8f5]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cursive text-[#b04a5a] mb-4">Cô dâu và Chú Rể</h2>
          <p className="text-gray-500 font-serif italic tracking-widest uppercase text-sm">The Happy Couple</p>
          <div className="w-24 h-px bg-[#c9a68a] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Chú Rể */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-8">
              <div className="absolute -inset-4 border-2 border-[#c9a68a] rounded-full scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10 bg-gray-100">
                <img 
                  src={groomImgError ? fallbackGroom : groomImg} 
                  alt={GROOM_NAME} 
                  onError={() => {
                    console.error("Không thể tải ảnh chú rể tại:", groomImg);
                    setGroomImgError(true);
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {groomImgError && (
                  <div className="absolute bottom-2 left-0 right-0 text-[10px] bg-red-500/80 text-white text-center py-1">
                    Lỗi file: {groomImg}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 text-[#c9a68a]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
            </div>
            <h3 className="text-4xl font-cursive text-[#b04a5a] mb-2">{GROOM_NAME}</h3>
            <p className="text-gray-600 font-serif italic text-lg border-t border-[#e8d5cc] pt-4 mt-2 px-6 text-center">
              Chú rể với sự lịch thiệp và tình yêu sâu sắc luôn dành cho cô dâu.
            </p>
          </div>

          {/* Cô Dâu */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-8">
              <div className="absolute -inset-4 border-2 border-[#b04a5a] rounded-full scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10 bg-gray-100">
                <img 
                  src={brideImgError ? fallbackBride : brideImg} 
                  alt={BRIDE_NAME} 
                  onError={() => {
                    console.error("Không thể tải ảnh cô dâu tại:", brideImg);
                    setBrideImgError(true);
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {brideImgError && (
                  <div className="absolute bottom-2 left-0 right-0 text-[10px] bg-red-500/80 text-white text-center py-1">
                    Lỗi file: {brideImg}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 text-[#b04a5a]">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                 </svg>
              </div>
            </div>
            <h3 className="text-4xl font-cursive text-[#b04a5a] mb-2">{BRIDE_NAME}</h3>
            <p className="text-gray-600 font-serif italic text-lg border-t border-[#e8d5cc] pt-4 mt-2 px-6 text-center">
              Cô dâu xinh đẹp, dễ thương, là điều ngọt ngào nhất mà anh tìm thấy trong cuộc đời mình.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Couple;
