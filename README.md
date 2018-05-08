# jwplayer-node

Node module to easily make calls to the jwplayer api.

# Warnings

Jwplayer does not support [4 bytes unicode chars](https://unicode-table.com/en/#myanmar).
Avoid using them in the parameters you send the API.

# Example usage
```javascript
const jwplayer = require('jwplayer-node')({api_key: 'XXX', api_secret: 'XXXXX'})
const video_params = {title: 'new video',description: 'this is a new video I am uploading'}

jwplayer.call_api(
{
  method: 'post',
  path: '/v1/videos/create',
},
video_params)
.then(succ => /*jwplayer response*/)
.catch(err => /*jwplayer error response*/)
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
* returns
  * promise containing jwplayer response
