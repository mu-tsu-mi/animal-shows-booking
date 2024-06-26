const token = process.env.WEATHER_API_TOKEN;
const WEATHER_URL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/26216'
// const weather = require('../weather/detail.json');

module.exports = {
    showIndex
}

async function showIndex(req, res) {
    const url = `${WEATHER_URL}?metric=true&apikey=${token}`
    const weatherResponse = await fetch(url)
    const weather = await weatherResponse.json()   

    const dailyFcst = weather["DailyForecasts"]
    const days = dailyFcst.map((day) => {
        return new Date(day["Date"]).toLocaleString('en-au' , {
            month: "short", 
            day: "numeric", 
        })
    })

    const weatherDescription = dailyFcst.map((day) => {
        return day["Day"]["IconPhrase"]
    })
    const minTemp = dailyFcst.map((day) => {
        return day["Temperature"]["Minimum"]["Value"]
    })
    const maxTemp = dailyFcst.map((day) => {
        return day["Temperature"]["Maximum"]["Value"]
    })
    
    res.render('index', { title: 'Animal\'s Wonderland', days, minTemp, maxTemp, weatherDescription });
}