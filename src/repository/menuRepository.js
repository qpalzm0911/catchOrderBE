import conn from "../db/connection.js";

export default {
    saveMenu: async (menuName, menuPrice, connection) => {
        const imgUrl = "";
        const menuSql = `
        INSERT INTO Menu
            (menuName, menuPrice, imgUrl)
        values (?, ?, ?)
     
    `;

        await conn.query(
            menuSql,
            [menuName, menuPrice, imgUrl],
            connection,
        );

    },

    updateMenu: async (menuId, menuName, menuPrice, connection) => {
        const uptdateMenuSql = `
        UPDATE Menu
        SET menuName = ?, menuPrice = ?
        WHERE menuId = ?;
    `;

        const res = await conn.query(
            uptdateMenuSql,
            [menuName, menuPrice, menuId],
            connection,
        );
        return res;
    },

    findById: async (menuId, connection) => {

        const findMenuIdsql = `
      SELECT menuId
      FROM Menu
      WHERE menuId = ?;
    `;

        const res = await conn.query(
            findMenuIdsql,
            [menuId],
            connection,
        );
        return res[0]
    },

    updateMenuStatus: async (menuId, status, connection) => {
        const updateStatusSql = `
      UPDATE Menu
      SET status = ?
      WHERE menuId = ?;
    `;

        const res = await conn.query(
            updateStatusSql,
            [status, menuId],
            connection,
        );
        return res.affectedRows
    },

};
