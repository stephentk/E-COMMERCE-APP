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
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "select * from products";
            const result = yield database_1.default.query(sql);
            conn.release();
            return result.rows;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "select * from products where id = ($1)";
            const result = yield database_1.default.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "insert into products(name,price,category) values ($1,$2,$3) returning *";
            const result = yield database_1.default.query(sql, [
                product.name,
                product.price,
                product.category,
            ]);
            conn.release();
            product = result.rows[0];
            return product;
        });
    }
}
exports.productStore = productStore;
