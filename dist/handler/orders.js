"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../model/order");
const users_1 = require("./users");
const store = new order_1.orderStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield store.index();
    res.json(orders);
});
const index2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield store.index2();
    res.json(orders);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        user_id: req.body.user_id,
        status: req.body.status,
    };
    const newOrder = yield store.create(order);
    res.json(newOrder);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.show(req.params.id);
    res.json(order);
});
const show2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.show2();
    res.json(order);
});
const order_routes = (app) => {
    app.get("/orders", users_1.verifyToken, index);
    app.get("/ordersmuch", index2);
    app.get("/order/:id", users_1.verifyToken, show);
    app.get("/orderstatus", show2);
    app.post("/order", create);
};
exports.default = order_routes;
