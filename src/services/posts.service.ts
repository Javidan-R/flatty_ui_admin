// src/services/posts.service.ts
import { PostResponse } from "@/types/posts/PostResponse";

let mockPosts: PostResponse[] = [
  {
    id: 1,
    agentImage: "https://randomuser.me/api/portraits/men/1.jpg",
    agentName: "John",
    agentSurname: "Doe",
    company: "Tech Corp",
    complex: "Complex A",
    postDate: "2023-10-01",
  },
  {
    id: 2,
    agentImage: "https://randomuser.me/api/portraits/women/2.jpg",
    agentName: "Jane",
    agentSurname: "Smith",
    company: "IT Solutions",
    complex: "Complex B",
    postDate: "2023-10-02",
  },
  // Add more mock posts as needed
];
export default {
  getPosts: (
    searchId?: number,
    page: number = 1, // Default to 1 if not provided
    pageSize: number = 10, // Default to 10 if not provided
    filters?: any
  ): Promise<{ posts: PostResponse[]; total: number }> => {
    return new Promise((resolve) => {
      let filteredPosts = mockPosts;

      // Apply filters here
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value !== "" && key in filteredPosts[0]) {
            filteredPosts = filteredPosts.filter(
              (post) => post[key as keyof PostResponse] === value
            );
          }
        }
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
    updatedData: Partial<PostResponse>
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
