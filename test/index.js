const should = require('should')

describe('jwplayer index', function () {

  it('should print an error if api_key and api_secret are not specified', done => {
      const jwplayer = require('../src/index.js')({api_key: 'XXXX', api_secret: 'XXXXX'})
      done()
  })

})