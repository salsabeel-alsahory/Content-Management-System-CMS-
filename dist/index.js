"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dataSource_1 = __importDefault(require("./db/dataSource"));
const category_1 = __importDefault(require("./routes/category"));
const contentRoutes_js_1 = __importDefault(require("./routes/contentRoutes.js"));
const media_js_1 = __importDefault(require("./routes/media.js"));
const permission_js_1 = __importDefault(require("./routes/permission.js"));
const role_js_1 = __importDefault(require("./routes/role.js"));
const tag_1 = __importDefault(require("./routes/tag"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/content', contentRoutes_js_1.default);
app.use('/user', user_js_1.default);
app.use('/permission', permission_js_1.default);
app.use('/role', role_js_1.default);
app.use('/media', media_js_1.default);
app.use('/category', category_1.default);
app.use('/tag', tag_1.default);
const s3 = new aws_sdk_1.default.S3({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    signatureVersion: 'v4'
});
const PORT = process.env.PORT || 5000;
dataSource_1.default.initialize().then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
