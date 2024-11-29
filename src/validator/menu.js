import menuRepository from "../repository/menuRepository.js";
import CustomError from "../error/Error.js";
import {BlankCheck, LengthCheck} from "./common.js";

export const validMenuId = async (key, value)=> {
    BlankCheck(key, value)
    const findRecipe = await  menuRepository.findById(value);
    if(!findRecipe) {
        throw new CustomError(`${key}에 해당하는 메뉴가 없습니다.`, 400);
    }
}

export const validMenuTitle = (key, value) => {
    try {
        BlankCheck(key, value);
        LengthCheck(key, value, 2, 20);
    } catch (e) {
        throw new CustomError(`${key}는 2이상 20이하여야 합니다.`, 400);
    }
};

export const validMenuPrice = (key, value) => {
    try{
        BlankCheck(key, value)
        LengthCheck(key, value, 1,10);
    } catch (e){
        throw new CustomError(`${key}는 1이상 10이하여야 합니다.`, 400);
    }
}