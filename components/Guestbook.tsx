
import React, { useState, useEffect } from 'react';
import { GuestWish } from '../types';

const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage để hiển thị demo
    const savedWishes = localStorage.getItem('wedding_wishes');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    }

    // Lắng nghe sự kiện storage để cập nhật khi có lời chúc mới
    const handleStorageChange = () => {
      const updated = localStorage.getItem('wedding_wishes');
      if (updated) setWishes(JSON.parse(updated));
    };
    window.addEventListener('storage', handleStorageChange);
    // Tạo custom event để cập nhật ngay trong cùng một tab
    window.addEventListener('wish_updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wish_updated', handleStorageChange);
    };
  }, []);

  if (wishes.length === 0) return null;

  return (
    <section id="guestbook" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cursive text-[#b04a5a] mb-2">Lời Chúc Từ Bạn Bè</h2>
          <p className="text-gray-500 font-serif italic">Những tình cảm chân thành dành cho cặp đôi</p>
          <div className="w-20 h-1 bg-[#c9a68a] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishes.slice().reverse().map((wish, idx) => (
            <div key={idx} className="bg-[#fdf8f5] p-6 rounded-2xl border border-[#e8d5cc] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-cursive text-[#b04a5a]">{wish.name}</h3>
                <span className="text-[10px] text-gray-400 uppercase tracking-tighter">
                  {new Date(wish.timestamp).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <p className="text-gray-600 italic font-serif leading-relaxed">"{wish.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
