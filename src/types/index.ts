export interface CardDTO {
  id: string;
  title: string;
  date: string;
  time_start: string;
  time_end: string;
  address: string;
  summary: string;
  description: string;
  imageUrls: [];
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  time_start: string;
  time_end: string;
  address: string;
  summary: string;
  description: string;
  status: string;
  imageUrls: [];
}
