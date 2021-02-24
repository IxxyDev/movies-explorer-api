const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const moviesRouter = require("./routes/movies");
const usersRouter = require("./routes/users");
const {celebrate} = require("celebrate");
const {login} = require("./controllers/users");
const {createUser} = require("./controllers/users");

const app = express()
const { PORT = 3007 } = process.env;
const limiter = rateLimit({
  windowMs: 60000,
  max: 100,
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

const userJoiSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

app.post('/signup', celebrate(userJoiSchema), createUser);
app.post('/signin', celebrate(userJoiSchema), login);

app.use('/movies', auth, moviesRouter);
app.use('/users', auth, usersRouter);

app.listen(PORT, () => {});
