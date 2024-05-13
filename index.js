import express from "express";
import auth from "./src/routes/auth.route.js";
import item from "./src/routes/item.route.js";
import cart from "./src/routes/cart.route.js";
import order from "./src/routes/order.route.js";
import customer from "./src/routes/customer.route.js";
import suppliers from  "./src/routes/suppliers.route.js"
import puchaseOrder from "./src/routes/purchaseOrder.route.js";

const app = express();

app.use("/auth", auth);
app.use("/item", item);
app.use("/cart", cart);
app.use("/order", order);
app.use("/customer", customer);
app.use("/suppliers",suppliers)
app.use("/purchaseOrder", puchaseOrder);

export default app;
