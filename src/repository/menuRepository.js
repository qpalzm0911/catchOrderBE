import conn from "../db/connection.js";

export default {
    save: async (title, thumbnail, description, connection) => {
        const menuSql = `
        INSERT INTO recipes
            (menuId, title, thumbnail, description)
        values (?, ?, ?, ?)
    `;

        await conn.query(
            menuSql,
            [menuId, title, thumbnail, description],
            connection,
        );

        return menuId;
    },

    update: async (menuId, title, thumbnail, description, connection) => {
        const updatemenuSql = `
        UPDATE menu
        SET title = ?, thumbnail = ?, description = ?, updatedAt = CURRENT_TIMESTAMP()
        WHERE menuId = ?;
    `;

        await conn.query(
            updatemenuSql,
            [title, thumbnail, description, recipeId],
            connection,
        );
    },
    deleteMenu: async (menuId) => {
        const delMenuSql = await conn.query(
            `DELETE FROM Bookmark WHERE menuId = ?`,
            [menuId],
        );
        return delMenuSql;
    },
};
