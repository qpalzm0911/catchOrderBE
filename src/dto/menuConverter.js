import orderRepository from "../repository/orderRepository.js";

export default {
    async toMenuDetail(menu) {



        return {
            menuId: menu.menuId,
            title: menu.title,
            thumbnail: menu.thumbnail,
            price: menu.price,
            createdAt: menu.createdAt,
        };
    },
};