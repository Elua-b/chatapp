const express=require('express');
const app=express();
const http=require('http')
const cors=require('cors')
const {Server} =require('socket.io');
const { method } = require('lodash');

app.use(cors());

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        METHODS: ["POST","GET"],
    }
});
io.on("connection", (socket)=>{
    console.log(`User connected`);
    socket.on("join_room",(data) =>{
        socket.join(data);
        console.log(`user with ID:${socket.id} joined room: ${data}`)
    });
    socket.on("send_message", (data)=>{
        console.dir(socket.client.id)
        socket.to(data.room).emit("receive_message",{...data, id: socket.client.id});
    })
     socket.on("disconnected",()=>{
         console.log("user Disconnected",socket.id);
     })
})

server.listen(3001,()=>{
    console.log("server is running")
})