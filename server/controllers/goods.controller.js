import Good from '../models/good.model';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../config/config';
/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Good.get(id)
    .then((good) => {
      req.good = good; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.good);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const good = new Good({
      name: req.body.name
  });

  good.save()
    .then(savedGood => res.json(savedGood))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const good = req.good;
  good.name = req.good.name;

  good.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { name = undefined, limit = 50 } = req.query;
  Good.list({ name, skip })
    .then(goods => res.json(goods))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const good = req.good;
  good.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

function profile(req, res, next) {
  if (req.cookies.token) {
    let decoded = jwt.verify(req.cookies.token, config.jwtSecret);
    User.get(decoded.id).then(user => {
      return res.json(user);
    })
  }
}

export default { load, get, create, update, list, remove, profile };
