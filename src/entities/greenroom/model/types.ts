export interface GreenroomDetail {
  id: string;
  imageUrl: string;
  title: string;
  keywords: string[];
  description: string;
}

export interface GreenroomResponse {
  code: string;
  message: string;
  data: GreenroomDetail;
}
