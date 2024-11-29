import conn from "../db/connection.js";

export default {
    createOrder: async (menuId, userId, status, count, connection) => {
        const orderSql = `
        INSERT INTO order
            (menuId, userId, status, count)
        values (?, ?, ?, ?)
    `;


        const [result] = await connection.query(orderSql, [
            menuId,
            userId,
            status,
            count,
        ]);

        // 생성된 orderId 반환
        return result.insertId;

    },

    // async getAllOrders(connection) {
    //     const query = `
    //   SELECT * FROM orders;
    // `;
    //     const [orders] = await connection.query(query);
    //     return orders;
    // },

    async getOrderById(orderId, connection) {
        const query = `
      SELECT * FROM orders WHERE orderId = ?;
    `;
        const [rows] = await connection.query(query, [orderId]);
        return rows[0]; // 단일 주문 반환
    },

    updateOrder: async (orderId, menuId, userId, status, count, connection) => {
        const orderSql = `
        UPDATE order
        SET menuId = ?, userId = ?, status = ?, count = ?, updatedAt = CURRENT_TIMESTAMP()
        WHERE orderId = ?;
    `;

        const [result] = await connection.query(orderSql, [menuId, userId, status, count, orderId]);

        // 업데이트 성공 여부 반환
        return result.affectedRows > 0;
    },
    deleteOrder: async (orderId) => {
        const orderSql =
            `DELETE FROM order 
            WHERE orderId = ?;
    `;

        const [result] = await conn.query(orderSql, [orderId]);

        // 삭제 성공 여부 반환
        return result.affectedRows > 0;
    },
};
