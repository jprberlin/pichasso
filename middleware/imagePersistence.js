const hash = require('object-hash');
const fileCache = require('../middleware/fileCache');

function imagePersistence(req, res, next) {
  if (req.completed) {
    return next();
  }

  let queryHash = hash(req.query);

  fileCache.add(queryHash, req.query.format, req.image);

  res.set('Etag', queryHash);

  return next();
}

module.exports = imagePersistence;