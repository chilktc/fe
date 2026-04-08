import { Section } from "./Section";

interface TicketTabProps {
  ticket: {
    situation: string;
    thought: string;
    action: string;
    colleagueReaction: string;
  };
}

export function TicketTab({ ticket }: TicketTabProps) {
  return (
    <div className="flex flex-col gap-6 pt-4 pb-8">
      <Section title="고민이 있는 상황" content={ticket.situation} />
      <Section title="자신의 생각" content={ticket.thought} />
      <Section title="자신의 행동 및 반응" content={ticket.action} />
      <Section title="동료의 반응" content={ticket.colleagueReaction} />
    </div>
  );
}
