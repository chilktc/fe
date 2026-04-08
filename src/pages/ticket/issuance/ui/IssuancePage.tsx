import { useSessionStore } from "@/entities/session/model/store";
import { TicketIssuance } from "@/widgets/ticket-issuance";
import { Layout } from "@/widgets/layout";

export function IssuancePage() {
  const user = useSessionStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <Layout user={user}>
      <TicketIssuance />
    </Layout>
  );
}
