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
exports.orderStore = void 0;
const database_1 = __importDefault(require("../database"));
class orderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "select * from Orders";
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        });
    }
    index2() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "select * from orders where quantity between '3' and '7'";
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "select * from orders where user_id = ($1)";
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows;
        });
    }
    show2() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "select * from orders where status like 'comp%' ";
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        });
    }
    create(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "insert into orders(product_id,quantity,user_id,status) values ($1,$2,$3,$4) returning *";
            const result = yield conn.query(sql, [
                orders.product_id,
                orders.quantity,
                orders.user_id,
                orders.status,
            ]);
            const order = result.rows[0];
            conn.release();
            return order;
        });
    }
    addProduct(quantity, order_ID, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "insert into order_products(quantity,order_id,product_id) values ($1,$2,$3)";
            const result = yield conn.query(sql, [quantity, order_ID, product_id]);
            conn.release();
            return result.rows[0];
        });
    }
}
exports.orderStore = orderStore;
