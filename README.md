# jwplayer-node

Node module to easily make calls to the jwplayer api.

# Example usage
```
const jwplayer = require('jwplayer')({api_key: 'XXX', api_secret: 'XXXXX'})

module.exports = {

  create_video: function (req, res) {
    jwplayer.call_api({
      method: 'post',
      path: '/v1/videos/create',
    }, req.body.data)
    .then(({data}) => res.send(data))
    .catch(err => console.log(err))
  }
  
}
```
# API

On require make sure to pass jwplayer an object with your api_key and api_secret. You can find them in your jwplayer dashboard. [More info here](https://support.jwplayer.com/customer/portal/articles/2339133-accessing-your-api-key-secret)

## call_api

* parameters
  * config - object containing parameters to configure api_call
    * method - get/post 
    * path - apiversion/class/subclass REQUIRED
      * current api version is v1 
      * you can find class subclass and api version on the [jwplayer api](https://developer.jwplayer.com/jw-platform/reference/v1/)
  * param - all needed for the specific api call.




