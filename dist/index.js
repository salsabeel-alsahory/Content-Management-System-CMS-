"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
const dataSource_1 = __importStar(require("./db/dataSource"));
const logger_js_1 = __importDefault(require("./logger.js"));
const genericHandler_1 = require("./middleware/errorHandlers/genericHandler");
const category_1 = __importDefault(require("./routes/category"));
const contentRoutes_js_1 = __importDefault(require("./routes/contentRoutes.js"));
const media_js_1 = __importDefault(require("./routes/media.js"));
const permission_js_1 = __importDefault(require("./routes/permission.js"));
const role_js_1 = __importDefault(require("./routes/role.js"));
const tag_1 = __importDefault(require("./routes/tag"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_fileupload_1.default)({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/content', contentRoutes_js_1.default);
app.use('/user', user_js_1.default);
app.use('/permission', permission_js_1.default);
app.use('/role', role_js_1.default);
app.use('/media', media_js_1.default);
app.use('/category', category_1.default);
app.use('/tag', tag_1.default);
app.use(genericHandler_1.errorLogger);
app.use(genericHandler_1.errorSender);
app.use(genericHandler_1.error404Handler);
const PORT = process.env.PORT || 5000;
app.get("/health", function (req, res) {
    res.sendStatus(200);
});
dataSource_1.default.initialize().then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});
// app.listen(PORT, () => {
//   console.log(`App is listening on port ${PORT}`);
// });
app.listen(PORT, () => {
    logger_js_1.default.info(`App is listening on port ${PORT}`);
    (0, dataSource_1.initDB)();
});
