"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const multer_1 = __importDefault(require("multer"));
require("./config.js");
const dataSource_js_1 = __importDefault(require("./db/dataSource.js"));
// import indexRouter from './routes/index.js';
// import usersRouter from './routes/users.js';
// const suzanfile = fileURLToPath(import.meta.url);
// const suzanname = path.dirname(suzanfile);
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000"
}));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
// app.use("/uploads", express.static(path.join(suzanname, "uploads")));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(500).send("Failed Upload File!");
        return;
    }
    const fileURL = req.file.destination + req.file.filename;
    res.send({
        message: 'File Uploaded Successfully!',
        file: fileURL
    });
});
app.get('/file', (req, res) => {
    const fileName = req.query.name?.toString() || '';
    try {
        const data = fs_1.default.readFileSync('uploads/' + fileName, 'utf-8');
        const JSONData = JSON.parse(data);
        res.send(JSONData);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500).send(err);
});
dataSource_js_1.default.initialize().then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});
app.listen(PORT, () => {
    (0, morgan_1.default)(`App is listening on port ${PORT}`);
    console.log(`App is listening on port ${PORT}`);
    // initDB();
});
exports.default = app;
