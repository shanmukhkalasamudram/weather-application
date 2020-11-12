const request = require('request')

const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2hhbm11a2gxMTk5IiwiYSI6ImNraGFxd3ZpdjE5bHEycnJ0cWpwdDcyMncifQ.wDiVKmAdYPiXkQSyqwsgAA&limit=1'
  
    request({url:url,json: true},(error,{body}) => {
  //shortand syntax
      if(error){
        callback('Unable to connect')
  
      }
      else if(body.features.length === 0){
        callback('Unable to find the locationsss')
  
      }
      else{
        callback(undefined, {
        //    latitude: response.body.features[0].center[1],
  
        //   longitude: response.body.features[0].center[0],
        //   location: response.body.features[0].place_name
        // Use shortand and destructing 

        latitude: body.features[0].center[1],
  
           longitude: body.features[0].center[0],
          location: body.features[0].place_name
  
        })
      }
  
    })
  
  
  }


  module.exports = geocode