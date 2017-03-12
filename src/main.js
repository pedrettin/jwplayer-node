const _ = require('underscore')
const axios = require('axios')

module.exports = function (credentials) {

  let pub = {}

  if (missing_param(credentials, ['api_key', 'api_secret'])) return  

  let tools = require('./tools.js')(credentials)

  pub.call_api = function (config, params) {
    if (missing_param(config, ['path'])) return
    config = _.extend({method: 'get'}, config)
    return axios({
      method: config.method,
      url: tools.get_api_call(config.path, params)
    })
  }

  function missing_param (obj, mandatory) {
    if (_.difference(mandatory, Object.keys(obj)).length != 0){
      console.log('You must specify an api_key and api_secret')
      return true
    }
    return false
  }

  return pub
  
}