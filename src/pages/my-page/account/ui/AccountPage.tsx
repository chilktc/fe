import { useState } from "react";
import { useSessionStore } from "@/entities/session/model/store";
import { PagePanel } from "@/shared/ui";
import { AccountDeletion, ProfileEdit } from "@/widgets/my-page";

export function AccountPage() {
  const user = useSessionStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <PagePanel panelClassName="gap-10">
      {isDeleting ? (
        <AccountDeletion user={user} onBack={() => setIsDeleting(false)} />
      ) : (
        <ProfileEdit user={user} onDeleteClick={() => setIsDeleting(true)} />
      )}
    </PagePanel>
  );
}
