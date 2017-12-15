var http  = require('http'),
    url   = require('url'),
    path  = require('path'),
    fs    = require('fs'),
    io    = require('./../node_modules/socket.io'),
    util  = require('util'),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    listener;

var sh = spawn('bash');

sh.stdout.on('data', function(data) {
	console.log('stdout', data)
  	listener.send(data);
});

sh.stderr.on('data', function(data) {
	console.log('stderr', data)
  	listener.send(data);
});

sh.on('exit', function (code) {
	console.log('exit')
	listener.send('** Shell exited: '+code+' **');
});

server = http.createServer(function(request, response){
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
    fs.exists(filename, function(exists) {
      if (!exists) {
        response.writeHead(404, {'Content-Type':'text/plain'});
        response.end("Can''t find it...");
      }
      fs.readFile(filename, 'binary',function(err, file){
        if (err) {
          response.writeHead(500, {'Content-Type':'text/plain'});
          response.end(err + "\n");
          return;
        }
        response.writeHead(200);

        response.write(file, 'binary');
        response.end();

      });
    });
  }
);

server.listen(8080);

listener = io.listen(server);

listener.on('connection', function(client){
  client.on('message', function(data){
    sh.stdin.write(data+"\n");
    listener.send(new Buffer("> "+data));
  });
});