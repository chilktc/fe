export function GreenroomLoading() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
      {/* 로티 이미지가 들어갈 임시 플레이스홀더 */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary-100 rounded-full animate-ping opacity-60"></div>
        <div className="relative w-20 h-20 bg-primary-400 rounded-full flex flex-col items-center justify-center shadow-lg animate-pulse"></div>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-body-6 text-gray-800">잠시만 기다려주세요</p>
        <h3 className="text-heading-3 text-gray-900">
          당신만을 위한 주파수를
          <br />
          맞추는 중이에요...
        </h3>
      </div>
    </div>
  );
}
