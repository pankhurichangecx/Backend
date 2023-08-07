const express = require("express");
const cors = require('cors');
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const cartRouter = require("./routes/cartRoutes")
// const authRouter = require('./routes/authRoutes');
const errorMiddleware = require("./error/errMiddleware");

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/cart", cartRouter);
app.use(errorMiddleware);


module.exports = app;



