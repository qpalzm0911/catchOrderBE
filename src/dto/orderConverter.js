import menuRepository from '../repository/menuRepository.js';


export default {
    async toOrderList(orders) {
        return {
            orderId: orders.orderId,
            tableId: orders.tableId,
            status: this.convertOrderStatus(order.status),
            createdAt: orders.createdAt,
        };

    },

    async toOrderDetail(order) {
        return {
            orderId: order.orderId,
            tableId: order.tableId,
            status: this.convertOrderStatus(order.status),
            createdAt: order.createdAt,
        };
    },

    convertOrderStatus(status) {
        switch (status) {
            case 0:
                return "대기중";
            case 1:
                return "준비중";
            case 2:
                return "완료";
            case 3:
                return "취소됨";
            default:
                return "알 수 없음";
        }
    }
};