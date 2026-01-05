
import React, { useState, useEffect } from 'react';
import { GOOGLE_SHEET_URL } from '../constants';

interface GlobalWish {
  timestamp: string;
  name: string;
  wish: string;
}

const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<GlobalWish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWishes = async () => {
    setIsLoading(true);
    try {
      // Gọi phương thức GET tới App Script
      const response = await fetch(GOOGLE_SHEET_URL);
      const data = await response.json();
      
      // Lọc bỏ các dòng không có lời chúc và sắp xếp mới nhất lên đầu
      const validWishes = data.filter((item: GlobalWish) => item.wish && item.wish.trim() !== "");
      setWishes(validWishes.reverse());
      setError(false);
    } catch (err) {
      console.error("Lỗi khi lấy lời chúc:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();

    // Lắng nghe sự kiện gửi lời chúc thành công từ RSVP.tsx
    const handleWishUpdated = () => {
      // Đợi 2 giây để Google Sheet cập nhật xong rồi mới fetch lại
      setTimeout(fetchWishes, 2000);
    };

    window.addEventListener('wish_updated', handleWishUpdated);
    return () => window.removeEventListener('wish_updated', handleWishUpdated);
  }, []);

  if (!isLoading && wishes.length === 0) return null;

  return (
    <section id="guestbook" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cursive text-[#b04a5a] mb-4">Lời Chúc Từ Bạn Bè</h2>
          <p className="text-gray-500 font-serif italic tracking-widest uppercase text-[10px]">Guestbook Wishes</p>
          <div className="w-24 h-px bg-[#c9a68a] mx-auto mt-6"></div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 border-4 border-[#c9a68a]/20 border-t-[#c9a68a] rounded-full animate-spin mb-4"></div>
            <p className="text-[#c9a68a] font-serif italic">Đang tải những lời chúc yêu thương...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-400 font-serif">Không thể tải lời chúc lúc này. Hãy thử lại sau nhé!</p>
            <button onClick={fetchWishes} className="mt-4 text-[#c9a68a] underline font-bold">Thử lại</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishes.map((wish, idx) => (
              <div 
                key={idx} 
                className="group relative bg-[#fdf8f5] p-8 rounded-2xl border border-[#e8d5cc] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Decorative Quote Mark */}
                <div className="absolute top-4 right-6 text-[#c9a68a]/10 group-hover:text-[#c9a68a]/20 transition-colors">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56932 13 5.017 13H2.017V21H5.017Z" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-cursive text-[#b04a5a] mb-2">{wish.name}</h3>
                  <div className="w-8 h-px bg-[#c9a68a] mb-4"></div>
                  <p className="text-gray-600 italic font-serif leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                    "{wish.wish}"
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-[#e8d5cc]/50 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    <span>Thân gửi T&T</span>
                    <span>{wish.timestamp ? new Date(wish.timestamp).toLocaleDateString('vi-VN') : 'Mới đây'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Guestbook;
