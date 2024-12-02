import tableRepository from "../repository/tableRepository.js";
import CustomError from "../error/Error.js";
import {BlankCheck, LengthCheck,NumberType, InRange} from "./common.js";
import orderRepository from "../repository/orderRepository.js";

export const validTableId = async (key, value) => {
    BlankCheck(key, value)
    const findOrder = await orderRepository.findById(value);
    if(!findOrder) {
        throw new CustomError(`${key}에 해당하는 테이블가 없습니다.`, 400);
    }
}

export const validTableStatus = (key, value) => {
    try {
        NumberType(key, value);
        InRange(key, value, 0, 3);
    }catch (e) {
        throw new CustomError(`${key}는 0또는 1또는 2 또는 3이어야 합니다.`)
    }
}
