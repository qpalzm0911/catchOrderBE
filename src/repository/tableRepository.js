import conn from "../db/connection.js";

export default {

    getTable: async(connection) =>{
            const sql = `
            SELECT * FROM Tables`;

            const res = await conn.query(
                sql,
                connection,
            );

            return res;
    },

    updateTableStatus: async (tableId, status, connection) => {
        const updateTablesql = `
      UPDATE Tables
      SET status = ? 
      WHERE tableId = ?;
    `;

        const res = await conn.query(
            updateTablesql,
            [status, tableId],
            connection,
        )

        return res.affectedRows
    }



};
