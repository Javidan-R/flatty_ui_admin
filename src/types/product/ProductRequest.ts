export interface ProductRequest {
    name: string;
    description?: string;
    price: number;
    discount?: number;
    categoryId: number;
    tags?: string[]; // Etiketlər (opsional)
    stockQuantity: number;
    images?: string[]; // Şəkillərin URL siyahısı
}
