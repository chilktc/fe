'use client';

import { Profile } from '@/entities/user/ui';
import { useSessionStore } from '@/entities/session/model/store';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/features/auth/ui/auth-guard';

export default function AccountPage() {
  const user = useSessionStore((state) => state.user);
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <AuthGuard>
      <div className="relative min-h-dvh bg-[#1A1A1A] text-white p-4 flex flex-col items-center">
        {/* 뒤로가기 버튼 */}
        <button 
          onClick={() => router.back()}
          className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 프로필 이미지와 이메일 */}
        <div className="mt-16 flex flex-col items-center space-y-3">
          <Profile src={user.profileImage} nickname={user.nickname} size={100} />
          <p className="text-[14px] text-gray-400 font-medium">
            {user.email}
          </p>
        </div>

        {/* 프로필 수정 폼 */}
        <div className="mt-12 w-full max-w-sm space-y-8 flex-1">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-300 px-1">
              사용자 이름
            </label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue={user.nickname}
                className="w-full bg-[#232425] border border-[#55585D] rounded-2xl p-4 text-white focus:outline-none focus:border-[#F8B4CA] transition-colors"
                placeholder="이름을 입력하세요"
              />
            </div>
          </div>

          {/* 저장 및 취소 버튼 */}
          <div className="flex flex-col space-y-3 pt-2">
            <button 
              className="w-full py-4 bg-[#E22F83] font-bold rounded-2xl hover:cursor-pointer"
            >
              프로필 저장
            </button>
            <button 
              onClick={() => router.back()}
              className="self-center text-gray-500 font-medium hover:cursor-pointer py-2"
            >
              취소
            </button>
          </div>
        </div>

        {/* 계정 삭제 버튼 */}
        <div className="mt-auto w-full max-w-sm border-t border-[#55585D]">
          <button className="w-full py-4 flex items-center justify-center space-x-2 text-[#F576A6] hover:cursor-pointer">
            <span>계정 삭제</span>
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
