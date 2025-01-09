export interface Order {
    id: string;
    customerName: string;
    total: number;
    status: "pending" | "completed" | "shipped";
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderRequest {
    customerName: string;
    total: number;
    status: "pending" | "completed" | "shipped";
}

export interface UpdateOrderRequest {
    customerName?: string;
    total?: number;
    status?: "pending" | "completed" | "shipped";
}
