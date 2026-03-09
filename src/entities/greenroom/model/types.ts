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

export interface PodcastChoiceDetail {
  id: string;
  imageUrl: string;
  type: string[];
  title: string;
  description: string;
}

export interface PodcastChoiceResponse {
  code: string;
  message: string;
  data: PodcastChoiceDetail[];
}
