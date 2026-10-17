import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import fieldRoutes from "./routes/fields.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // alamat frontend Vite
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "FutsalBook API berjalan" });
});

app.use("/api/auth", authRoutes);
app.use("/api/fields", fieldRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API berjalan di http://localhost:${PORT}`);
});