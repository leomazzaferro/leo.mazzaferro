import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/cart.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto http://localhost:${PORT}`);
});

app.use("/api/productos", productsRouter);
app.use("/api/cart", cartRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    error: "No se encuentra la ruta",
  });
});
