var tictactoeConn = (function(){
	
	var screen;
	var o;
	var timer;
	var lastid = -2;
	var lastdata;

	var apiRequest = function(callback, data){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//console.log(xhttp.responseText);
				callback(JSON.parse(xhttp.responseText));
			}
		};
		xhttp.open("POST", "https://www.games.it-k.pl/api/tictactoe/", true);
		xhttp.send(data);
	};
	
	var getStatusC = function(data){
		if(data.error){
			window.location.href = "https://www.games.it-k.pl/";
		}
		
		if(lastid != data.lastid){
			//console.log(data);
			screen(data);
			lastid = data.lastid;
			lastdata = data;
		}
	};
	
	var getStatus = function(){
		var data = new FormData();
		data.append('a', 'status');
		data.append('o', o);
							
		apiRequest(getStatusC, data);
	};
	
	var _init = function(func){
		screen = func;
		var url = new URL(window.location.href);
		o = url.searchParams.get("o");
		getStatus();
		timer = setInterval(getStatus, 500);
	};
	
	var _move = function(p){
		var data = new FormData();
		data.append('a', 'move');
		data.append('o', o);
		data.append('p', p);
							
		apiRequest(getStatusC, data);
	};
	
	var _invite = function(){
		var data = new FormData();
		data.append('a', 'invite');
		data.append('o', o);
							
		apiRequest(getStatusC, data);
	};
	
	var _accept = function(){
		var data = new FormData();
		data.append('a', 'accept');
		data.append('o', o);
							
		apiRequest(getStatusC, data);
	};

	return {
			init: _init,
			move: _move,
			invite: _invite,
			accept: _accept
	};
	
})();
