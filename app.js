const express = require("express");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
// const authRouter = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);


module.exports = app;


// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();

// // ...other imports...

// // Connect to the MongoDB database
// mongoose.connect("mongodb://localhost:27017/myapp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Middleware to parse JSON in the request body
// app.use(express.json());

// // Routes
// const productRouter = require("./routes/productRoutes");
// const userRouter = require("./routes/userRoutes");
// const orderRouter = require("./routes/orderRoutes");
// const authRouter = require("./routes/authRoutes");

// app.use("/api/v1/products", productRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/orders", orderRouter);
// app.use("/api/v1/auth", authRouter); // Use the authentication route

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


