const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

var bodyParser = require('body-parser');
const path  = require("path");
const cookieParse = require("cookie-parser");

const { Server } = require("socket.io");

const io = new Server(server);

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParse());


const loginController = require("./controllers/loginController");

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"/statics/login.html"));
});


app.post("/auth",loginController.authUser);

app.get('/chat',loginController.exist, (req, res) => {

  res.sendFile(path.join(__dirname,"/statics/index.html"));
});

io.on("connect",(socket)=>{
    console.log("User connected");

    socket.on("message",(data)=>{
        console.log(data);
        // All recv the data include sender
        io.emit("allMessages",data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});