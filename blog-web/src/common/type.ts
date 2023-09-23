export interface Post {
  id: number;
  title: string;
  description: string;
  cover_image_url: string;
  content: string;
  created_at: string;
  modified_at: string;
  published: boolean;
  tags: number[];
}

export interface Tag {
  id: number
  name: string
}