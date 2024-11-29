import conn from "../db/connection.js";

export default {
    saveMenu: async (userId, title, thumbnail, price, connection) => {
        const menuSql = `
        INSERT INTO menus
            (userId, title, thumbnail, price)
        values (?, ?, ?, ?)
    `;

        const [result] = await connection.query(menuSql, [
            userId,
            title,
            thumbnail,
            price,
        ]);

        return result.insertId;
    },

    updateMenu: async (menuId, title, thumbnail, price, connection) => {
        const menuSql = `
        UPDATE menus
        SET title = ?, thumbnail = ?, price = ?, updatedAt = CURRENT_TIMESTAMP()
        WHERE menuId = ?;
    `;

        const [result] = await connection.query(menuSql, [
            title,
            thumbnail,
            price,
            menuId,
        ]);

        return result.affectedRows > 0;
    },
    deleteMenu: async (menuId) => {
        const menuSql = `
            DELETE FROM menus WHERE menuId = ?;
    `;

        const [result] = await conn.query(menuSql, [menuId]);

        return result.affectedRows > 0;
    },
};
