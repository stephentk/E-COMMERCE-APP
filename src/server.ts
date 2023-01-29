import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import user_routes from "./handler/users";
import product_routes from "./handler/product";
import order_routes from "./handler/orders";

const app = express();

app.use(cors());
app.use(bodyParser.json())
user_routes(app);
product_routes(app);
order_routes(app);

app.listen(2000, () => {
  console.log("app started");
});

export default app;
