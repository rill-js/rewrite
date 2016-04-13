var toReg = require('path-to-regexp')
var replaceReg = /\$(\d+)|(?::(\w+))/g

/**
 * Rwrite `from` to `to`.
 *
 * @param {String|RegExp} from
 * @param {String} to
 * @return {Function}
 * @api public
 */
module.exports = function (from, to) {
  var keys = []
  var reg = toReg(from, keys)
  var map = toMap(keys)

  return function rewritePath (ctx, next) {
    var req = ctx.req
    var matches = req.pathname.match(reg)
    if (!matches) return next()

    req.pathname = to.replace(replaceReg, function (_, n, name) {
      if (name) return matches[map[name].index + 1]
      return matches[n]
    })
    req.path = req.pathname + (req.search || '') + (req.hash || '')
    req.original.url = req.path

    return next()
  }
}

/**
 * Turn params array into a map for quick lookup.
 *
 * @param {Array} params
 * @return {Object}
 * @api private
 */
function toMap (params) {
  var map = {}

  for (var param, i = params.length; i--;) {
    param = params[i]
    param.index = i
    map[param.name] = param
  }

  return map
}
