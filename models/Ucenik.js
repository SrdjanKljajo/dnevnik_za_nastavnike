const mongoose = require('mongoose');

const UcenikSchema = new mongoose.Schema({
    ime: {
        type: String,
        required: true
    },
    razred: {
        type: String,
        required: true
    },
    ocenePP: {
        type: String,

    },
    zakljucnaPP: {
        type: String,

    },
    oceneDP: {
        type: String,

    },
    zakljucnaDP: {
        type: String,

    },
    neopravdani: {
        type: String,

    },
    opravdani: {
        type: String,

    },
    napomene: {
        type: String,

    }

});

module.exports = mongoose.model('Ucenik', UcenikSchema);