import express from "express";
import menuRepository from "../repository/menuRepository.js";
import { InRange, NumberType, Positive } from "../validator/common.js";
import {
    validMenuDescription,
    validMenuId,
    validMenuInstructions,
    validMenuTitle,
    validMenuPrice,
} from "../validator/menu.js";

menuController.post("/regist", async (req, res, next) => {
    try {
        const { title, thumbnail, description, price } =
            req.body;
        const userId = req.session.user.userId;
        validMenuTitle("title", title);
        validMenuDescription("description", description);
        validMenuInstructions("instructions", instructions);
        validMenuPrice("price", price);

        const menuId = await transaction(async (connection) => {
            const menuId = await menuRepository.save(
                userId,
                title,
                thumbnail,
                price,
                connection
            );
            return recipeId;
        });

        res.status(200).json(
            apiResponse.success({
                message: "레시피가 성공적으로 등록되었습니다.",
                result: { recipeId },
            })
        );
    } catch (e) {
        next(e);
    }
});

menuController.put("/update", async (req, res, next) => {
    try {
        const {menuId, title, thumbnail, description, price,} =
            req.body;

        await validMenuId("menuId", menuId);
        validMenuTitle("title", title);
        validMenuDescription("description", description);
        validMenuPrice("price", price);

        await transaction(async (connection) => {
            await menuRepository.update(
                menuId,
                title,
                thumbnail,
                description,
                price,
                connection
            );
        });

        res.status(200).json(
            apiResponse.success({
                message: "레시피 수정에 성공했습니다.",
                result: { recipeId },
            })
        );
    } catch (e) {
        next(e);
    }
});
menuController.delete("/delete", async (req, res, next) => {
    const { menuId } = req.body;
    try {
        const del = await menuRepository.deleteMenu(menuId);
        if (del.affectedRows) {
            res.status(200).json(
                apiResponse.success({
                    message: "메뉴 삭제에 성공했습니다.",
                }),
            );
        } else {
            res.status(400).json(
                apiResponse.failure({
                    message: "메뉴 삭제에 실패했습니다.",
                }),
            );
        }
    } catch (e) {
        next(e);
    }
});

export default menuController;