const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserShema = new mongoose.Schema({

    predmet: {
        type: String,
        required: true,
        max: 200
    },

    username: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },

    password: {
        type: String,
        required: true,
        min: 6
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },

    ucenici: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ucenik' }]

});

UserShema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next();

    });
});

UserShema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err);
        else {
            if (!isMatch)
                return cb(null, isMatch);
            return cb(null, this);

        }
    });
}

module.exports = mongoose.model('User', UserShema);
