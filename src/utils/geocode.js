const request =  require('request')
const geocode = (address,callback)=>{
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1553522247136&autocomplete=true&limit=1'
    request({ url:geourl,json: true},(error,response)=>{
        if(error)
        {
                callback('Unable to connect to the loaction services',undefined)
        }
        else if(response.body.features.length==0)
        {
        callback('Unable to find the location,Try another search',undefined)
        }
        else {
                callback(undefined,{
                    latitude : response.body.features[0].center[1],
                    longitude : response.body.features[0].center[0],
                    location: response.body.features[0].place_name})
        }
    })
    }
    module.exports = geocode