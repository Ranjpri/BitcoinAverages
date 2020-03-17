const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})


var crypto = "";
var fiat = "";
var amt = 0;

app.post("/", function (req, res) {
    //Getting the parameters from the screen
    crypto = req.body.crypto;
    fiat = req.body.fiat;
    amt = req.body.amount;
    console.log(amt);
    // Generating the URL
    var finalUrl = baseUrl + crypto + fiat;

    request(finalUrl, function (err, resp, body) {      
        console.log(err);
        
        if (!err) {
            var data = JSON.parse(body);
            var averagePrice = data.averages.week;
            res.send("<h1> The price of "+crypto+" is " + averagePrice + " "+fiat+" </h1>");
        }
        else {
            console.log(err);
        }

        console.log("Last Value:" + data.last);
    })

})


app.listen(3000, function () {
    console.log("Server is listening at 3000");
});