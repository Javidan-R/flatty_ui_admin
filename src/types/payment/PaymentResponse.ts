export interface PaymentResponse {
    id: number;
    userId: number;
    amount: number;
    currency: string;
    method: string;
    description?: string;
    status: "pending" | "completed" | "failed";
    createdAt: string;
    updatedAt: string;
}
