
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Đóng menu mobile sau khi click
    
    if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const id = href.replace('#', '');
    const element = document.getElementById(id);
    
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { name: 'Cặp Đôi', href: '#couple' },
    { name: 'Câu Chuyện', href: '#story' },
    { name: 'Album', href: '#gallery' },
    { name: 'Sự Kiện', href: '#info' },
    { name: 'Tham Dự', href: '#rsvp' },
  ];

  return (
    <>
      {/* Thêm hidden md:block để ẩn trên mobile và hiện trên desktop */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a 
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className={`text-2xl font-cursive transition-colors hover:opacity-80 z-50 ${isScrolled || isMenuOpen ? 'text-[#b04a5a]' : 'text-white'}`}
          >
            Thịnh & Thy
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium uppercase tracking-widest transition-colors ${isScrolled ? 'text-gray-600 hover:text-[#b04a5a]' : 'text-white/80 hover:text-white'}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle Button (Vẫn giữ code cũ nhưng nav cha đã bị hidden md:block nên nút này cũng sẽ ẩn) */}
          <button 
            className="md:hidden z-50 flex flex-col gap-1.5 cursor-pointer p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 bg-[#b04a5a]' : (isScrolled ? 'bg-gray-800' : 'bg-white')}`}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : (isScrolled ? 'bg-gray-800' : 'bg-white')}`}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-[#b04a5a]' : (isScrolled ? 'bg-gray-800' : 'bg-white')}`}></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Cũng sẽ không thể mở được vì nút kích hoạt nằm trong nav đã ẩn */}
      <div className={`fixed inset-0 z-40 bg-white transition-all duration-500 ease-in-out transform md:hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
          {menuItems.map((item, idx) => (
            <a 
              key={item.name} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-xl font-serif tracking-[0.2em] text-[#b04a5a] uppercase transition-all duration-300 delay-${idx * 100} ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              {item.name}
            </a>
          ))}
          <div className="w-12 h-px bg-[#c9a68a] mt-4 opacity-50"></div>
          <p className="text-[#c9a68a] font-cursive text-2xl">Thịnh & Thy Wedding</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
