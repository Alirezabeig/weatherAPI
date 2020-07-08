const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({encoded:true}))

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res){

  const query = req.body.cityName;
  const appid = "2e6a5ee514ffe86c05464a3ad3b191bd&units=metric";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid +"&units="+ units;
  https.get(url, function(response){
  console.log(response)

  response.on("data",function(data){
    const weatherData = JSON.parse(data)
    console.log(weatherData)
    const temp = weatherData.main.temp

    const weatherDescription  = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png"
    res.write("<h1>the tempreture in "+ query +" : " + temp + "degrees C </h1>" )
    res.write("weather description: "+ weatherDescription)
    res.write("<img src="+ imageURL +">");
    res.send()
  })
  });
})



app.listen(3000, function(){
  console.log("We are connected to port 3000")

})
