// src/services/users.service.ts
import { AgentsResponse } from "@/types/agents/AgentsResponse";

let mockUsers: AgentsResponse[] = [
  {
    id: 1,
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John",
    surname: "Doe",
    status: "Active",
    phoneNumber: "1234567890",
    activePosts: 12,
    company: "Tech Corp",
  },
  {
    id: 2,
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Jane",
    surname: "Smith",
    status: "Inactive",
    phoneNumber: "0987654321",
    activePosts: 5,
    company: "IT Solutions",
  },
  {
    id: 3,
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Michael",
    surname: "Johnson",
    status: "Active",
    phoneNumber: "1122334455",
    activePosts: 8,
    company: "Consulting Inc",
  },
  {
    id: 4,
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Emily",
    surname: "Brown",
    status: "Active",
    phoneNumber: "2233445566",
    activePosts: 3,
    company: "Media Group",
  },
  {
    id: 5,
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "David",
    surname: "Lee",
    status: "Inactive",
    phoneNumber: "3344556677",
    activePosts: 0,
    company: "Freelance",
  },
  {
    id: 6,
    photo: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Sarah",
    surname: "Wilson",
    status: "Active",
    phoneNumber: "4455667788",
    activePosts: 15,
    company: "Design Studio",
  },
  {
    id: 7,
    photo: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Robert",
    surname: "Taylor",
    status: "Active",
    phoneNumber: "5566778899",
    activePosts: 22,
    company: "Corporate Enterprises",
  },
  {
    id: 8,
    photo: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Lisa",
    surname: "Anderson",
    status: "Inactive",
    phoneNumber: "6677889900",
    activePosts: 1,
    company: "Health Corp",
  },
];

export default {
  getUsers: (
    searchText = "",
    company = "",
    page = 1,
    pageSize = 10
  ): Promise<{ users: AgentsResponse[]; total: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredUsers = mockUsers.filter(
          (user) =>
            (!searchText ||
              `${user.name} ${user.surname}`
                .toLowerCase()
                .includes(searchText.toLowerCase())) &&
            (!company || user.company === company)
        );
        const total = filteredUsers.length;
        const paginatedUsers = filteredUsers.slice(
          (page - 1) * pageSize,
          page * pageSize
        );
        resolve({ users: paginatedUsers, total });
      }, 500); // Simulate API delay
    });
  },
  getCompanies: (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const companies = Array.from(
          new Set(mockUsers.map((user) => user.company))
        );
        resolve(companies);
      }, 200); // Simulate API delay
    });
  },
  deleteUser: (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex((user) => user.id === id);
        if (userIndex === -1) {
          reject(new Error("User not found"));
        } else {
          mockUsers = mockUsers.filter((user) => user.id !== id);
          resolve();
        }
      }, 500);
    });
  },
  updateUser: (
    id: number,
    updatedData: Partial<AgentsResponse>
  ): Promise<AgentsResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex((user) => user.id === id);
        if (userIndex === -1) {
          reject(new Error("User not found"));
        } else {
          mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
          resolve(mockUsers[userIndex]);
        }
      }, 500);
    });
  },
};
