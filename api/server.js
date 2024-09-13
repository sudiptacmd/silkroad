import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

// ROUTES : "/route" indicates the HTTP URI, the latter indicates what to do at this route.
app.use("/auth", authRoutes);

app.listen(5100, () => {
  console.log("SERVER RUNNING 5100");
});
