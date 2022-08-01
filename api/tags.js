const express = require('express');
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next(); 
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    try {
        
    } catch ({ name, message }) {
    }
});

tagsRouter.get('/', (req, res) => {
    const tags = await getAllTags();
    res.send({
        tags: []
    });
});

module.exports = tagsRouter;