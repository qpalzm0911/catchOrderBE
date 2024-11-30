import orderRepository from "../repository/orderRepository.js";

export default {
    async toMenuDetail(menu) {



        return {
            menuId: menu.menuId,
            menuName: menu.menuName,
            thumbnail: menu.thumbnail,
            menuPrice: menu.menuPrice,
            status: menu.status,
            createdAt: menu.createdAt,
        };
    },
};