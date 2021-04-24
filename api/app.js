const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config/config");
const response = require("./helpers/response");
const server = require("http").createServer(app);

const cors = require("cors");
const users={};
app.use(cors());

app.use(function(req,res,next){
    res.success = function(msg,data=[]){
        response.success(res,msg,data);
    };
    res.error = function(msg,data,status){
        status = status||201;
        response.error(res,msg,data,status);
    };
    res.token = function(msg,token,data=[]){
        response.token(res,msg,token,data);
    };
    res.emit_msg = function(event,msg){
        if(req.user){
        }
    };
    next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api/"+config.API_VERSION, require("./routes/web.js"));

const swaggerUi = require('swagger-ui-express');
const apiDoc = require('./swagger/apiDoc');


app.use(express.static('public'));
app.use("/public/",express.static('public'));
server.listen(config.PORT,config.IP,(req,res)=>{
    console.log(`Server started on http://${config.IP}:${config.PORT}`);
})



