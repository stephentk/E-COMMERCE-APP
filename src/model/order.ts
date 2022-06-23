import client from "../database";
import { Products } from "./products";
export type Orders = {
  product_id: string;
  quantity: string;
  user_id: string;
  status: string;
};

export class orderStore {
  async index(): Promise<Orders[]> {
    const conn = await client.connect();
    const sql = "select * from Orders";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }
  async index2(): Promise<Orders[]> {
    const conn = await client.connect();
    const sql = "select * from orders where quantity between '3' and '7'";
    const result = await conn.query(sql);
    conn.release()
    return result.rows
  }
  async show(id: string): Promise<Orders[]> {
    const conn = await client.connect();
    const sql = "select * from orders where user_id = ($1)";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows;
  }
  async show2(): Promise<Orders[]> {
    const conn = await client.connect();
    const sql = "select * from orders where status like 'comp%' ";
    const result = await conn.query(sql );
    conn.release();
    return result.rows;
  }
  async create(orders: Orders) {
    const conn = await client.connect();
    const sql =
      "insert into orders(product_id,quantity,user_id,status) values ($1,$2,$3,$4) returning *";
    const result = await conn.query(sql, [
      orders.product_id,
      orders.quantity,
      orders.user_id,
      orders.status,
    ]);
    const order = result.rows[0];
    conn.release();
    return order;
  }

  async addProduct(
    quantity: number,
    order_ID: string,
    product_id: string
  ): Promise<Orders> {
    const conn = await client.connect();
    const sql =
      "insert into order_products(quantity,order_id,product_id) values ($1,$2,$3)";
    const result = await conn.query(sql, [quantity, order_ID, product_id]);
    conn.release();
    return result.rows[0];
  }
}
