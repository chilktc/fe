export interface GreenroomDetail {
  keywords: string[];
  description: string;
  createdAt: string;
}

export interface GreenroomResponse {
  code: string;
  message: string;
  data: GreenroomDetail;
}

export interface PodcastChoiceDetail {
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

export interface PodcastDetail {
  imageUrl: string;
  sessionId: string;
  text: string;
  createdAt: string;
}

export interface PodcastResponse {
  code: string;
  message: string;
  data: PodcastDetail;
}
