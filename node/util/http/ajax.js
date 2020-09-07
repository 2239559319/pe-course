const {
  app_key,
  app_secret,
  getSign,
  getTimestamp
} = require('../util')
const { http } = require('./config')
const qs = require('querystring')

/**
 * get
 * @param {string} path
 * @param {*} authorHeaders
 */
async function emitAjaxGet(path, authorHeaders) {
  const queryString = {
    app_key,
    timestamp: getTimestamp(),
    sign: getSign(path, app_secret, getTimestamp()),
  }
  const res = await http.get(path, {
    params: queryString,
    headers: authorHeaders,
  })
  return await res.data
}
/**
 * post
 * @param {string} path
 * @param {Object} data
 * @param {*} authorHeaders
 */
async function emitAjaxPost(path, data, authorHeaders) {
  const queryString = {
    app_key,
    timestamp: getTimestamp(),
    sign: getSign(path, app_secret, getTimestamp(), data),
    ...data,
  }
  const res = await http.post(path, qs.stringify(queryString), {
    headers: authorHeaders
  })
  return await res.data
}

module.exports = {
  emitAjaxGet,
  emitAjaxPost
}