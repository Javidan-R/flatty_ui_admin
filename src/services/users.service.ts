import { UserResponse } from "@/types/users/serResponse";

// Mock Data for Users
const mockUsers: UserResponse[] = [
    {
        id: 1,
        name: "John",
        surname: "Doe",
        phoneNumber: "1234567890",
        position: "Manager",
        department: "Sales",
        status: "Active",
        activity: "Online",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: 2,
        name: "Jane",
        surname: "Doe",
        phoneNumber: "0987654321",
        position: "Developer",
        department: "IT",
        status: "Active",
        activity: "Offline",
        photo: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        id: 3,
        name: "Michael",
        surname: "Smith",
        phoneNumber: "1122334455",
        position: "Designer",
        department: "Marketing",
        status: "Inactive",
        activity: "Online",
        photo: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        id: 4,
        name: "Sarah",
        surname: "Johnson",
        phoneNumber: "2233445566",
        position: "HR Manager",
        department: "HR",
        status: "Active",
        activity: "Online",
        photo: "https://randomuser.me/api/portraits/women/4.jpg",
    },
];

// Service to get all users
const getUsers = (): Promise<UserResponse[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUsers);
        }, 1000); // Simulate network delay
    });
};

// Service to delete a user by ID
const deleteUser = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userIndex = mockUsers.findIndex((user) => user.id === id);
            if (userIndex === -1) {
                reject(new Error("User not found"));
            } else {
                mockUsers.splice(userIndex, 1);
                resolve();
            }
        }, 1000); // Simulate network delay
    });
};

// Service to edit/update a user's details
const updateUser = (
    id: number,
    updatedData: Partial<UserResponse>
): Promise<UserResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userIndex = mockUsers.findIndex((user) => user.id === id);
            if (userIndex === -1) {
                reject(new Error("User not found"));
            } else {
                const updatedUser = { ...mockUsers[userIndex], ...updatedData };
                mockUsers[userIndex] = updatedUser;
                resolve(updatedUser);
            }
        }, 1000); // Simulate network delay
    });
};

// Export functions
export default {
    getUsers,
    deleteUser,
    updateUser,
};
