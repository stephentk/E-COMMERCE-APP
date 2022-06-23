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
const products_1 = require("../model/products");
const users_1 = require("./users");
const store = new products_1.productStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield store.index();
    res.json(products);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    const newproduct = yield store.create(product);
    res.json(newproduct);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield store.show(req.params.id);
    res.json(product);
});
const product_routes = (app) => {
    app.get("/products", index);
    app.get("/product/:id", show);
    app.post("/product", users_1.verifyToken, create);
};
exports.default = product_routes;
