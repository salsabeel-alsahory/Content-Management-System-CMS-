"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_js_1 = require("../controllers/user.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.post("/signup", async (req, res) => {
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
router.post("/login", (req, res) => {
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
router.get('/', authMiddleware_js_1.authenticate, (req, res, next) => {
    (0, user_js_1.getAllUsers)().then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(404).send(error);
    });
});
/* POST permission. --------------------------------------------------------------------------------------------------*/
router.post('/permission', (req, res, next) => {
    try {
        (0, user_js_1.createPermission)(req.body);
        res.status(201).send("permission created successfully");
    }
    catch (error) {
        res.status(500).send("something went wrong");
    }
});
router.get('/permission', authMiddleware_js_1.authenticate, function (req, res, next) {
    (0, user_js_1.getAllPermission)().then(data => {
        res.status(200).send(data);
    }).catch(error => {
        console.log(error);
        res.status(500).send("something went wrong");
    });
});
router.post('/role', (req, res, next) => {
    (0, user_js_1.createRole)(req.body).then(data => {
        res.status(201).send(data);
    }).catch(error => {
        res.status(500).send("something went wrong");
    });
});
router.get('/roles', authMiddleware_js_1.authenticate, function (req, res, next) {
    (0, user_js_1.getAllRoles)().then(data => {
        res.status(200).send(data);
    }).catch(error => {
        console.log(error);
        res.status(500).send("something went wrong");
    });
});
router.get('/content', authMiddleware_js_1.authenticate, (req, res) => {
    (0, user_js_1.getAllContent)()
        .then((data) => {
        res.status(200).send(data);
    })
        .catch((error) => {
        console.error(error);
        res.status(500).send('Something went wrong');
    });
});
router.post('/content', authMiddleware_js_1.authenticate, (req, res) => {
    (0, user_js_1.createContent)(req.body)
        .then((data) => {
        res.status(201).send(data);
    })
        .catch((error) => {
        console.error(error);
        res.status(500).send('Something went wrong');
    });
});
//-----------------------------------------------------------------
router.post('/article/create', authMiddleware_js_1.authenticate, async (req, res) => {
    try {
        const articleData = req.body; // Assuming the article data is in the request body
        const article = await (0, user_js_1.createArticle)(articleData);
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
        const video = await (0, user_js_1.createVideo)(videoData);
        res.status(201).json(video);
    }
    catch (error) {
        console.error('Error creating video:', error);
        res.status(500).json({ error: 'Failed to create video' });
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
router.get('/videos', async (req, res) => {
    try {
        const videos = await (0, user_js_1.getAllVideos)(); // Define a function like getAllVideos to fetch all video entries
        res.status(200).json(videos);
    }
    catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Failed to retrieve videos' });
    }
});
router.get('/articles', authMiddleware_js_1.authenticate, async (req, res) => {
    try {
        const articles = await (0, user_js_1.getAllArticles)(); // Define a function like getAllArticles to fetch all article entries
        res.status(200).json(articles);
    }
    catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Failed to retrieve articles' });
    }
});
exports.default = router;
