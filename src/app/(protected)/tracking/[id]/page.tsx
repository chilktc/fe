"use client";

import { use } from "react";
import { Tracking } from "@/widgets/tracking";

interface TrackingPageProps {
  params: Promise<{ id: string }>;
}

export default function TrackingPage({ params }: TrackingPageProps) {
  const { id } = use(params);

  return <Tracking id={id} />;
}
