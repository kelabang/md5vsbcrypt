/*
* @Author: d4r
* @Date:   2017-12-15 00:00:24
* @Last Modified by:   d4r
* @Last Modified time: 2017-12-15 01:37:31
*/
function add_content(str){
	$('#console').append(str);
	var objDiv = document.getElementById("console");
	objDiv.scrollTop = objDiv.scrollHeight;
}
function ab2str(buf) {
	var enc = new TextDecoder();
	var arr = new Uint8Array(buf)
	return enc.decode(arr)
}
function hasWhiteSpace(s) {
	return s.indexOf(' ') >= 0;
}
function run ($selector) {
	$selector.on('click', function(e){
		e.preventDefault()

		var input = $('input');
		var plaintext = $('input[name="plaintext"]').val()
		var fplaintext = $('input[name="fplaintext"]').val()
		var rounds = $('input[name="rounds"]').val()

		if(
			hasWhiteSpace(plaintext) || hasWhiteSpace(fplaintext) || hasWhiteSpace(rounds)
		) return alert('cannot using space in benchmark configuration input')

		socket.send('npm run positive-test -- '+
			'--spec '+
			'--configuration '+
			'--plaintext='+plaintext+' '+
			'--fplaintext='+fplaintext+' '+
			'--rounds='+rounds+' '+
			'&& npm run negative-test -- '+
			'--plaintext='+plaintext+' '+
			'--fplaintext='+fplaintext+' '+
			'--rounds='+rounds+' '
		)
		return false;
	});
}
function clear ($selector) {
	$selector.on('click', function () {
		$('#console').html('')
	})
}
var socket = io(window.location.origin);
socket.connect();
socket.on('message', function(data) {
	add_content(ab2str(data))
});
run($('form input[type="submit"]'))
run($('li.run'))
clear($('.clear'))

