import bcrypt from "bcrypt";
import client from "../database";

export type User = {
  firstname: "string";
  lastname: "string";
  password: "string";
};
const pepper = process.env.BCRYPT_PASSWORD;

export class userstore {
  async create(user: User): Promise<User> {
    const conn = await client.connect();
    const sql =
      "insert into users(firstname,lastname,password) values($1,$2,$3) returning *";
    const hash = bcrypt.hashSync(user.password + pepper, parseInt("10"));
    const result = await conn.query(sql, [user.firstname, user.lastname, hash]);
    conn.release();
    return result.rows[0];
  }

  async index(): Promise<User[]> {
    const conn = await client.connect();
    const sql = "select * from users";
    const result = await conn.query(sql);
    return result.rows;
  }

  async show(id: string): Promise<User> {
    const conn = await client.connect();
    const sql = "select * from users where id=($1)";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
  async authenticate(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT password FROM users where firstname = ($1)";
    const result = await conn.query(sql, [firstname]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
