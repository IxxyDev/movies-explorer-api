const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getMe, updateUser,
} = require('../controllers/users.js');

const usersRouter = express.Router();
usersRouter.get('/me', getMe);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = usersRouter;
