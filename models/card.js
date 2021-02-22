const mongoose = require('mongoose');
const { isURL } = require('validator');
const { regExpEn, regExpRu } = require('../utils/regExp')

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (name) => regExpRu.test(name),
      message: 'Название фильма не на русском языке',
    }
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (name) => regExpEn.test(name),
      message: 'Название фильма не на английском языке',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: 'Некорректная ссылка',
    },
  },
  trailer: {
    type: String,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: 'Некорректная ссылка',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: 'Некорректная ссылка',
    },
  },

});

movieSchema.statics.findMovieById = function (movieId, owner) {
  return this.findOne({ $and: [{ movieId }, { owner }] })
    .then((movie) => {
     if(!movie) {
       return Promise.reject(new Error('Неверный id или пользователь'));
     }
  })
}

module.exports = mongoose.model('movie', movieSchema);
