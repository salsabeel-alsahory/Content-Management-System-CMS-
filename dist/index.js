"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataSource_1 = __importDefault(require("./db/dataSource"));
const morgan_1 = __importDefault(require("morgan"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const contentRoutes_js_1 = __importDefault(require("./routes/contentRoutes.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/', authRoutes_js_1.default);
app.use('/user', contentRoutes_js_1.default);
// Define your POST route for signup
app.post('/signup', (req, res) => {
    res.status(200).json({ message: 'Signup successful' });
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
