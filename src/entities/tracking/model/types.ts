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
