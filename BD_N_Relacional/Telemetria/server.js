require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const leiturasRoutes = require("./routes/leituras");
const climaRoutes = require("./routes/clima");

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URL = "mongodb://127.0.0.1:27017/telemetria_race";

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Conectado ao MongoDB", MONGO_URL);
    })
    .catch((erro) => {
        console.error("Erro ao conectar ao MongoDB", erro);
    });

app.use("/api", leiturasRoutes);
app.use("/api", climaRoutes);

app.get("/", (req, res) => {
    res.json({mensagem: "API de Telemetria está rodando"});
});

const PORTA = 3001;

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});   