// src/types/posts/PostResponse.ts
export interface PostResponse {
  id: number;
  agentImage: string;
  agentName: string;
  agentSurname: string;
  company: string;
  complex: string;
  postDate: string;
  documents: File[];
  images: File[];
  location: string;
  description: string;
  mapLocation: string;
  category: "apartment" | "house" | string; // Assuming these are the only categories, can extend if needed
  residentialComplex?: string; // Optional since not all posts might belong to a complex
  area: number; // In square meters
  renovation:
    | "Cosmetic"
    | "Designer"
    | "European style"
    | "Needs renovation"
    | string;
  floor: number;
  ceilingHeight: "From 2.5m" | "From 2.7m" | "From 3m" | string;
  bathroomType: "Combined" | "Separate" | "Several" | string;
  furniture:
    | "Without furniture"
    | "With furniture"
    | "Kitchen furniture"
    | string;
  rooms: number;
  bathroomCount: number;
  livingRoomCount: number;
  bedroomCount: number;
  balconyCount: number;
  parkingSlot: boolean;
  swimmingPool: boolean;
}

export type PostUpdateRequest = Partial<PostResponse>;
