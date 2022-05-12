const mongoose = require('mongoose')

const barremSchema = new mongoose.Schema({
    classification: {
        type: Number,
        required: false,
    },
    nb_materiel: {
        type: Number,
        required: false,
    },
    nb_salaries: {
        type: Number,
        required: false,
    },
    prix: {
        type: Number,
        required: false,
    },
    offre: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Offre"
    },
    
    lot: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Lot"
    },
    
},
{
    timestamps: true
})

const Barrem = mongoose.model('Barrem', barremSchema)

module.exports = Barrem