"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
// import dataSource, { initDB } from './db/dataSource';
// import baseLogger from './logger.js';
// import { error404Handler, errorLogger, errorSender } from './middleware/errorHandlers/genericHandler';
const category_1 = __importDefault(require("./routes/category"));
const contentRoutes_js_1 = __importDefault(require("./routes/contentRoutes.js"));
const media_js_1 = __importDefault(require("./routes/media.js"));
const permission_js_1 = __importDefault(require("./routes/permission.js"));
const role_js_1 = __importDefault(require("./routes/role.js"));
const tag_1 = __importDefault(require("./routes/tag"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const dataSource_1 = __importDefault(require("./db/dataSource"));
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
// app.use(errorLogger);
// app.use(errorSender);
// app.use(error404Handler);
const PORT = process.env.PORT || 5000;
app.get("/health", function (req, res) {
    res.sendStatus(200);
});
dataSource_1.default.initialize().then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});
// app.listen(PORT, () => {..
//   console.log(`App is listening on port ${PORT}`);
// });
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
// app.listen(PORT, () => {
//   baseLogger.info(`App is listening on port ${PORT}`);
//   initDB();
// });
