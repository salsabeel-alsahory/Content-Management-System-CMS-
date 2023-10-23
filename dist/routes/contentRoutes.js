"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_js_1 = require("../controllers/user.js");
const Content_js_1 = require("../db/entities/Content.js");
const Role_js_1 = require("../db/entities/Role.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
// import { authorize } from '../middleware/authorize.js';
const validator_js_1 = require("../middleware/validator.js");
const permission_js_1 = require("../controllers/permission.js");
const category_js_1 = require("../controllers/category.js");
const content_js_1 = require("../controllers/content.js");
const Permission_js_1 = require("../db/entities/Permission.js");
const router = express_1.default.Router();
router.post("/signup", (0, validator_js_1.signupValidationRules)(), validator_js_1.validate, async (req, res) => {
    try {
        const { email, password, userName, displayName, role } = req.body;
        if (!email || !password || !userName || !displayName || !role) {
            return res.status(400).json({ error: "All fields required." });
        }
        const user = await (0, user_js_1.createUser)(req.body);
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.post("/login", (0, validator_js_1.loginValidationRules)(), validator_js_1.validate, (req, res) => {
    if (req.body.email && req.body.password) {
        (0, user_js_1.login)(req.body.email, req.body.password).then((data) => {
            res.status(200).send(data);
        }).catch((error) => {
            res.status(400).send(error);
        });
    }
    else {
        res.status(404).send("email and password are required");
    }
});
//router.get('/', authenticate, authorize('view_users'),(req, res, next) => {
router.get('/', authMiddleware_js_1.authenticate, (req, res, next) => {
    (0, user_js_1.getAllUsers)().then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(404).send(error);
    });
});
/* POST permission. --------------------------------------------------------------------------------------------------*/
//router.post('/permission',authorize('create_permission'), (req, res, next) => {
router.post('/permission', (req, res, next) => {
    try {
        (0, permission_js_1.createPermission)(req.body);
        res.status(201).send("permission created successfully");
    }
    catch (error) {
        res.status(500).send("something went wrong");
    }
});
//router.get('/permission', authenticate, authorize('view_permissions'),function (req, res, next) {
router.get('/permission', authMiddleware_js_1.authenticate, function (req, res, next) {
    (0, permission_js_1.getAllPermission)().then(data => {
        res.status(200).send(data);
    }).catch(error => {
        console.log(error);
        res.status(500).send("something went wrong");
    });
});
// Define a route to update an existing permission
//router.put('/permissions/:permissionId', authenticate,authorize('update_permission'), async (req, res) => {
router.put('/permissions/:permissionId', authMiddleware_js_1.authenticate, async (req, res) => {
    try {
        const permissionId = req.params.permissionId; // Get the permission ID from the URL
        // Find the permission by its ID in the database
        const permission = await Permission_js_1.Permission.findOne({ where: { id: permissionId } });
        if (!permission) {
            return res.status(404).json({ error: 'Permission not found' });
        }
        // Update permission properties with the request body
        if (req.body.name) {
            permission.name = req.body.name;
        }
        // Save the updated permission to the database
        await permission.save();
        res.status(200).json({ message: 'Permission updated successfully' });
    }
    catch (error) {
        console.error('Error updating permission:', error);
        res.status(500).json({ error: 'Failed to update permission' });
    }
});
//router.post('/role', authenticate, authorize('create_role'),(req, res, next) => {
// router.post('/role', authenticate, (req, res, next) => {
//   createRole(req.body).then(data => {
//     res.status(201).send(data)
//   }).catch(error => {
//     res.status(500).send("something went wrong")
//   })
// });
router.post('/role', authMiddleware_js_1.authenticate, (req, res, next) => {
    (0, permission_js_1.createRole)(req.body).then((data) => {
        res.status(201).send(data);
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
//router.get('/roles', authenticate,  authorize('view_roles'),function (req, res, next) {
router.get('/roles', authMiddleware_js_1.authenticate, function (req, res, next) {
    (0, user_js_1.getAllRoles)().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
// Update an existing role
//router.put('/roles/:roleId', authenticate,authorize('update_role'), async (req, res) => {
router.put('/roles/:roleId', authMiddleware_js_1.authenticate, async (req, res) => {
    try {
        const roleId = req.params.roleId; // This will take the ID from the URL
        // Find the role by its ID in the database
        const role = await Role_js_1.Role.findOne({ where: { id: roleId } }); // Use FindOneOptions to specify the where clause
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        // Update role properties with the request body
        if (req.body.name) {
            role.name = req.body.name;
        }
        // Save the updated role to the database
        await role.save();
        res.status(200).json({ message: 'Role updated successfully' });
    }
    catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Failed to update role' });
    }
});
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
router.post('/article/create', authMiddleware_js_1.authenticate, async (req, res) => {
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
// router.post('/audio', authenticate, async (req, res) => {
//   try {
//     const audioData = req.body; // Assuming the audio data is in the request body
//     const audio = await createAudio(audioData);
//     res.status(201).json(audio);
//   } catch (error) {
//     console.error('Error creating audio:', error);
//     res.status(500).json({ error: 'Failed to create audio' });
//   }
// });
// router.get('/audio', authenticate, async (req, res) => {
//   try {
//     const audios = await getAllAudio(); // Define a function like getAllAudio to fetch all audio entries
//     res.status(200).json(audios);
//   } catch (error) {
//     console.error('Error fetching audio:', error);
//     res.status(500).json({ error: 'Failed to retrieve audio' });
//   }
// });
//router.get('/articles', authenticate,authorize('view_articles'), async (req, res) => {
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
//router.get('/media', authenticate, authorize('get_media'),async(req, res) => {
router.get('/media', authMiddleware_js_1.authenticate, async (req, res) => {
    (0, content_js_1.getAllMedia)()
        .then((data) => {
        res.status(200).send(data);
    })
        .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
//router.post('/media', authenticate, authorize('add_media'),async(req, res) => {
router.post('/media', authMiddleware_js_1.authenticate, async (req, res) => {
    (0, permission_js_1.createMedia)(req.body)
        .then((data) => {
        res.status(201).send(data);
    })
        .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
//router.put('/media/:id', authenticate,authorize('update_media'),async (req, res) => {
router.put('/media/:id', authMiddleware_js_1.authenticate, async (req, res) => {
    (0, content_js_1.updateMedia)(req.params.id, req.body)
        .then((data) => {
        res.status(200).send(data);
    })
        .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
//router.delete('/media/:id', authenticate,authorize('delete_media'),async (req, res) => {
router.delete('/media/:id', authMiddleware_js_1.authenticate, async (req, res) => {
    (0, content_js_1.deleteMedia)(req.params.id)
        .then(() => {
        res.status(200).send('Media deleted successfully');
    })
        .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
// Category routes
//router.get('/categories', authenticate,authorize('get_category'),async (req, res) => {
router.get('/categories', authMiddleware_js_1.authenticate, async (req, res) => {
    (0, category_js_1.getAllCategories)()
        .then((data) => {
        res.status(200).send(data);
    })
        .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
//router.post('/categories', authenticate,authorize('add_category'),async  (req, res) => {
router.post('/categories', authMiddleware_js_1.authenticate, async (req, res) => {
    (0, category_js_1.createCategory)(req.body)
        .then((data) => {
        res.status(201).send(data);
    })
        .catch((error) => {
        console.error(error);
        res.status(500).send('Something went wrong');
    });
});
//router.put('/categories/:id', authenticate,authorize('update_category'),async  (req, res) => {
router.put('/categories/:id', authMiddleware_js_1.authenticate, async (req, res) => {
    (0, category_js_1.updateCategory)(req.params.id, req.body)
        .then((data) => {
        res.status(200).send(data);
    })
        .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
//router.delete('/categories/:id', authenticate,authorize('delete_category'),async  (req, res) => {
router.delete('/categories/:id', authMiddleware_js_1.authenticate, async (req, res) => {
    (0, category_js_1.deleteCategory)(req.params.id)
        .then(() => {
        res.status(200).send('Category deleted successfully');
    })
        .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
exports.default = router;
