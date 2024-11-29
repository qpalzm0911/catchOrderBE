import menuRepository from '../repository/menuRepository.js';


export default {
    async toOrderDetail(order) {

        //const findUser = await userRepository.findById(order.userId);
        // 주문한 메뉴 정보 조회
        const findMenu = await menuRepository.findById(order.menuId);

        // 결과 반환
        return {
            orderId: order.orderId,
            status: order.status,
            count: order.count,
            createdAt: order.createdAt,
            menu: findMenu ? {
                menuId: findMenu.menuId,
                menuName: findMenu.menuName,
                menuPrice: findMenu.menuPrice,
            } : null,
        };
    },
};