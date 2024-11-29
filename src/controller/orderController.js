import express from "express";
import orderRepository from "../repository/orderRepository.js";
import apiResponse from "../dto/apiResponse.js";
import orderConverter from "../dto/orderConverter.js";




const orderController = express.Router();

//주문 생성
orderController.get("/orders", async (res, req, next) =>{
    try{
        const { menuId, userId, status, count } = req.body;

        const orderId = await orderRepository.createOrder(
            menuId,
            userId,
            status,
            count,
            req.connection, // DB connection 전달
        );

        res.status(201).json(
            apiResponse.success({
                message: '주문 생성에 성공했습니다.',
                orderId,
            }),
        );
    }catch (e) {
        next(e);
    }
});

//주문 조회 (전체)
// orderController.get("/orders/:orderId", async (res, req, next) =>{
//     try{
//         const orders = await orderRepository.getAllOrders(req.connection);
//
//         const orderDtos = orders.map(orderConverter.entityToDto);
//
//         res.status(200).json(
//             apiResponse.success({
//                 data: orderDtos,
//             }),
//         );
//     }catch (e) {
//         next(e);
//     }
// });

// 주문 조회 (특정 주문)
orderController.get('/orders/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const order = await orderRepository.getOrderById(orderId, req.connection);

        if (!order) {
            return res.status(404).json(
                apiResponse.failure({
                    message: '해당 주문을 찾을 수 없습니다.',
                }),
            );
        }

        const orderDto = orderConverter.toOrderDetail(order);

        res.status(200).json(
            apiResponse.success({
                data: orderDto,
            }),
        );
    } catch (e) {
        next(e);
    }
});


//주문 수정
orderController.put("/orders/:orderId", async (res, req, next) =>{
    try{
        const { orderId } = req.params;
        const { menuId, userId, status, count } = req.body;

        const isUpdated = await orderRepository.updateOrder(
            orderId,
            menuId,
            userId,
            status,
            count,
            req.connection,
        );

        if (!isUpdated) {
            return res.status(400).json(
                apiResponse.failure({
                    message: '주문 수정에 실패했습니다.',
                }),
            );
        }

        res.status(200).json(
            apiResponse.success({
                message: '주문 수정에 성공했습니다.',
            }),
        );
    }catch (e) {
        next(e);
    }
});

orderController.delete("/orders/delete", async (res, req, next) =>{
    try{
        const { orderId } = req.body;
        const isDeleted = await orderRepository.deleteOrder(orderId, req.connection);

        if (!isDeleted) {
            return res.status(400).json(
                apiResponse.failure({
                    message: '주문 삭제에 실패했습니다.',
                }),
            );
        }

        res.status(200).json(
            apiResponse.success({
                message: '주문 삭제에 성공했습니다.',
            }),
        );
    }catch (e) {
        next(e);
    }
});