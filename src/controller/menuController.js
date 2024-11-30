import express from "express";
import menuRepository from "../repository/menuRepository.js";
import {
    validMenuId,
    validMenuName,
    validMenuPrice, validMenuStatus,
} from "../validator/menu.js";
import {transaction} from "../db/connection.js";
import apiResponse from "../dto/apiResponse.js";
import menuConverter from "../dto/menuConverter.js";

const menuController = express.Router();

menuController.post("/regist", async (req, res, next) => {
    try {
        const { menuName, menuPrice } =
            req.body;
        console.log(menuName, menuPrice)
        validMenuName("menuName", menuName);
        validMenuPrice("menuPrice", menuPrice);

        const menuId = await transaction(async (connection) => {
            return await menuRepository.saveMenu(
                menuName,
                menuPrice,
                connection
            );
        });

        const menuDto = menuConverter.toMenuDetail(menuId);

        res.status(200).json(
            apiResponse.success({
                message: "메뉴가 성공적으로 등록되었습니다.",
                data: menuDto,
            })
        );
    } catch (e) {
        next(e);
    }
});

menuController.put("/update", async (req, res, next) => {
    try {
        const {menuId, menuName, menuPrice,} =
            req.body;

        await validMenuId("menuId", menuId);

        const isUpdated = await transaction(async (connection) => {
            return await menuRepository.updateMenu(
                menuId,
                menuName,
                menuPrice,
                connection
            );
        });
        if (!isUpdated) {
            return res.status(400).json(
                apiResponse.failure({
                    message: "메뉴 수정에 실패했습니다.",
                })
            );
        }

        res.status(200).json(
            apiResponse.success({
                message: "메뉴 수정에 성공했습니다.",
                result: { menuId },
            })
        );
    } catch (e) {
        next(e);
    }
});
menuController.put("/delete", async (req, res, next) => {
    try {
        const {menuId, status } = req.body;

        await validMenuId("menuId", menuId);
        await validMenuStatus("status", status);

        const isStatusUpdated = await transaction(async (connection) => {
            return await menuRepository.updateMenuStatus(
                menuId,
                status,
                connection
            );
        });
        if (!isStatusUpdated) {
            return res.status(400).json(
                apiResponse.failure({
                    message: "스테이터스 수정에 실패했습니다.",
                })
            );
        }

        res.status(200).json(
            apiResponse.success({
                message: "스테이터스 수정에 성공했습니다.",
                result: { status },
            })
        );
    } catch (e) {
        next(e);
    }
});

export default menuController;