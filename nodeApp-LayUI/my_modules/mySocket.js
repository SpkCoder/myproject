var mySocket = function (server) {
//  const io = require('socket.io')(server);
//	io.on('connection', function(socket){
//		//本次连接的socket发消息
//		socket.emit('news', { "meg": 'hello' });
//		
//		//接受消息
//		socket.on('news2', function (data) {
//		    console.log(data);
//		    //给除了自己以外的所有连接的socket发广播消息
//		    socket.broadcast.emit('broadcast',{ "meg": 'hello broadcast' });   
//		    
//		});
//		
//		//所有连接数量
//		//console.log(io.eio.clientsCount );
//			
//	});
}


module.exports = mySocket;

