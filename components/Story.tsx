
import React, { useEffect, useRef } from 'react';

const StoryItem: React.FC<{ item: any, index: number }> = ({ item, index }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={itemRef}
      className={`flex flex-col md:flex-row items-center mb-24 last:mb-0 opacity-0 translate-y-10 transition-all duration-700 ease-out reveal-item ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Image Side */}
      <div className="w-full md:w-1/2 px-4 md:px-12 mb-8 md:mb-0">
        <div className="relative group">
          <div className="absolute -inset-2 bg-[#f7ebe4] rounded-2xl transform rotate-3 transition-transform group-hover:rotate-0"></div>
          <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-[4/3]">
            <img 
              src={item.img} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      {/* Center Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#c9a68a] rounded-full hidden md:block z-10 border-4 border-white shadow-sm"></div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 px-4 md:px-12 text-center md:text-left">
        <div className={`inline-block px-6 py-1 bg-[#fdf8f5] text-[#c9a68a] rounded-full text-sm font-bold mb-4 border border-[#e8d5cc] ${index % 2 !== 0 ? 'md:ml-auto' : ''}`}>
          Năm {item.year}
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-6">{item.title}</h3>
        <p className="text-gray-600 leading-relaxed italic text-lg font-serif">
           "{item.desc}"
        </p>
      </div>
    </div>
  );
};

const Story: React.FC = () => {
  const milestones = [
    {
      year: "2019",
      title: "Cuộc Gặp Gỡ Định Mệnh",
      desc: "Giữa không gian rộn ràng của hội chợ Quận 7 năm 2019, định mệnh đã đưa hai tâm hồn đồng điệu tìm thấy nhau. Chỉ một ánh mắt khẽ chạm, một nụ cười tỏa nắng của Thy đã khiến trái tim Thịnh lỗi nhịp. Giây phút ấy, anh biết mình đã say đắm em mất rồi.",
      img: "https://lh3.googleusercontent.com/pw/AP1GczOs0hNN2M7cfWbgW6OF-lj0VvFc0mGfjqpl34eTYNO6G7tm2fbWQ_zmdbA1sAZ4hqfiYqdAZRm_-jBfhewrdmzN7proXSvfADj69WetkSguizR0ANH4znzSJXbPRDlrPpVZ5la85uOUyziBIFMV9UXRQA=w2212-h1662-s-no-gm?authuser=0"
    },
    {
      year: "2020",
      title: "Lời Tỏ Tình Ngọt Ngào",
      desc: "Dưới những tán hoa hồng rực rỡ, Thịnh đã lấy hết can đảm để nói lời yêu với Thy. Giữa hương hoa và ánh mắt lấp lánh niềm vui, chúng mình đã hứa sẽ cùng nhau đi qua mọi mùa hoa của cuộc đời. Đó là khoảnh khắc hai trái tim chính thức thuộc về nhau.",
      img: "https://lh3.googleusercontent.com/pw/AP1GczMH0ddfLs0O9TEb29vUrvdO2lII2wDfcAWIncdRK7njTscMFlBWModA8mFxpOgQcx0Yp2IEd_CDnCVEegKZow6AUEf4X1ZDi3vS7Q81httsiv5PuHTRJIDGZwOsW9OUFPeY9bgNwnB_dkWEPfojxDtOaA=w1248-h1662-s-no-gm?authuser=0"
    },
    {
      year: "2022 - 2025",
      title: "Bắt Đầu Yêu Xa",
      desc: "Khoảng cách địa lý không thể làm phai nhòa tình cảm. Cô dâu và chú rể đã trải qua 3 năm bên nhau và họ cũng đã đến được với nhau. Những cuộc gọi xuyên đêm, những nỗi nhớ đong đầy qua màn hình điện thoại đã tôi luyện nên một tình yêu bền chặt, sẵn sàng cho một chương mới hạnh phúc hơn.",
      img: "https://lh3.googleusercontent.com/pw/AP1GczMRYO1VOC3Oh4zilumoWa-sHteHJbmWBodo_ZkOPDEERWMBhfdOTAUwW93mPnEJ3b8MkYB7Ua6WHQOwlf0Q-p5uXWJ8tUATbvooVdns6fDz2AXDMj9pHx11hGDneu0bLsttn56wJMEuWPBC7u6cmRdT1Q=w2216-h1662-s-no-gm?authuser=0"
    },
    {
      year: "2025",
      title: "Lời Cầu Hôn Dưới Ánh Sao Penang",
      desc: "Trong một đêm lãng mạn tại đảo Penang, Malaysia - nơi tiếng sóng biển rì rào, Thịnh đã quỳ xuống trao chiếc nhẫn ước hẹn. Dưới bầu trời đêm lấp lánh và hơi thở nồng nàn của biển cả, lời cầu hôn chân thành của anh đã nhận được cái gật đầu hạnh phúc từ Thy. Giây phút ấy, cả thế giới như ngừng lại, chỉ còn tình yêu của chúng mình tỏa sáng rực rỡ.",
      img: "https://lh3.googleusercontent.com/pw/AP1GczPkO_zHUfYtbJE2KvbQuW4TOIT2xVl073Yvd72GKmH0SkfbaBofAPFI4jC4milosA9OKNj6v_0E3FhaLaA_Q-ICgLOwsZ4wAC25pvRlqkHUXg_aiVY99qpS5P88ygC0eZcVAJcl_oXz3CE0Awqc4EJ5oA=w2216-h1662-s-no-gm?authuser=0"
    }
  ];

  return (
    <section id="story" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-cursive text-[#b04a5a] mb-4">Câu Chuyện Tình Yêu</h2>
          <p className="text-gray-500 font-serif italic tracking-widest uppercase text-sm">Our Love Journey</p>
          <div className="w-24 h-px bg-[#c9a68a] mx-auto mt-6"></div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-[#e8d5cc] hidden md:block"></div>

          {milestones.map((item, index) => (
            <StoryItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .reveal-item.reveal-active {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}} />
    </section>
  );
};

export default Story;
