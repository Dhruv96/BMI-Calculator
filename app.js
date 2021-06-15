const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(__dirname));
app.set('view engine', 'pug')

// setting route to bmi.html
app.get("/", function(req,res) {
    res.sendFile(__dirname + "/bmi.html")
})

// setting route to pug result file for post request
app.post("/", function(req,res) {
    // putting everything in variables to pass the entered values to the result page
    var enteredAge = req.body.age; 
    var enteredHeight = req.body.height;
    var enteredWeight = req.body.weight;
    // Parsing the variables to Number
    var height = Number(enteredHeight);
    var weight = Number(enteredWeight);
    var heightInMetres = height/100;
    var heightSquared = Math.pow(heightInMetres,2);
    if(isNaN(weight/heightSquared)) // if entered values are not numbers pass error to result page
    {
        res.render("result", {error: "Please enter numeric values only", enteredWeight: enteredWeight, enteredHeight: enteredHeight, enteredAge: enteredAge});
    }
    else // if entered values are numbers pass BMI to result page
    {
        res.render("result", {bmiResult: round(weight/heightSquared),enteredWeight: enteredWeight, enteredHeight: enteredHeight, enteredAge: enteredAge});
    }
    
})

app.listen(3000, function() {
    console.log("server started on port 3000");
})

// This function roounds off the number to one decimal place
function round(num) {
    var m = Number((Math.abs(num) * 10).toPrecision(15));
    return Math.round(m) / 10 * Math.sign(num);
}