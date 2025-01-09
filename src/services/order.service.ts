import {
    CreateOrderRequest,
    UpdateOrderRequest,
} from "@/types/order/orderTypes";
import axios from "axios";

export const getOrders = () => {
    return axios.get("/api/order");
};

export const getOrderById = (orderId: string) => {
    return axios.get(`/api/order/${orderId}`);
};

export const createOrder = (orderData: CreateOrderRequest) => {
    return axios.post("/api/order", orderData);
};

export const updateOrder = (orderId: string, orderData: UpdateOrderRequest) => {
    return axios.put(`/api/order/${orderId}`, orderData);
};
