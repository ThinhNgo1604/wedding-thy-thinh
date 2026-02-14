
import React from 'react';

export const BRIDE_NAME = "Thy Huỳnh";
export const GROOM_NAME = "Thịnh Ngô";
export const WEDDING_DATE = "2027-04-16"; // Định dạng YYYY-MM-DD để dễ tính countdown
export const DISPLAY_DATE = "16.04.2027";
export const WEDDING_TIME = "11:00 AM";
export const WEDDING_LOCATION = "Riverside Palace";
export const WEDDING_ADDRESS = "360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh";

// URL Google Sheet dùng chung cho toàn ứng dụng
export const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzlPP2TGUzxQgort3hq-pGHG2FftgmSVKrSRi_uVN_5d5PkVBU8FulIT7_qdr1mjSne3g/exec';

export const HeartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const MusicIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

export const MapPinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
