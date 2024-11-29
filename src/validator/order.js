import orderRepository from "../repository/orderRepository.js";
import CustomError from "../error/Error.js";
import {BlankCheck, LengthCheck} from "./common.js";

export const validOrderId = async (key, value) => {
    BlankCheck(key, value)
    const findOrder = await orderRepository.findById(value);
    if(!findOrder) {
        throw new CustomError(`${key}에 해당하는 메뉴가 없습니다.`, 400);
    }
}

export const validOrderCount = async (key, value) => {
    BlankCheck(key, value)
}