import { Category } from "./Category";
import { Review } from "./Review";
import { Stock } from "./Stock";
import { Tag } from "./Tag";

// types/product/ProductResponse.ts
export interface ProductResponse {
    id: number;
    name: string;
    description?: string;
    price: number;
    discount?: number;
    finalPrice: number; // Qiymət - endirim
    category: Category; // Məhsulun kateqoriyası
    tags?: Tag[]; // Etiketlərin tam məlumatı
    stock: Stock; // Anbar məlumatı
    images?: string[];
    reviews?: Review[]; // İstifadəçi rəyləri
    createdAt: string;
    updatedAt: string;
}
