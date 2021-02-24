const Movie = require('../models/movie');
const BadReqError = require('../errors/BadReqError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('user')
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { movieId } = req.body;
  Movie.create({ movieId, owner: req.user._id })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch(() => next(new BadReqError()));
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findByIdAndRemove(movieId)
    .orFail(new NotFoundError('Карточка не нашлась'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      movie.remove()
        .then((movieToRemove) => res.send({ data: movieToRemove }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,

};
