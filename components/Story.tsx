
import React, { useEffect, useState, useRef } from 'react';

const StoryItem: React.FC<{ item: any, index: number }> = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
      className={`flex flex-row items-start mb-16 md:mb-32 last:mb-0 gap-4 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Image Side - Hiện ra trước */}
      <div className="w-[40%] md:w-1/2">
        <div className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="absolute -inset-1 md:-inset-2 bg-[#f7ebe4] rounded-lg md:rounded-2xl transform rotate-2"></div>
          <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square md:aspect-[4/3]">
            <img 
              src={item.img} 
              alt={item.title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      {/* Content Side */}
      <div className="w-[60%] md:w-1/2 flex flex-col justify-center">
        {/* Year - Hiện sau 0.5s */}
        <div 
          className={`inline-block self-start px-3 py-0.5 md:px-6 md:py-1 bg-[#fdf8f5] text-[#c9a68a] rounded-full text-[10px] md:text-sm font-bold mb-2 md:mb-4 border border-[#e8d5cc] transition-all duration-500 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {item.year}
        </div>

        {/* Title - Hiện sau 1.0s (0.5s sau năm) */}
        <h3 
          className={`text-lg md:text-3xl font-serif text-gray-800 mb-2 md:mb-6 transition-all duration-500 delay-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {item.title}
        </h3>

        {/* Description - Chạy dần trong 3s sau khi tiêu đề hiện (từ 1.5s) */}
        <div className={`relative overflow-hidden transition-all duration-500 delay-[1500ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
           <p className={`text-gray-600 leading-relaxed italic text-xs md:text-lg font-serif ${isVisible ? 'animate-text-reveal' : ''}`}>
             {item.desc}
           </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes textReveal {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        .animate-text-reveal {
          display: inline-block;
          animation: textReveal 3s linear forwards;
          animation-delay: 1.5s; /* Bắt đầu sau khi Title hiện xong */
        }
      `}} />
    </div>
  );
};

const Story: React.FC = () => {
  const milestones = [
    {
      year: "2019",
      title: "Cuộc Gặp Gỡ",
      desc: "Giữa không gian rộn ràng của hội chợ Quận 7 năm 2019, định mệnh đã đưa hai tâm hồn đồng điệu tìm thấy nhau. Chỉ một ánh mắt khẽ chạm, một nụ cười tỏa nắng của Thy đã khiến trái tim Thịnh lỗi nhịp. Giây phút ấy, anh biết mình đã say đắm em mất rồi.",
      img: "https://lh3.googleusercontent.com/pw/AP1GczOs0hNN2M7cfWbgW6OF-lj0VvFc0mGfjqpl34eTYNO6G7tm2fbWQ_zmdbA1sAZ4hqfiYqdAZRm_-jBfhewrdmzN7proXSvfADj69WetkSguizR0ANH4znzSJXbPRDlrPpVZ5la85uOUyziBIFMV9UXRQA=w2212-h1662-s-no-gm?authuser=0"
    },
    {
      year: "2020",
      title: "Lời Tỏ Tình",
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
      title: "Lời Cầu Hôn",
      desc: "Trong một đêm lãng mạn tại đảo Penang, Malaysia - nơi tiếng sóng biển rì rào, Thịnh đã quỳ xuống trao chiếc nhẫn ước hẹn. Dưới bầu trời đêm lấp lánh và hơi thở nồng nàn của biển cả, lời cầu hôn chân thành của anh đã nhận được cái gật đầu hạnh phúc từ Thy. Giây phút ấy, cả thế giới như ngừng lại, chỉ còn tình yêu của chúng mình tỏa sáng rực rỡ.",
      img: "https://lh3.googleusercontent.com/pw/AP1GczPkO_zHUfYtbJE2KvbQuW4TOIT2xVl073Yvd72GKmH0SkfbaBofAPFI4jC4milosA9OKNj6v_0E3FhaLaA_Q-ICgLOwsZ4wAC25pvRlqkHUXg_aiVY99qpS5P88ygC0eZcVAJcl_oXz3CE0Awqc4EJ5oA=w2216-h1662-s-no-gm?authuser=0"
    }
  ];

  return (
    <section id="story" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-cursive text-[#b04a5a] mb-4">Câu Chuyện Tình Yêu</h2>
          <p className="text-gray-500 font-serif italic tracking-widest uppercase text-[10px] md:text-sm">Our Love Journey</p>
          <div className="w-24 h-px bg-[#c9a68a] mx-auto mt-6"></div>
        </div>

        <div className="relative">
          {/* Vertical Line - Ẩn trên mobile để trông thoáng hơn hoặc làm mờ đi */}
          <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 h-full w-px bg-[#e8d5cc]/30 hidden md:block"></div>

          {milestones.map((item, index) => (
            <StoryItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;
