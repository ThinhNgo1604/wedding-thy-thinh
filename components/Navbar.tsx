
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
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
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className={`text-2xl font-cursive transition-colors hover:opacity-80 ${isScrolled ? 'text-[#b04a5a]' : 'text-white'}`}
        >
          Thịnh & Thy
        </a>
        
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

        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer group">
            <div className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-gray-800' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-gray-800' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-gray-800' : 'bg-white'}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
