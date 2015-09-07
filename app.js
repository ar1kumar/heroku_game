var express =require('express');
var app = express();
  // , http = require('http')
  // , server = http.createServer(app)
  // , io = require('socket.io').listen(server);

// listen for new web clients:
// server.listen(5000);
var io = require('socket.io').listen(app.listen(process.env.PORT || 3000));

// handle rest of the requests
app.use(express.static(__dirname + '/public'));

//requests coming for desktop
app.get('/', function(req, res){
   res.sendfile(__dirname + '/public/index.html');
});


//requests coming for mobile
app.get('/p1/:id', function(req, res){
   res.sendfile(__dirname + '/public/p1.html');
});

app.get('/p2/:id', function(req, res){
   res.sendfile(__dirname + '/public/p2.html');
});


//------------------- express routes ends--------------------------------------//

//Socket functions starts//
io.sockets.on('connection', function (socket) {

  socket.on('new_room', function(data){
		socket.join(data);
	});

  socket.on('add', function(data) {
    room = data.roomId;
		socket.broadcast.to(room).emit('fire', data);
		//io.sockets.emit('fire', data);
	});

	socket.on('begin', function(data){
		room = data.roomId;
		socket.broadcast.to(room).emit('started', data);
    //io.sockets.emit('started');
	});

	socket.on('remove', function(data) {
    room = data.roomId;
    socket.broadcast.to(room).emit('remove_particle', data);
    //io.sockets.emit('remove_particle');
	});

	socket.on('add_name', function(data){
    room = data.roomId;
    socket.broadcast.to(room).emit('add_name1', data);
    //io.sockets.emit('add_name1', data);
		console.log(data);
	});
});
