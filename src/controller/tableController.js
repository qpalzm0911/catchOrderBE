import express from "express";
import tableRepository from "../repository/tableRepository.js";
import apiResponse from "../dto/apiResponse.js";
import orderConverter from "../dto/orderConverter.js";
import {validOrderId, validOrderStatus} from "../validator/order.js";
import connection, {transaction} from "../db/connection.js";
import tableConverter from "../dto/tableConverter.js";
import {validTableId, validTableStatus} from "../validator/table.js";




const tableController = express.Router();

tableController.get("/getTable", async(req,res,next)=>{
    const tableList = await transaction(async(connection) =>{
        return await tableConverter.toTableList(await tableRepository.getTable(connection));
    });
    console.log(tableList);
    if(tableList){
        res.status(200).json(
            apiResponse.success({message:"테이블 조회에 성공했습니다.", result: tableList})
        )
    }
});


tableController.put("/status", async (req, res, next) =>{
    try {
        const {tableId, status} = req.body;

        await validTableId("tableId", tableId);
        await validTableStatus("status", status);

        con

    }catch (e) {
        next(e);
    }
})

export default tableController;