export type MessageType = "system" | "user";

export interface ChatMessage {
  type: MessageType;
  content: string;
  id: string;
  guide?: string;
}

export interface CreateTicketRequest {
  situation: string;
  thought: string;
  action: string;
  colleagueReaction?: string;
}

export interface Ticket {
  id: string;
  userId: string;
  name: string;
  situation: string;
  thought: string;
  action: string;
  colleagueReaction: string;
  createdAt: string;
}

export interface CreateTicketResponse {
  code: string;
  message: string;
  data: Ticket;
}
