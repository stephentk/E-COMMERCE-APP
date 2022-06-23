import client from "../database";

export type Products = {
  name: string;
  price: number;
  category: string;
};
export class productStore {
  async index(): Promise<Products[]> {
    const conn = await client.connect();
    const sql = "select * from products";
    const result = await client.query(sql);
    conn.release();
    return result.rows;
  }
  async show(id: string): Promise<Products[]> {
    const conn = await client.connect();
    const sql = "select * from products where id = ($1)";
    const result = await client.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
  async create(product: Products) {
    const conn = await client.connect();
    const sql =
      "insert into products(name,price,category) values ($1,$2,$3) returning *";
    const result = await client.query(sql, [
      product.name,
      product.price,
      product.category,
    ]);
    conn.release();
    product = result.rows[0];
    return product;
  }
}
