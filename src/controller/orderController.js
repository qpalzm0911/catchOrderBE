import express from "express";
import orderRepository from "../repository/orderRepository.js";
import apiResponse from "../dto/apiResponse.js";
import orderConverter from "../dto/orderConverter.js";
import {validOrderId, validOrderStatus} from "../validator/order.js";
import connection, {transaction} from "../db/connection.js";




const orderController = express.Router();

// 전체 주문 조회
orderController.get("/orders", async (req, res, next) => {
    try {
        const orders = await orderRepository.getAllOrders(connection);

        if (!orders || orders.length === 0) {
            return res.status(404).json(
                apiResponse.failure({
                    message: "주문 목록이 비어있습니다.",
                }),
            );
        }

        const convertedOrders = await orderConverter.toOrderList(orders);

        res.status(200).json(
            apiResponse.success({
                orders: convertedOrders,
            }),
        );
    } catch (e) {
        next(e);
    }
});

// 특정 주문 조회
orderController.get("/orders/:orderId", async (req, res, next) => {
    try {
        const { orderId } = req.body;

        const order = await orderRepository.getOrderById(orderId, connection);

        if (!order) {
            return res.status(404).json(
                apiResponse.failure({
                    message: "해당 주문을 찾을 수 없습니다.",
                }),
            );
        }

        const convertedOrder = await orderConverter.toOrderDetail(order);


        res.status(200).json(
            apiResponse.success({
                order: convertedOrder,
            }),
        );
    } catch (e) {
        next(e);
    }
});



orderController.put("/status", async (req, res, next) => {
    try{
        const {orderId, status} = req.body;

        await validOrderId("orderId", orderId);
        await validOrderStatus("status", status);

        const isStatusUpdated = await transaction(async (connection) => {
            return await orderRepository.updateOrderStatus(
                orderId,
                status,
                connection
            );
        });
        if (!isStatusUpdated) {
            return res.status(400).json(
                apiResponse.failure({
                    message: "상태 수정에 실패하였습니다."
                })
            );
        }

        res.status(200).json(
            apiResponse.success({
                message: "상태 수정에 성공하였습니다.",
                result: {status},
            })
        );
    } catch (e) {
        next(e);
    }
})

export default orderController;