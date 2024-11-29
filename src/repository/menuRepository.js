import conn from "../db/connection.js";

export default {
    saveMenu: async (userId, title, thumbnail, description, price, connection) => {
        const menuSql = `
        INSERT INTO recipes
            (userId, title, thumbnail, description, price)
        values (?, ?, ?, ?, ?)
    `;

        const [result] = await conn.query(menuSql, [
            userId,
            title,
            thumbnail,
            description,
            price,
        ]);

        return result.insertId;
    },

    updateMenu: async (menuId, title, thumbnail, description, price, connection) => {
        const menuSql = `
        UPDATE menu
        SET title = ?, thumbnail = ?, description = ?, price = ?, updatedAt = CURRENT_TIMESTAMP()
        WHERE menuId = ?;
    `;

        const [result] = await conn.query(menuSql, [
            title,
            thumbnail,
            description,
            price,
            menuId,
        ]);

        return result.affectedRows > 0;
    },
    deleteMenu: async (menuId) => {
        const menuSql = `
            DELETE FROM menu WHERE menuId = ?;
    `;

        const [result] = await conn.query(menuSql, [menuId]);

        return result.affectedRows > 0;
    },
};
