const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=d71137ede6c669b885b63681ece3a0c9&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

  request({url, json: true}, (error, {body}= {}) => {
    const {weather_descriptions, temperature, feelslike} = body.current
    if(error) {
      callback('Unable to connect to the weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degress out.')
    }
  })
}

module.exports = forecast