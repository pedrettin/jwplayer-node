const sha1 = require('sha1')
const _ = require('underscore')
const url_tools = require('url')
const querystring = require('query-string')
const urlencode = require('urlencode')
const utf8 = require('utf8')

module.exports = function (config = {}, priv = {}) {

  let pub = {}

  let options = _.extend({
    hostname: 'api.jwplatform.com',
    protocol: 'http',
    api_format: 'json'
  }, config)

  /*
  * return {string} url for api call
  */
  pub.get_api_call = function (path, params) {
    let {hostname, protocol} = options
    return url_tools.format({
      hostname,
      protocol,
      query: priv.get_query(priv.strip_params(params)),
      pathname: path
    })
  }

  /*
  * return {object} all params required to make the api call
  */
  priv.get_query = function (params) {
    let {api_format, api_key} = options
    let all_params = _.extend({
      api_format,
      api_key,
      api_nonce: priv.get_nonce(),
      api_timestamp: (Math.floor(Date.now()/1000)).toString()
    },params)
    all_params.api_signature = priv.get_api_signature(all_params)
    return all_params
  }

  /*
  * @return {string} hashed api signature
  */
  priv.get_api_signature = function (params) {
    let new_params = _.extend({}, params)
    Object.keys(new_params).forEach(k => new_params[k] = utf8.encode(new_params[k])) /*utf8 encode all text params*/
    Object.keys(new_params).forEach(k => new_params[k] = urlencode(new_params[k])) /*url encode all text params*/
    new_params = Object.keys(new_params).sort().reduce((r, k) => (r[k] = new_params[k], r), {}) /*sort params by encoded name*/
    return sha1(querystring.stringify(new_params, {encode: false})+options.api_secret) /*sha1 hex encoding*/
  }

  /*
  * @return {Number} 8 digit random number
  */
  priv.get_nonce = function () {
    let min = 10000000
    let max = 99999999
    return (Math.floor(Math.random() * (max-min)) + min).toString()
  }

  /*
  * @return {object} object where all keys are stripped of the chars ( ) * '
  */
  priv.strip_params = function (params) {
    return Object.keys(params).reduce((o,k) => {
      o[k] = params[k].replace(/\(|\)|\*|\'/,'')
      return o
    },{})
  }

  return pub
}
