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

    async getOrderById(orderId, connection) {
        const specificOrderSql = `
      SELECT orderId
      FROM Orders
      WHERE orderId = ?;
    `;

        const res = await conn.query(
            specificOrderSql,
            [orderId],
            connection
        )

        return res[0]
    },

    updateOrderStatus: async (orderId, status, connection) => {
        const updateOrderSql = `
      UPDATE Order
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



};
