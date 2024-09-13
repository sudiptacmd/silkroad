import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(cookieParser());
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

app.listen(5100, () => {
  console.log("SERVER RUNNING 5100");
});

// WFA APP DEL
// ONG PAI
