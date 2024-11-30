import orderRepository from "../repository/orderRepository.js";
import CustomError from "../error/Error.js";
import {BlankCheck, LengthCheck, NumberType, InRange} from "./common.js";

export const validOrderId = async (key, value) => {
    BlankCheck(key, value)
    const findOrder = await orderRepository.findById(value);
    if(!findOrder) {
        throw new CustomError(`${key}에 해당하는 메뉴가 없습니다.`, 400);
    }
}


export const validOrderStatus = (key, value) => {
    try {
        NumberType(key, value);
        InRange(key, value, 0, 2);
    }catch (e) {
        throw new CustomError(`${key}는 0또는 1또는 2이어야 합니다.`)
    }
}