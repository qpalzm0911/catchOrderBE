import conn from "../db/connection.js";

export default {

    async getAllOrders(connection) {
        const allOrderSql = `
      SELECT *
      FROM Orders;
    `;

        const res = await conn.query(
            allOrderSql,
            connection,
        )
        return res[0]
    },

    async getOrderById(tableId, connection) {
        const specificOrderSql = `
      SELECT *
      FROM Orders o
      LEFT JOIN User u on u.userId = o.userId
      WHERE 
      u.tableId = ?
      AND
      o.status = 0
      AND
      u.status = 1;
    `;

        const res = await conn.query(
            specificOrderSql,
            [tableId],
            connection
        )

        return res[0]
    },

    updateOrderStatus: async (orderId, status, connection) => {
        const updateOrderSql = `
      UPDATE Orders
      SET status = ?
      WHERE orderId = ?;
    `;

        const res = await conn.query(
            updateOrderSql,
            [status, orderId],
            connection,
        );
        return res.affectedRows
    },

    getOrder: async(connection) => {
        const sql = `
        SELECT
        orderId,
        menuId,
        UserId,
        status
        FROM Orders
        `;

        const res = await conn.query(sql,[], connection);

        return res;
    },
    getOrderByTableId: async(tableId, connection) => {
        const sql =`
        SELECT
        m.menuName as menuName,
        m.menuPrice as menuPrice,
        o.count as count
        FROM
        Orders o
        left join Menu m on m.menuId = o.menuId
        where o.userId = (SELECT max(userId) FROM User WHERE t)`
    }


};
