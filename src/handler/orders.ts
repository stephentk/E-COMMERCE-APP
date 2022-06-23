import { Orders, orderStore } from "../model/order";
import express, { Request, Response } from "express";
import { verifyToken } from "./users";

const store = new orderStore();

const index = async (req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const index2 = async (req:Request,res:Response) => {
    const orders = await store.index2();
    res.json(orders)
}
const create = async (req: Request, res: Response) => {
  const order: Orders = {
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    user_id: req.body.user_id,
    status: req.body.status,
  };

  const newOrder = await store.create(order);
  res.json(newOrder);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};
const show2 = async (req: Request, res: Response) => {
  const order = await store.show2();
  res.json(order);
};

const order_routes = (app: express.Application) => {
  app.get("/orders", verifyToken, index);
  app.get("/ordersmuch",index2)
  app.get("/order/:id", verifyToken, show);
  app.get("/orderstatus", show2);
  app.post("/order", create);
};
export default order_routes;
