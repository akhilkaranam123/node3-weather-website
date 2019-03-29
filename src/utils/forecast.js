const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude,longitude,callback)=>{
     const url ='https://api.darksky.net/forecast/5d5a5e6f2974ac2fa50fca8b982d7888/'+latitude+','+longitude+''

     request ({url : url , json: true},(error,response)=>{
         if(error)
         {
          callback('Notwork unavailable',undefined)
              }
         else if(response.body.length==0)
         {
             callback('Laoction unaviable',undefined)
         }
         else
       {
           callback(undefined,response.body.currently.summary +' The temperature is '+ response.body.currently.temperature+'There is '+ response.body.currently.precipProbability+'%chance of rain')
        }
    })
}
   module.exports = forecast

