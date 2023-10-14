"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Set up database connection
(0, typeorm_1.createConnection)().then(() => {
    console.log('Connected to the database');
}).catch((error) => {
    console.error('Database connection error:', error);
});
// Use validation middleware
app.use();
// Use routes
app.use();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
