import { QUESTIONS, GUIDES } from "@/entities/ticket/model/constants";
import { ChatMessage } from "@/entities/ticket/model/types";

const TICKET_ISSUANCE_DRAFT_KEY = "ticket-issuance-draft";

interface TicketIssuanceDraft {
  answers: string[];
}

function isValidAnswer(value: unknown) {
  return typeof value === "string";
}

export function isTicketIssuanceDraft(
  value: unknown,
): value is TicketIssuanceDraft {
  if (typeof value !== "object" || value === null) return false;
  if (!("answers" in value)) return false;

  const { answers } = value;

  return (
    Array.isArray(answers) &&
    answers.length > 0 &&
    answers.length <= QUESTIONS.length &&
    answers.every(isValidAnswer)
  );
}

export function readTicketIssuanceDraft() {
  if (typeof window === "undefined") return null;

  const rawDraft = window.sessionStorage.getItem(TICKET_ISSUANCE_DRAFT_KEY);
  if (!rawDraft) return null;

  try {
    const parsedDraft = JSON.parse(rawDraft) as unknown;

    if (!isTicketIssuanceDraft(parsedDraft)) {
      clearTicketIssuanceDraft();
      return null;
    }

    return parsedDraft;
  } catch {
    clearTicketIssuanceDraft();
    return null;
  }
}

export function saveTicketIssuanceDraft(answers: string[]) {
  if (typeof window === "undefined") return;
  if (answers.length === 0) return;

  window.sessionStorage.setItem(
    TICKET_ISSUANCE_DRAFT_KEY,
    JSON.stringify({ answers }),
  );
}

export function clearTicketIssuanceDraft() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(TICKET_ISSUANCE_DRAFT_KEY);
}

export function buildTicketIssuanceHistory(
  answers: string[],
  nickname: string,
): ChatMessage[] {
  const history: ChatMessage[] = [
    {
      type: "system",
      content: QUESTIONS[0],
      id: "q-0",
      guide: GUIDES[0],
    },
  ];

  answers.forEach((answer, index) => {
    history.push({
      type: "user",
      content: answer,
      id: `a-${index}`,
    });

    const nextQuestionIndex = index + 1;

    if (nextQuestionIndex < QUESTIONS.length) {
      history.push({
        type: "system",
        content: QUESTIONS[nextQuestionIndex].replace("{nickname}", nickname),
        id: `q-${nextQuestionIndex}`,
        guide: GUIDES[nextQuestionIndex],
      });
    }
  });

  return history;
}
