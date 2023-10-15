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
exports.default = router;
