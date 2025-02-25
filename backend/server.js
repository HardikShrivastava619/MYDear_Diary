import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);

dotenv.config({ path: resolve(_dirname, "../.env") });

connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

app.use(userRoutes);
app.use(entryRoutes);

app.use(express.static(resolve(_dirname, "../client/dist")));

app.get("*", (_, res) => {
  res.sendFile(resolve(_dirname, "../client/dist/index.html"));
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
