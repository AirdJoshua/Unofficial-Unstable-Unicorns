const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");


const server = http.createServer(app);
app.use(cors());


const users = []

const addUser = ({id, name, room}) => {
   const numberOfUsersInRoom = users.filter(user => user.room === room).length
   if(numberOfUsersInRoom === 2)
   return { error: 'Room full' }

   const newUser = { id, name, room }
   users.push(newUser)
   return { newUser }
}

const removeUser = id => {
   const removeIndex = users.findIndex(user => user.id === id)

   if(removeIndex!==-1)
       return users.splice(removeIndex, 1)[0]
}

const getUser = id => {
   return users.find(user => user.id === id)
}

const getUsersInRoom = room => {
   return users.filter(user => user.room === room)
}



const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data, callback) => {
    let numberOfUsersInRoom = getUsersInRoom(data.room).length

    const { error, newUser} = addUser({
      id: socket.id,
      name: numberOfUsersInRoom===0 ? 'Player 1' : 'Player 2',
      room: data.room
  })

    if(error)
    return callback(error)

    socket.join(newUser.room)
    io.to(newUser.room).emit('roomData', {room: newUser.room, users: getUsersInRoom(newUser.room)})
    socket.emit('currentUserData', {name: newUser.name})
    callback()

    console.log(`User with ID: ${newUser.name} joined room: ${data.room}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });


});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
