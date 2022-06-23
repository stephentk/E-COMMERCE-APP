import express, { Request, Response } from "express";
import { Products, productStore } from "../model/products";
import { verifyToken } from "./users";

const store = new productStore();

const index = async (req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const create = async (req: Request, res: Response) => {
  const product: Products = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  const newproduct = await store.create(product);
  res.json(newproduct);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};
const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/product/:id", show);
  app.post("/product", verifyToken, create);
};
export default product_routes;
