const express = require('express');
const router = express.Router();
const { Article } = require('../../models');

router.get('/',
    async function(req, res, next) {
    try{
        const condition = { order: [['createdAt', 'DESC']] };
        const articles = await Article.findAll(condition);

        res.json({
            status: true,
            message: 'Success',
            data: {articles}
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            errors: [error.message]
        })
    }


});

router.get('/:articleId', async function(req, res, next) {

    try{
        const article = await Article.findByPk(
            req.params.articleId
        );

        if (article) {
            // res.send(article);
            res.json({
                status: true,
                message: 'Success',
                data: { article }
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'Not Found',
                errors: ['Article not found']
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            errors: [error.message]
        })
    }

});

module.exports = router;