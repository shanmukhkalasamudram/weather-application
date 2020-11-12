const request = require('request')

const forecast = (latitude,longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=bba295760bf319564652d6859fa80fed&query='+latitude+','+longitude+'&units=m'
  
    request({url:url,json: true},(error,{body}) => { //shortand syntax
  
      if(error){
        callback('Unable to connect',undefined)
  
      }
      else if(body.error){
        callback('Unable to find the location',undefined)
  
      }
      else{
        callback(undefined, "The temperature is " + body.current.temperature+" and the weather_descriptions is " + body.current.weather_descriptions+" and there is a " + body.current.precip +" % chance of rain"   )
      }
  
    })
  
  
  }


  module.exports = forecast