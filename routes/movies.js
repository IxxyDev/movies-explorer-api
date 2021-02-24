const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const { regExpEn, regExpRu } = require('../utils/regExp')

const moviesRouter = express.Router();
moviesRouter.get('/', getMovies);

moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    nameEN: Joi.string().required().min(2).regex(regExpEn),
    nameRU: Joi.string().required().min(2).regex(regExpRu),
    movieId: Joi.string().hex().length(24).required(),
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom((url) => {
      if (!validator.isURL(url, helpers)) {
        return helpers.error('Ссылка невалидна');
      } return url
    }),
    trailer: Joi.string().required().custom((url) => {
      if (!validator.isURL(url, helpers)) {
        return helpers.error('Ссылка невалидна');
      } return url
    }),
    thumbnail: Joi.string().required().custom((url) => {
      if (!validator.isURL(url, helpers)) {
        return helpers.error('Ссылка невалидна');
      } return url
    }),
  }),
}), createMovie);

moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = moviesRouter;
