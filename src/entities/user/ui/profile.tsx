interface ProfileProps {
  src?: string | null;
  nickname?: string | null;
  size?: number;
  className?: string;
}

export function Profile({ src, nickname, size = 32, className = '' }: ProfileProps) {
  // 이미지가 있는 경우
  if (src) {
    return (
      <div 
        className={`shrink-0 rounded-full overflow-hidden bg-gray-200 ${className}`}
        style={{ width: size, height: size }}
      >
        <img 
          src={src} 
          alt={nickname || 'Profile'} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // 이미지가 없는 경우 기본 SVG
  return (
    <div 
      className={`shrink-0 rounded-full flex items-center justify-center bg-[#E9EAEE] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#E9EAEE"/>
        <mask id="mask0_profile" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
          <circle cx="16" cy="16" r="16" fill="white"/>
        </mask>
        <g mask="url(#mask0_profile)">
          <path d="M21 10C21 12.7614 18.7614 15 16 15C13.2386 15 11 12.7614 11 10C11 7.23858 13.2386 5 16 5C18.7614 5 21 7.23858 21 10Z" fill="#8B8F97"/>
          <path d="M28 29C28 35.6274 22.6274 41 16 41C9.37258 41 4 35.6274 4 29C4 22.3726 9.37258 17 16 17C22.6274 17 28 22.3726 28 29Z" fill="#8B8F97"/>
        </g>
      </svg>
    </div>
  );
}
