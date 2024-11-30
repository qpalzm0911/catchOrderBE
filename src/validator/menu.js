import menuRepository from "../repository/menuRepository.js";
import CustomError from "../error/Error.js";
import {BlankCheck, LengthCheck, NumberType, Positive,InRange} from "./common.js";

export const validMenuId = async (key, menuId)=> {
    BlankCheck(key, menuId)
    const findMenu = await  menuRepository.findById(menuId);
    console.log(findMenu)
    if(!findMenu) {
        throw new CustomError(`${key}에 해당하는 메뉴가 없습니다.`, 400);
    }
}

export const validMenuName = (key, value) => {
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

export const validMenuStatus = (key, value) => {
    try {
        NumberType(key, value);
        InRange(key, value, 0,1);
    }catch (e) {
        throw new CustomError(`${key}는 0또는 1이어야 합니다`)
    }
}
