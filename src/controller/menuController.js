import express from "express";
import menuRepository from "../repository/menuRepository.js";
import {
    validMenuId,
    validMenuTitle,
    validMenuPrice,
} from "../validator/menu.js";
import {transaction} from "../db/connection.js";
import apiResponse from "../dto/apiResponse.js";
import menuConverter from "../dto/menuConverter.js";

const menuController = express.Router();

menuController.post("/regist", async (req, res, next) => {
    try {
        const { title, thumbnail, price } =
            req.body;
        const userId = req.session.user.userId;
        validMenuTitle("title", title);
        validMenuPrice("price", price);

        const menuId = await transaction(async (connection) => {
            return await menuRepository.saveMenu(
                userId,
                title,
                thumbnail,
                price,
                connection
            );
        });

        const menuDto = menuConverter.toMenuDetail(menu);

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
        const {menuId, title, thumbnail, price,} =
            req.body;

        await validMenuId("menuId", menuId);
        validMenuTitle("title", title);
        validMenuPrice("price", price);

        const isUpdated = await transaction(async (connection) => {
            return await menuRepository.updateMenu(
                menuId,
                title,
                thumbnail,
                price,
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
menuController.delete("/delete", async (req, res, next) => {
    try {
        const { menuId } = req.body;
        const isDeleted = await transaction(async (connection) => {
            return await menuRepository.deleteMenu(menuId, connection);
        });

        if (!isDeleted) {
            return res.status(400).json(
                apiResponse.failure({
                    message: "메뉴 삭제에 실패했습니다.",
                })
            );
        }

        res.status(200).json(
            apiResponse.success({
                message: "메뉴 삭제에 성공했습니다.",
            })
        );
    } catch (e) {
        next(e);
    }
});

export default menuController;