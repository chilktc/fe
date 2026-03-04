import { useRef, useEffect } from "react";
import { TicketIssuanceMessage } from "./TicketIssuanceMessage";
import { ChatMessage } from "@/entities/ticket/model/types";

interface TicketIssuanceChatProps {
  history: ChatMessage[];
}

export function TicketIssuanceChat({ history }: TicketIssuanceChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 새로운 메시지가 오거나 컨테이너 크기가 변하면(textarea 확장 등) 하단으로 스크롤
  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };

    // 초기 및 내역 변경 시 스크롤
    scrollBottom();

    // 컨테이너 크기 변경 감지 (textarea가 늘어날 때 대응)
    const resizeObserver = new ResizeObserver(() => {
      scrollBottom();
    });

    resizeObserver.observe(scrollRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [history]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 space-y-1.5 scroll-smooth overflow-y-auto scrollbar-hide pb-5"
    >
      {history.map((msg) => {
        // history의 가장 마지막이 system이고, 그 system이 현재 보고 있는 msg일 때
        const isLatestSystem =
          msg.type === "system" && msg.id === history[history.length - 1].id;

        return (
          <TicketIssuanceMessage
            key={msg.id}
            message={msg}
            isLatestSystem={isLatestSystem}
          />
        );
      })}
    </div>
  );
}
