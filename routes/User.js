const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Ucenik = require('../models/Ucenik');

const signToken = userID => {
  return JWT.sign(
    {
      iss: '',
      sub: userID,
    },
    '',
    { expiresIn: '2h' }
  );
};

userRouter.post('/register', (req, res) => {
  const { predmet, username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({
          message: { msgBody: 'Greška prilikom registracije', msgError: true },
        });
    if (user)
      res
        .status(400)
        .json({
          message: { msgBody: 'Korisničko ime je zauzeto!', msgError: true },
        });
    else {
      const newUser = new User({ predmet, username, password, role });
      newUser.save(err => {
        if (err)
          res
            .status(500)
            .json({
              message: {
                msgBody: 'Greška prilikom registracije',
                msgError: true,
              },
            });
        else
          res
            .status(201)
            .json({
              message: {
                msgBody: 'Registracija je uspešno obavljena',
                msgError: false,
              },
            });
      });
    }
  });
});

userRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie('access_token', token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

userRouter.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: '', role: '' }, success: true });
  }
);

userRouter.post(
  '/ucenik',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const ucenik = new Ucenik(req.body);
    ucenik.save(err => {
      if (err)
        res
          .status(500)
          .json({
            message: {
              msgBody: 'Greška prilikom dodavanja učenika',
              msgError: true,
            },
          });
      else {
        req.user.ucenici.push(ucenik);
        req.user.save(err => {
          if (err)
            res
              .status(500)
              .json({
                message: {
                  msgBody: 'Greška prilikom dodavanja učenika',
                  msgError: true,
                },
              });
          else
            res
              .status(200)
              .json({
                message: {
                  msgBody: 'Učenik uspešno dodat u dnevnik',
                  msgError: false,
                },
              });
        });
      }
    });
  }
);

//update
userRouter.put(
  '/ucenik/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Ucenik.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { runValidators: true },
      (err, response) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: 'Greška prilikom izmene podataka o učeniku',
              msgError: true,
            },
          });
        else
          res.status(200).json({
            message: {
              msgBody: 'Podaci o učeniku uspešno izmenjeni',
              msgError: false,
            },
          });
      }
    );
  }
);

// delete
userRouter.delete(
  '/ucenik/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Ucenik.findByIdAndDelete(req.params.id, err => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: 'Greška prilikom brisanja podataka o učeniku',
            msgError: true,
          },
        });
      else
        res.status(200).json({
          message: {
            msgBody: 'Podaci o učeniku uspešno obrisani',
            msgError: false,
          },
        });
    });
  }
);

userRouter.get(
  '/ucenici',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate('ucenici')
      .exec((err, document) => {
        if (err)
          res
            .status(500)
            .json({
              message: {
                msgBody: 'Greška, kontaktirajte administratora',
                msgError: true,
              },
            });
        else {
          res
            .status(200)
            .json({ ucenici: document.ucenici, authenticated: true });
        }
      });
  }
);

userRouter.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role === 'admin') {
      res
        .status(200)
        .json({ message: { msgBody: 'Ćao legendice', msgError: false } });
    } else
      res
        .status(403)
        .json({
          message: {
            msgBody:
              'Nemate ulogu administratora, pristup ovoj stranici vam nije odobren',
            msgError: true,
          },
        });
  }
);

userRouter.get(
  '/authenticated',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { predmet, username, role } = req.user;
    res
      .status(200)
      .json({ isAuthenticated: true, user: { predmet, username, role } });
  }
);

module.exports = userRouter;
