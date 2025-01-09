// services/product.service.ts
import http from "@services/http-common.ts";
import { ProductRequest } from "@/types/product/ProductRequest";
import { ProductResponse } from "@/types/product/ProductResponse";

class ProductService {
    getAll(params?: any) {
        // Parametrlərə görə məhsul siyahısını al
        return http.get<ProductResponse[]>("/product", { params });
    }

    getById(id: number) {
        return http.get<ProductResponse>(`/product/${id}`);
    }

    addNew(data: ProductRequest) {
        return http.post("/product", data);
    }

    update(data: ProductRequest, id: number) {
        return http.put(`/product/${id}`, data);
    }

    delete(id: number) {
        return http.delete(`/product/${id}`);
    }
}

export default new ProductService();
