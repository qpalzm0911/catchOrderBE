import conn from "../db/connection.js";

export default {
    saveMenu: async (title, price, connection) => {

        const menuSql = `
        INSERT INTO menus
            (title, price)
        values (?, ?)
    `;

        await conn.query(
            menuSql,
            [title, price],
            connection,
        );

    },

    updateMenu: async (menuId, title, thumbnail, price, connection) => {
        const uptdateMenuSql = `
        UPDATE menus
        SET title = ?, thumbnail = ?, price = ?, updatedAt = CURRENT_TIMESTAMP()
        WHERE menuId = ?;
    `;

        await conn.query(
            uptdateMenuSql,
            [title, price],
            connection,
        );
    },

    updateMenuStatus: async (menuId, status, connection) => {
        const updateStatusSql = `
      UPDATE menu
      SET status = ?, updatedAt = CURRENT_TIMESTAMP()
      WHERE menuId = ?;
    `;

        await conn.query(
            updateStatusSql,
            [menuId, status],
            connection,
        );

    },



    deleteMenu: async (menuId) => {
        const deleteMenuSql = `
            DELETE FROM menus WHERE menuId = ?;
    `;

        await conn.query(
            deleteMenuSql,
            [menuId],
        );
    },
};
