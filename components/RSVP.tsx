
import React, { useState } from 'react';
import { GuestWish } from '../types';
import { GOOGLE_SHEET_URL } from '../constants';

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    side: 'Nhà Trai',
    wish: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 1. Gửi lên Google Sheet
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          guests: formData.guests,
          side: formData.side,
          wish: formData.wish,
        }),
      });

      // 2. Kích hoạt cập nhật Guestbook bằng cách phát một sự kiện
      // (Chúng ta sẽ không lưu LocalStorage nữa vì Guestbook sẽ lấy từ Server)
      setTimeout(() => {
        window.dispatchEvent(new Event('wish_updated'));
      }, 1000);
      
      setStatus('success');
    } catch (error) {
      console.error("Gửi dữ liệu thất bại:", error);
      alert("Có lỗi xảy ra khi gửi xác nhận. Bạn vui lòng thử lại nhé!");
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <section id="rsvp" className="py-20 bg-[#f7ebe4]">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="bg-white p-12 rounded-3xl shadow-xl animate-zoomIn border border-[#e8d5cc]">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif text-gray-800 mb-4">Cảm ơn {formData.name}!</h2>
            <p className="text-gray-600 mb-8 font-serif italic">Lời chúc của bạn đã được gửi đi và sẽ hiển thị sớm trong danh sách lời chúc toàn cầu.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="px-8 py-3 bg-[#b04a5a] text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#9a3d4c] transition-all"
            >
              Gửi thêm lời chúc khác
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 bg-[#f7ebe4]">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cursive text-[#b04a5a] mb-2">Xác Nhận Tham Dự</h2>
          <p className="text-gray-500 font-serif italic uppercase text-[10px] tracking-[0.2em]">R.S.V.P</p>
          <div className="w-20 h-px bg-[#c9a68a] mx-auto mt-4"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl space-y-6 border border-[#e8d5cc]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Họ & Tên *</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 bg-[#fdf8f5] border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#c9a68a] outline-none transition-all font-serif"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Số điện thoại</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 bg-[#fdf8f5] border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#c9a68a] outline-none transition-all font-serif"
                placeholder="09xx xxx xxx"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Số lượng khách</label>
              <select 
                className="w-full px-4 py-3 bg-[#fdf8f5] border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#c9a68a] outline-none transition-all font-serif appearance-none"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
              >
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} người</option>)}
              </select>
            </div>
            <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Bạn là khách của</label>
                <div className="flex gap-2">
                {['Nhà Trai', 'Nhà Gái'].map(s => (
                    <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({...formData, side: s})}
                    className={`flex-1 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${formData.side === s ? 'bg-[#c9a68a] text-white border-[#c9a68a]' : 'bg-white text-gray-400 border-gray-100'}`}
                    >
                    {s}
                    </button>
                ))}
                </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Lời chúc dành cho cặp đôi</label>
            <textarea 
              rows={4}
              className="w-full px-4 py-3 bg-[#fdf8f5] border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#c9a68a] outline-none transition-all resize-none font-serif italic"
              placeholder="Nhập lời nhắn gửi yêu thương..."
              value={formData.wish}
              onChange={(e) => setFormData({...formData, wish: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-[#b04a5a] text-white rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-[#9a3d4c] transition-all shadow-lg active:scale-95 disabled:opacity-50 text-sm"
          >
            {status === 'loading' ? 'Đang gửi thông tin...' : 'Xác Nhận Tham Dự'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RSVP;
