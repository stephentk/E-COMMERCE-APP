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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../model/users");
const store = new users_1.userstore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.index();
    res.json(users);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.show(req.params.id);
    res.json(users);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    const newUser = yield store.create(user);
    const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    const authenticatedUser = yield store.authenticate(req.body.firstname, req.body.lastname, req.body.password);
    const token = jsonwebtoken_1.default.sign({ user: authenticatedUser }, process.env.TOKEN_SECRET);
    res.json(token);
});
const verifyToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
        const verify = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
exports.verifyToken = verifyToken;
const user_routes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/user", create);
    app.post("/login", exports.verifyToken, authenticate);
};
exports.default = user_routes;
