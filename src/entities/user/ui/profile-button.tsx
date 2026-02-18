import React from 'react';
import { Profile } from './profile';

interface ProfileButtonProps {
  onClick?: () => void;
  className?: string;
  profileImage?: string | null;
}

export function ProfileButton({ onClick, className, profileImage }: ProfileButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-10 h-10 rounded-full flex items-center justify-center ${className} hover:cursor-pointer transition-transform active:scale-95`}
      aria-label="Toggle Sidebar"
    >
      <Profile src={profileImage} size={40} />
    </button>
  );
}
