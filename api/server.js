import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import buyRoutes from "./routes/buyRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import payRoutes from "./routes/payRoutes.js";
import ongRoutes from "./routes/ongRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import viewShopRoutes from "./routes/viewShopRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// ROUTES : "/route" indicates the HTTP URI, the latter indicates what to do at this route.
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/buy", buyRoutes);
app.use("/bid", bidRoutes);
app.use("/pay", payRoutes);
app.use("/ong", ongRoutes);
app.use("/search", searchRoutes);
app.use("/shop", viewShopRoutes);
app.use("/review", reviewRoutes);
app.use("/admin", adminRoutes);

app.listen(5100, () => {
  console.log("SERVER RUNNING 5100");
});

// WFA APP DEL
// ONG PAI
