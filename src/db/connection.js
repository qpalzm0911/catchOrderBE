import mysql2 from "mysql2/promise";

import dotenv from "dotenv";
import table from "./table.js";

dotenv.config();

// 이 부분은 각자 설정에 맞게 조정
export const conn = mysql2.createPool({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    maxIdle: 10,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
});

export default {
    async query(queryString = "", params = [], connection) {
        const [rows] = await (connection ?? conn).execute(queryString, params);
        return rows;
    },
};

export const initDB = async () => {
    for (let [name, sql] of Object.entries(table)) {
        try {
            await conn.execute(sql);
            console.log(`table ${name} 이 생성되었습니다.`);
        } catch (e) {
            console.error(e);
            console.log(`table ${name}생성 도중 오류가 발생했습니다.`);
        }
    }
};

/**
 * @return {Promise<mysql2.PoolConnection>}
 */
const getConnection = async () => {
    return conn.getConnection();
};


export const transaction = async (logic) => {
    let connection = await getConnection();
    try {
        await connection.beginTransaction();

        const result = await logic(connection);

        await connection.commit();
        return result;
    } catch (err) {
        if (connection) {
            await connection.rollback();
        }

        console.error(err);
        throw new Error("transaction error");
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
