import http from "@/services/http-common.ts";
import { PaymentRequest } from "@/types/payment/PaymentRequest";
import { PaymentResponse } from "@/types/payment/PaymentResponse";

class PaymentService {
    getAll(params?: any) {
        return http.get<PaymentResponse[]>("/payment", { params });
    }

    getById(id: number) {
        return http.get<PaymentResponse>(`/payment/${id}`);
    }

    create(data: PaymentRequest) {
        return http.post("/payment", data);
    }

    update(data: PaymentRequest, id: number) {
        return http.put(`/payment/${id}`, data);
    }

    delete(id: number) {
        return http.delete(`/payment/${id}`);
    }

    verify(id: number) {
        return http.post(`/payment/${id}/verify`);
    }
}

export default new PaymentService();
