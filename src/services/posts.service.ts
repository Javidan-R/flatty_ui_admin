// src/services/posts.service.ts
import { Complex, PostResponse } from "@/types/posts/PostResponse";

// Optimized mock data structure
let mockPosts: PostResponse[] = [
  {
    id: 1,
    agentImage: "https://randomuser.me/api/portraits/men/1.jpg",
    agentName: "John",
    agentSurname: "Doe",
    company: "Tech Corp",
    complex: {
      category: "apartment",
      residentialComplex: "Complex A",
      description: "Luxury apartment complex",
      buildingArea: 200,
      livingArea: 150,
      objects: 10,
      year: 2020,
      buildingFloors: 10,
      floor: 2,
      parkingSlot: true,
      installment: false,
      swimmingPool: false,
      elevator: true,
      latitude: 32.3,
      longitude: 33.2,
      address: "City Center, Street 1",
      livingRoom: 3,
      bedroom: 1,
      bathroom: 1,
      balcony: 1,
    },
    postDate: "2023-10-01",
    documents: [],
    images: [],
    location: "City Center",
    description: "Luxury apartment with modern amenities #8247E5",
    mapLocation: "40.7128, -74.0060",
    category: "apartment",
    residentialComplex: "Complex A",
    area: 100,
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
    complex: {
      category: "house",
      residentialComplex: "Complex B",
      description: "Spacious house complex",
      buildingArea: 300,
      livingArea: 250,
      objects: 5,
      year: 2018,
      buildingFloors: 2,
      parkingSlot: false,
      installment: true,
      swimmingPool: true,
      elevator: false,
      latitude: 32.4,
      longitude: 33.3,
      floor: 2,
      address: "Suburban Area, Road 2",
      livingRoom: 3,
      bedroom: 1,
      bathroom: 1,
      balcony: 1,
    },
    postDate: "2023-10-02",
    documents: [],
    images: [],
    location: "Suburban Area",
    description: "Spacious house with garden",
    mapLocation: "34.0522, -118.2437",
    category: "house",
    residentialComplex: "Complex B",
    area: 250,
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
  getPosts: async (
    searchId?: number,
    page: number = 1,
    pageSize: number = 10,
    filters?: Record<string, any>
  ): Promise<{ posts: PostResponse[]; total: number }> => {
    let filteredPosts = mockPosts;

    if (filters) {
      filteredPosts = applyFilters(filteredPosts, filters);
    }

    if (searchId !== undefined) {
      filteredPosts = filteredPosts.filter((post) => post.id === searchId);
    }

    const total = filteredPosts.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return { posts: filteredPosts.slice(start, end), total };
  },

  deletePost: async (id: number): Promise<void> => {
    const index = mockPosts.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new Error("Post not found");
    }
    mockPosts.splice(index, 1);
  },

  updatePost: async (
    id: number,
    updatedData: Partial<Complex>
  ): Promise<PostResponse> => {
    const index = mockPosts.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new Error("Post not found");
    }
    // Merge updated data into the existing post's complex object
    mockPosts[index] = {
      ...mockPosts[index],
      complex: { ...mockPosts[index].complex, ...updatedData },
    };
    return mockPosts[index];
  },

  // Mock function to add a new post
  createPost: async (newPost: PostResponse): Promise<PostResponse> => {
    // Assuming the max ID is the last ID in mockPosts for simplicity
    const maxId = mockPosts.reduce((max, post) => Math.max(max, post.id), 0);
    const postWithId = { ...newPost, id: maxId + 1 };
    mockPosts.push(postWithId);
    return postWithId;
  },
};

// Helper function to apply filters to posts
function applyFilters(
  posts: PostResponse[],
  filters: Record<string, any>
): PostResponse[] {
  return posts.filter((post) =>
    Object.entries(filters).every(([key, value]) => {
      if (value === "" || value == null) return true;

      switch (key) {
        case "areaFrom":
          return post.area >= Number(value);
        case "areaTo":
          return post.area <= Number(value);
        case "floorFrom":
          return post.floor >= Number(value);
        case "floorTo":
          return post.floor <= Number(value);
        case "notFirstFloor":
          return !value || post.floor !== 1;
        case "notLastFloor":
          return !value || post.floor !== 10; // Assuming 10 is the max floor, adjust as needed
        case "lastFloor":
          return !value || post.floor === 10; // Same assumption
        // Here you might need to add filters for properties within the 'complex' object if needed
        default:
          if (Array.isArray(value)) {
            return value.includes((post as any)[key]);
          }
          return (post as any)[key] === value;
      }
    })
  );
}
