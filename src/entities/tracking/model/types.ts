export interface TrackingDetail {
  id: string;
  date: string;
  title: string;
  type: string[];
  description: string;
  imageUrl: string;
}

export interface TrackingResponse {
  code: string;
  message: string;
  data: TrackingDetail;
}

export interface SubmitTrackingRequest {
  id: string;
  step1: "solved" | "not-solved";
  step2: string;
  step3: string;
}

export interface SubmitTrackingResponse {
  code: string;
  message: string;
  data: {
    id: string;
  };
}
