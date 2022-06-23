import { User,userstore } from "../model/users";
import { Orders,orderStore } from "../model/order";
import { Products,productStore } from "../model/products";
import supertest from "supertest";
import app from  "../server"

const store = new userstore()
const store2 = new orderStore()
const store3 = new productStore()
const request = supertest(app)


describe('user model',() => {
    it('should have an index method'),() => {
        expect(store.index).toBeDefined()
    }
})

describe('order model',() => {
    it('should have an index method'),() => {
        expect(store2.index).toBeDefined()
    }
})

describe('product model',() => {
    it('should have an index method'),() => {
        expect(store3.index).toBeDefined()
    }
})/*
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