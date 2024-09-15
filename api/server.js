import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

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
app.use("/product", productRoutes); //EVAN

app.listen(5100, () => {
  console.log("SERVER RUNNING 5100");
});

// WFA APP DEL
// ONG PAI
