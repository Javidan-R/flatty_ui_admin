export interface PaymentRequest {
    userId: number;
    amount: number;
    currency: string;
    method: string; // Example: 'credit_card', 'paypal', 'bank_transfer'
    description?: string;
}
