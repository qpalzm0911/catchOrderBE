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

    async toMenuList(menu) {
        for(const item of menu){
            item.status = item.status ? "매진" : "판매중",
            item.checked = false
        }
        return menu;
    }
};