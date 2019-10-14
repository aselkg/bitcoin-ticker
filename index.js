//jshint esversion:6

const express = require("express");// express framework
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  // console.log(req.body.cripto);

  var crypto = req.body.crypto;// storing current cripto(checked)
  var fiat = req.body.fiat;// sotring current fiat(checked)
  var amount = req.body.amount;



  var options = { //js object with all options
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:  {     // question string
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.price; // converting json into js object

    console.log("price");

    var currentDate = data.time; // curent time api display


    res.write("<p>The current date is " + currentDate + "</p>");
     // writting last price from api
    res.write("<h1>" + amount + crypto + " is currently worth " +  price + fiat +"</h1>");
    // calling all res.writes
    res.send();
  })
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.")
})
