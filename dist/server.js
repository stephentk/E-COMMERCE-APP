"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./handler/users"));
const product_1 = __importDefault(require("./handler/product"));
const orders_1 = __importDefault(require("./handler/orders"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, users_1.default)(app);
(0, product_1.default)(app);
(0, orders_1.default)(app);
app.listen(2000, () => {
    console.log("app started");
});
exports.default = app;
