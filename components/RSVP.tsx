
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { GuestWish } from '../types';

// THAY ĐỔI TẠI ĐÂY: Dán URL App Script bạn vừa nhận được vào đây
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycby_YOUR_SCRIPT_ID/exec';

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    side: 'Nhà Trai',
    wish: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleGenerateWish = async () => {
    if (!formData.name) {
      alert("Vui lòng nhập tên của bạn trước nhé!");
      return;
    }
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Hãy viết 1 lời chúc đám cưới ngắn gọn, chân thành, vui vẻ bằng tiếng Việt cho cặp đôi Thy và Thịnh từ người bạn tên là ${formData.name}.`,
      });
      setFormData(prev => ({ ...prev, wish: response.text || '' }));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 1. Gửi dữ liệu đến Google Sheets (nếu đã có URL)
      if (GOOGLE_SHEET_URL.includes('macros/s/')) {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors', // Dùng no-cors để tránh lỗi chính sách trình duyệt với Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      // 2. Đồng thời lưu vào LocalStorage để hiển thị Lời chúc ngay trên web
      const newWish: GuestWish = {
        name: formData.name,
        message: formData.wish || "Chúc mừng hai bạn trăm năm hạnh phúc!",
        timestamp: Date.now()
      };

      const existingWishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
      localStorage.setItem('wedding_wishes', JSON.stringify([...existingWishes, newWish]));
      
      // Kích hoạt cập nhật Guestbook
      window.dispatchEvent(new Event('wish_updated'));
      
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
          <div className="bg-white p-12 rounded-3xl shadow-xl animate-zoomIn">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif text-gray-800 mb-4">Cảm ơn {formData.name}!</h2>
            <p className="text-gray-600 mb-8">Chúng mình đã nhận được xác nhận tham dự và lời chúc từ bạn. Dữ liệu đã được lưu vào danh sách khách mời!</p>
            <button 
              onClick={() => setStatus('idle')}
              className="text-[#c9a68a] font-bold hover:underline"
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
          <p className="text-gray-500 font-serif italic">Thông tin của bạn sẽ được gửi thẳng tới Google Sheet của cặp đôi</p>
          <div className="w-20 h-1 bg-[#c9a68a] mx-auto mt-4"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Họ & Tên *</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c9a68a] outline-none transition-all"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c9a68a] outline-none transition-all"
                placeholder="Để chúng mình tiện liên lạc"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng khách</label>
              <select 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c9a68a] outline-none transition-all"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
              >
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} người</option>)}
              </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bạn là khách của</label>
                <div className="flex gap-2">
                {['Nhà Trai', 'Nhà Gái'].map(s => (
                    <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({...formData, side: s})}
                    className={`flex-1 py-3 rounded-xl border text-sm transition-all ${formData.side === s ? 'bg-[#c9a68a] text-white border-[#c9a68a]' : 'bg-white text-gray-600 border-gray-200'}`}
                    >
                    {s}
                    </button>
                ))}
                </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Lời chúc dành cho cặp đôi</label>
              <button 
                type="button"
                onClick={handleGenerateWish}
                disabled={isGenerating}
                className="text-xs text-[#c9a68a] hover:text-[#b88f6f] font-bold flex items-center gap-1 bg-[#fdf8f5] px-3 py-1 rounded-full border border-[#e8d5cc]"
              >
                {isGenerating ? (
                    <div className="w-3 h-3 border-2 border-[#c9a68a] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                )}
                AI gợi ý lời chúc
              </button>
            </div>
            <textarea 
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c9a68a] outline-none transition-all resize-none"
              placeholder="Nhập lời nhắn gửi của bạn..."
              value={formData.wish}
              onChange={(e) => setFormData({...formData, wish: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-[#b04a5a] text-white rounded-xl font-bold uppercase tracking-widest hover:bg-[#9a3d4c] transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {status === 'loading' ? 'Đang xử lý...' : 'Gửi Xác Nhận'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RSVP;
