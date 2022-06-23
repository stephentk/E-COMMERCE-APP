"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../model/users");
const order_1 = require("../model/order");
const products_1 = require("../model/products");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const store = new users_1.userstore();
const store2 = new order_1.orderStore();
const store3 = new products_1.productStore();
const request = (0, supertest_1.default)(server_1.default);
describe('user model', () => {
    it('should have an index method'), () => {
        expect(store.index).toBeDefined();
    };
});
describe('order model', () => {
    it('should have an index method'), () => {
        expect(store2.index).toBeDefined();
    };
});
describe('product model', () => {
    it('should have an index method'), () => {
        expect(store3.index).toBeDefined();
    };
}); /*
describe('Test endpoint responses', () => {
    it('gets the orders endpoint', async (done) => {
      const response = await request.get('/orders');
      expect(response.status).toBe(200);
      done();
    });
   })
   describe('Test endpoint responses', () => {
    it('gets the products endpoint', async (done) => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
      done();
    });
   })

   describe('Test endpoint responses', () => {
    it('gets the users endpoint', async (done) => {
      const response = await request.get('/users');
      expect(response.status).toBe(200);
      done();
    });
   })
   

*/
