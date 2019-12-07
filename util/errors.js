class AlreadyExists extends Error{};
class NotFound extends Error{};
class IncorrectPassword extends Error{};
class BLException extends Error{};

module.exports = exports = {AlreadyExists, NotFound, IncorrectPassword, BLException};