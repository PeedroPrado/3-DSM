const express = require("express");
const router = express.Router();
const Leitura = require("../models/Leitura");
const { importarClimaAtual } = require("../services/climaService");

router.post("/", async (req, res) => {
    try {
        const { carro, sensor, valor, dataHora } = req.body;


        if (!carro || !sensor || valor === undefined) {
            return res.status(400).json({
                mensagem: "Campos obrigatórios: carro, sensor e valor."
            });
        }

        const novaLeitura = new Leitura({
            carro,
            sensor,
            valor,
            dataHora
        })

        const leituraSalva = await novaLeitura.save();
        return res.status(201).json(leituraSalva);
    } catch (error) {
        console.error("Erro ao salvar leitura:", error);
        return res.status(500).json({
            mensagem: "Erro interno ao salvar leitura."
        });
    }
})

module.exports = router;