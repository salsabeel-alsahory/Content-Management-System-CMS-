"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Content_js_1 = require("../db/entities/Content.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const content_js_1 = require("../controllers/content.js");
const router = express_1.default.Router();
//router.get('/', authenticate, authorize('view_users'),(req, res, next) => {
//router.get('/content', authenticate, authorize('view_content'),(req, res) => {
router.get('/content', authMiddleware_js_1.authenticate, (req, res) => {
    (0, content_js_1.getAllContent)()
        .then((data) => {
        res.status(200).send(data);
    })
        .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
//router.post('/content', authenticate,authorize('create_content'), (req, res) => {
router.post('/content', authMiddleware_js_1.authenticate, (req, res) => {
    (0, content_js_1.createContent)(req.body)
        .then((data) => {
        res.status(201).send(data);
    })
        .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
//router.put('/content/:contentId', authenticate,authorize('update_content'), async (req, res) => {
router.put('/content/:contentId', authMiddleware_js_1.authenticate, async (req, res) => {
    try {
        const contentId = +req.params.contentId; // Convert the contentId to a number
        // Check if contentId is a valid number
        if (isNaN(contentId)) {
            return res.status(400).json({ error: 'Invalid contentId' });
        }
        // Find the content by its ID in the database
        const content = await Content_js_1.Content.findOne({ where: { id: contentId } });
        if (!content) {
            return res.status(404).json({ error: 'Content not found' });
        }
        // Update content properties with the request body
        const { title, content: newContent } = req.body;
        content.title = title || content.title;
        content.content = newContent || content.content;
        // Save the updated content to the database
        await content.save();
        res.status(200).json({ message: 'Content updated successfully' });
    }
    catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({ error: 'Failed to update content' });
    }
});
// Define a route to search for content
//router.get('/content/search', authenticate,authorize('search_content'), async (req, res) => {
router.get('/content/search', authMiddleware_js_1.authenticate, async (req, res) => {
    try {
        // Get search criteria from the query parameters
        const { title, contentType } = req.query;
        // Create a filter object based on the provided criteria
        const filter = {};
        if (title) {
            filter.title = title;
        }
        if (contentType) {
            filter.contentType = contentType;
        }
        // Search for content in the database based on the filter criteria
        const content = await Content_js_1.Content.find({ where: filter });
        res.status(200).json(content);
    }
    catch (error) {
        console.error('Error searching for content:', error);
        res.status(500).json({ error: 'Failed to search for content' });
    }
});
//-----------------------------------------------------------------
//router.post('/article/create', authenticate,authorize('create_article'),async (req, res) => {
router.post('/create', authMiddleware_js_1.authenticate, async (req, res) => {
    try {
        const articleData = req.body; // Assuming the article data is in the request body
        const article = await (0, content_js_1.createArticle)(articleData);
        res.status(201).json(article);
    }
    catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ error: 'Failed to create article' });
    }
});
router.post('/videos', async (req, res) => {
    try {
        const videoData = req.body; // Assuming the video data is in the request body
        const video = await (0, content_js_1.createVideo)(videoData);
        res.status(201).json(video);
    }
    catch (error) {
        console.error('Error creating video:', error);
        res.status(500).json({ error: 'Failed to create video' });
    }
});
router.get('/videos', async (req, res) => {
    try {
        const videos = await (0, content_js_1.getAllVideos)(); // Define a function like getAllVideos to fetch all video entries
        res.status(200).json(videos);
    }
    catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Failed to retrieve videos' });
    }
});
router.get('/articles', authMiddleware_js_1.authenticate, async (req, res) => {
    try {
        const articles = await (0, content_js_1.getAllArticles)(); // Define a function like getAllArticles to fetch all article entries
        res.status(200).json(articles);
    }
    catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Failed to retrieve articles' });
    }
});
router.put('/articles/:articleId', authMiddleware_js_1.authenticate, async (req, res) => {
    try {
        const articleId = +req.params.articleId; // Convert the articleId to a number
        // Check if articleId is a valid number
        if (isNaN(articleId)) {
            return res.status(400).json({ error: 'Invalid articleId' });
        }
        // Find the article by its ID in the database
        const article = await Content_js_1.Article.findOne({ where: { id: articleId } });
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        // Update article properties with the request body
        const { title, articleContent: newContent } = req.body;
        article.title = title || article.title;
        article.articleContent = newContent || article.articleContent;
        // Save the updated article to the database
        await article.save();
        res.status(200).json({ message: 'Article updated successfully' });
    }
    catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ error: 'Failed to update article' });
    }
});
// router.post('/content/like/:contentId', authenticate, async (req, res) => {
//   try {
//     const contentId = +req.params.contentId; // Convert the contentId to a number
//     // Check if contentId is a valid number
//     if (isNaN(contentId)) {
//       return res.status(400).json({ error: 'Invalid contentId' });
//     }
//     // Find the content by its ID in the database
//     const content = await Content.findOne({ where: { id: contentId } });
//     if (!content) {
//       return res.status(404).json({ error: 'Content not found' });
//     }
//     // Increment likes for the existing content
//     const updatedContent = await incrementLikes(content);
//     console.log('Updated Content:', updatedContent);
//     res.status(200).json({ message: 'Content liked successfully' });
//   } catch (error) {
//     console.error('Error liking content:', error);
//     res.status(500).json({ error: 'Failed to like content' });
//   }
// });
exports.default = router;
