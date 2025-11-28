const express = require("express");
const router = express.Router();
const { importarClimaAtual } = require("../services/climaService");


router.get("/clima", async (req, res) => {
  try {
    const cidade = req.query.cidade || "São Paulo";

    const registro = await importarClimaAtual(cidade);


    return res.json(registro);
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao importar clima." });
  }
});

module.exports = router;
