"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataSource_1 = __importDefault(require("./db/dataSource"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Set up database connection
// createConnection()
//   .then(() => {
//     console.log('Connected to the database');
//   })
//   .catch((error) => {
//     console.error('Database connection error:', error);
//   });
// Example middleware
app.use((req, res, next) => {
    // Custom middleware logic here
    next(); // Don't forget to call next to pass control to the next middleware/route
});
// Example route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Use more routes and middleware as needed for your application
const PORT = process.env.PORT || 5000;
dataSource_1.default.initialize().then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});
app.listen(PORT, () => {
    (0, morgan_1.default)(`App is listening on port ${PORT}`);
    console.log(`App is listening on port ${PORT}`);
});
