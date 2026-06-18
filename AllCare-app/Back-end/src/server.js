import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import operationalRoutes from "./routes/operationalRoutes.js";
import { initializeDatabase } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.API_PORT || 8001);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "API AllCare rodando",
    endpoints: [
      "GET /usuarios", "POST /usuarios", "POST /usuarios/login",
      "GET /chat/mensagens", "POST /chat/mensagens",
      "GET/POST /agendamentos", "GET/POST /historico", "GET/POST /avaliacoes", "GET/POST /familiares"
    ],
  });
});

app.use("/usuarios", userRoutes);
app.use("/chat", chatRoutes);
app.use("/", operationalRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log("Banco MySQL allcare pronto para uso.");
    });
  })
  .catch((error) => {
    console.error("Erro ao preparar o banco MySQL:", error.message);
    console.error("Confira se o XAMPP/MySQL está ligado e se usuário/senha estão corretos no arquivo .env.");
    process.exit(1);
  });
