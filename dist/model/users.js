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
exports.userstore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const pepper = process.env.BCRYPT_PASSWORD;
class userstore {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "insert into users(firstname,lastname,password) values($1,$2,$3) returning *";
            const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt("10"));
            const result = yield conn.query(sql, [user.firstname, user.lastname, hash]);
            conn.release();
            return result.rows[0];
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "select * from users";
            const result = yield conn.query(sql);
            return result.rows;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "select * from users where id=($1)";
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
    authenticate(firstname, lastname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "SELECT password FROM users where firstname = ($1)";
            const result = yield conn.query(sql, [firstname]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        });
    }
}
exports.userstore = userstore;
