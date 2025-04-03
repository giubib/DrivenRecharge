import express from "express";
import phoneRoutes from "./routes/phones";
import rechargeRoutes from "./routes/recharges";
import clientRoutes from "./routes/clients";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/phones", phoneRoutes);
app.use("/recharges", rechargeRoutes);
app.use("/", clientRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
