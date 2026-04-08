import { useParams } from "react-router-dom";
import { Tracking } from "@/widgets/tracking";

export function TrackingPage() {
  const { id = "" } = useParams<{ id: string }>();

  return <Tracking id={id} />;
}
