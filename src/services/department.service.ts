import { DepartmentRequest } from "@/types/department/DepartmentRequest.ts";
import { DepartmentResponse } from "@/types/department/DepartmentResponse.ts";
import http from "@services/http-common.ts";

class DepartmentService {
    getAll() {
        return http.get<Array<DepartmentResponse>>("/department/getAll");
    }

    getById(id: number) {
        return http.get<DepartmentResponse>(`/department/get/${id}`);
    }

    addNew(data: DepartmentRequest) {
        return http.post("/department/addNew", data);
    }

    delete(id: number) {
        return http.delete(`/department/delete/${id}`);
    }

    update(data: DepartmentRequest, id: number) {
        return http.put(`/department/update/${id}`, data);
    }
}

export default new DepartmentService();
