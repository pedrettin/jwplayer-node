const sha1 = require('sha1')
const _ = require('underscore')
const url_tools = require('url')
const querystring = require('querystring')
const crypto = require('crypto')

module.exports = function (config = {}, priv = {}) {

  let pub = {}

  let options = _.extend({
    hostname: 'api.jwplatform.com',
    protocol: 'http',
    api_format: 'json'
  }, config)

  pub.get_api_call = function (path, params) {
    let {hostname, protocol} = options
    return url_tools.format({
      hostname,
      protocol,
      query: priv.get_query(params),
      pathname: path
    })
  }

  priv.get_query = function (params) {
    let {api_format, api_key, api_secret} = options
    let all_params = _.extend({
      api_format,
      api_key,
      api_nonce: priv.get_nonce(),
      api_timestamp: Math.floor(Date.now()/1000)
    },params)
    all_params.api_signature = priv.get_api_signature(all_params)
    return all_params
  }

  priv.get_api_signature = function (params) {
    params = _.extend({}, params)
    params = Object.keys(params).sort().reduce((r, k) => (r[k] = params[k], r), {})
    return sha1(querystring.stringify(params)+options.api_secret)
  }

  /*
  * @return {Number} 8 digit random number
  */
  priv.get_nonce = function () {
    let min = 10000000
    let max = 99999999
    return Math.floor(Math.random() * (max-min)) + min
  }

  return pub
}