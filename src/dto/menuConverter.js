export default {
    toMenuDetail(menu) {
        return {
            menuId: menu.menuId,
            title: menu.title,
            thumbnail: menu.thumbnail,
            description: menu.description,
            price: menu.price,
            createdAt: menu.createdAt,
            updatedAt: menu.updatedAt || null,
        };
    },
};