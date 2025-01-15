// src/services/posts.service.ts
import { PostResponse, PostUpdateRequest } from "@/types/posts/PostResponse";

let mockPosts: PostResponse[] = [
  {
    id: 1,
    agentImage: "https://randomuser.me/api/portraits/men/1.jpg",
    agentName: "John",
    agentSurname: "Doe",
    company: "Tech Corp",
    complex: "Complex A",
    postDate: "2023-10-01",
    documents: [],
    images: [],
    location: "City Center",
    description: "Luxury apartment with modern amenities",
    mapLocation: "40.7128, -74.0060",
    category: "apartment",
    residentialComplex: "Complex A",
    area: 100, // in square meters
    renovation: "Designer",
    floor: 5,
    ceilingHeight: "From 2.7m",
    bathroomType: "Separate",
    furniture: "With furniture",
    rooms: 3,
    bathroomCount: 2,
    livingRoomCount: 1,
    bedroomCount: 2,
    balconyCount: 1,
    parkingSlot: true,
    swimmingPool: false,
  },
  {
    id: 2,
    agentImage: "https://randomuser.me/api/portraits/women/2.jpg",
    agentName: "Jane",
    agentSurname: "Smith",
    company: "IT Solutions",
    complex: "Complex B",
    postDate: "2023-10-02",
    documents: [],
    images: [],
    location: "Suburban Area",
    description: "Spacious house with garden",
    mapLocation: "34.0522, -118.2437",
    category: "house",
    residentialComplex: "Complex B",
    area: 250, // in square meters
    renovation: "European style",
    floor: 1,
    ceilingHeight: "From 3m",
    bathroomType: "Several",
    furniture: "Without furniture",
    rooms: 5,
    bathroomCount: 3,
    livingRoomCount: 2,
    bedroomCount: 3,
    balconyCount: 2,
    parkingSlot: false,
    swimmingPool: true,
  },
  // Add more mock posts as needed
];

export default {
  getPosts: (
    searchId?: number,
    page: number = 1,
    pageSize: number = 10,
    filters?: any
  ): Promise<{ posts: PostResponse[]; total: number }> => {
    return new Promise((resolve) => {
      let filteredPosts = mockPosts;

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== "" && value !== null && value !== undefined) {
            switch (key) {
              case "areaFrom":
              case "areaTo":
                // Ensure value is treated as a number
                const numericValue = Number(value);
                filteredPosts = filteredPosts.filter((post) => {
                  const area = post.area ?? 0;
                  return key === "areaFrom"
                    ? area >= numericValue
                    : area <= numericValue;
                });
                break;
              case "floorFrom":
              case "floorTo":
                // Ensure value is treated as a number
                const floorValue = Number(value);
                filteredPosts = filteredPosts.filter((post) => {
                  const floor = post.floor ?? 0;
                  return key === "floorFrom"
                    ? floor >= floorValue
                    : floor <= floorValue;
                });
                break;
              case "notFirstFloor":
                if (value) {
                  filteredPosts = filteredPosts.filter(
                    (post) => post.floor !== 1
                  );
                }
                break;
              case "notLastFloor":
                if (value) {
                  // Assuming 10 is the highest floor, adjust if different
                  filteredPosts = filteredPosts.filter(
                    (post) => post.floor !== 10
                  );
                }
                break;
              case "lastFloor":
                if (value) {
                  // Assuming 10 is the highest floor, adjust if different
                  filteredPosts = filteredPosts.filter(
                    (post) => post.floor === 10
                  );
                }
                break;
              default:
                if (Array.isArray(value)) {
                  filteredPosts = filteredPosts.filter((post) =>
                    value.includes(post[key as keyof PostResponse])
                  );
                } else {
                  filteredPosts = filteredPosts.filter(
                    (post) => post[key as keyof PostResponse] === value
                  );
                }
            }
          }
        });
      }

      if (searchId !== undefined) {
        filteredPosts = filteredPosts.filter((post) => post.id === searchId);
      }

      const total = filteredPosts.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      resolve({ posts: filteredPosts.slice(start, end), total });
    });
  },

  deletePost: (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const postIndex = mockPosts.findIndex((post) => post.id === id);
        if (postIndex === -1) {
          reject(new Error("Post not found"));
        } else {
          mockPosts = mockPosts.filter((post) => post.id !== id);
          resolve();
        }
      }, 500);
    });
  },

  updatePost: (
    id: number,
    updatedData: PostUpdateRequest
  ): Promise<PostResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const postIndex = mockPosts.findIndex((post) => post.id === id);
        if (postIndex === -1) {
          reject(new Error("Post not found"));
        } else {
          mockPosts[postIndex] = { ...mockPosts[postIndex], ...updatedData };
          resolve(mockPosts[postIndex]);
        }
      }, 500);
    });
  },
};
