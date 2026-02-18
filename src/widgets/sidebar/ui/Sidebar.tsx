import { Profile } from '@/entities/user/ui';
import { User } from '@/entities/user/model/types';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function Sidebar({ isOpen, onClose, user }: SidebarProps) {

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar Content */}
      <aside 
        className={`absolute top-0 left-0 h-dvh w-[285px] p-4 bg-[#232425] shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="border-b border-[#55585D] pb-4">
            <div className="flex items-center space-x-6">
              <Profile src={user.profileImage} nickname={user.nickname} size={64} />
              <div className="flex-1">
                <p className="text-[14px] font-bold text-white">{user.nickname}</p>
                <p className="text-[11px] text-white font-bold truncate">{user.email}</p>
                <Link 
                  href="/account" 
                  onClick={onClose}
                  className="text-[12px] font-medium truncate text-[#F8B4CA] hover:underline hover:cursor-pointer"
                >
                  계정 관리
                </Link>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 py-6 space-y-4 overflow-y-auto">
            <a href="/" className="flex items-center text-[#E9EAEE]">
              <span>팟캐스트 기록</span>
            </a>
            <a href="/" className="flex items-center text-[#E9EAEE]">
              <span>알림</span>
            </a>
            <a href="/" className="flex items-center text-[#E9EAEE]">
              <span>정보</span>
            </a>
            <a href="/" className="flex items-center text-[#E9EAEE]">
              <span>도움말</span>
            </a>
          </nav>
          
          <div className='w-full'>
            <button className='hover:cursor-pointer text-[#F576A6]'>
              로그아웃
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
