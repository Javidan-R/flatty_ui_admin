import http from "@services/http-common.ts";
import { CategoryResponse } from "@/types/category/CategoryResponse.ts";
import { CategoryRequest } from "@/types/category/CategoryRequest.ts";

class CategoryService {
    getAll() {
        return http.get<Array<CategoryResponse>>("/category/getAll");
    }

    getById(id: number) {
        return http.get<CategoryResponse>(`/category/get/${id}`);
    }

    addNew(data: CategoryRequest) {
        return http.post("/category/addNew", data);
    }

    delete(id: number) {
        return http.delete(`/category/delete/${id}`);
    }

    update(data: CategoryRequest, id: number) {
        return http.put(`/category/update/${id}`, data);
    }
}

export default new CategoryService();
