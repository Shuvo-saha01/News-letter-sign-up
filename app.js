let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
let https = require("https");

app.use(express.static("public"));


app.get("/",function (req, res){
    res.sendFile(__dirname+"/signup.html");
    
})

app.post("/",function(req, res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    
    let data = {
        members: [
            {
                email_address : email,
                status: "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }

            }

        ]
    }

    let jsonData  = JSON.stringify(data);

    let url = "https://us14.api.mailchimp.com/3.0/lists/1d6c7ede50"
    options = {
        method : "POST",
        auth : "shuvo:8a8d6a952507f517cc8dbe27ff550333-us14"
    }


    let request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+ "/failure.html")
        }
    } )
request.write(jsonData);
request.end();
}) // post method end 

app.post("/failure",function(req, res){
    res.redirect("/");
})


app.listen(3000, function(){
    console.log("The server is running at 3000");
})

// api key: 
// 8a8d6a952507f517cc8dbe27ff550333-us14
// 1d6c7ede50.