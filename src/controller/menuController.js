import express from "express";
import {validMenuTitle} from "../validator/menu.js";






menuController.post("/regist", async (req, res, next) => {
    try {
        const { title, thumbnail, description, price } =
            req.body;
        const userId = req.session.user.userId;
        validMenuTitle("title", title);
        validMenuDescription("description", description);

        validMenuInstructions("instructions", instructions);

        validMenuPrice("price", price);

        // 트랜젝션 시작
        const menuId = await transaction(async (connection) => {
            // 레시피 저장
            const menuId = await menuRepository.save(
                userId,
                title,
                thumbnail,
                price,
                connection
            );
            return recipeId;
        });
        // 트랜젝션 종료

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