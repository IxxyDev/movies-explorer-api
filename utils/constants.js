const ERROR_MESSAGE = {
  CARD_NOT_FOUND: 'Карточка с таким id не найдена',
  USER_NOT_FOUND: 'Пользователь с таким id не найден',
  INCORRECT_USER_DATA: 'Неправильные данные пользователя',
  INCORRECT_AVATAR_DATA: 'Неправильные данные аватара пользователя',
  INCORRECT_CARD_DATA: 'Неправильные данные карточки',
  SERVER_ERROR: 'Ошибка сервера',
  NOT_FOUND: 'Запрошенный ресурс не найден',
  CONFLICT: 'Пользователь с такими данным уже зарегистрирован',
  INCORRECT_LOGIN_DATA: 'Неверный email или пароль',
  BAD_REQUEST: 'Неверные параметры в запросе',
  FORBIDDEN: 'Нельзя удалить чужую карточку',
};

const ERROR_CODE = {
  INCORRECT_DATA: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  CONFLICT: 409,
  UNATHORIZED: 401,
  FORBIDDEN: 403,
};

module.exports = {
  ERROR_MESSAGE,
  ERROR_CODE,
};
