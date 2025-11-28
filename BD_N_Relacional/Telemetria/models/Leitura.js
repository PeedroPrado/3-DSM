const moongose = require('mongoose');

const leituraSchema = new moongose.Schema({
    carro: {
        type: String,
        required: true
    }, 
    sensor: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    data_hora: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = moongose.model("Leitura", leituraSchema)