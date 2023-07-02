const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
    console.log(res.statusCode);
});
app.post("/", function(req,res){
    const Fname = req.body.FirstName;
    const Email = req.body.email;
    const Lname = req.body.LastName;
    console.log(Fname,Lname);

    const data = {
        members: [
           {
            email_address: Email,
            status : "subscribed",
            merge_fields : {
                FNAME : Fname,
                LNAME : Lname,
            }
           }
        ]
    };
    const jsonData = JSON.stringify(data);
    const options = {
        method : "POST",
        auth : "zahib:c910e3b720162feae1f6ead33c24e517-us21"
    }
    const url = "https://us21.api.mailchimp.com/3.0/lists/4a1faaba63"
       const request = https.request(url, options, function(response){
            response.on("data", function(){
                if(response.statusCode===200)
                {
                    res.sendFile(__dirname+"/success.html");   
                }
                else
                {
                    res.sendFile(__dirname+"/failure.html");   
                }
            })

        });
        request.write(jsonData);
        request.end();
});
app.listen(process.env.PORT || 3002, function(){
    console.log("Server is Running on port 3002.");
});



//API Key
//c910e3b720162feae1f6ead33c24e517-us21

//Audience ID
//4a1faaba63