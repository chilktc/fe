interface SectionProps {
  title: string;
  content?: string;
}

export function Section({ title, content }: SectionProps) {
  return (
    <div className="space-y-1">
      <h3 className="text-heading-6 text-gray-900 font-bold">{title}</h3>
      <p className="text-body-6 text-gray-800 whitespace-pre-wrap">
        {content || "정보가 없습니다."}
      </p>
    </div>
  );
}
