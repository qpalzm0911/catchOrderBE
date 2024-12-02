import conn from "../db/connection.js";

export default {

    getTable: async() =>{
            const sql = `
            SELECT * FROM Tables`;

            const res = await conn.query(sql);

            return res;
    }



};
