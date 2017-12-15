/*
* @Author: d4r
* @Date:   2017-12-11 10:57:44
* @Last Modified by:   d4r
* @Last Modified time: 2017-12-15 01:13:54
*/
/* load dependency module */
const md5 = require('md5');
const bcrypt = require('bcrypt');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

/* bcrypt configuration */
const bcryptHash = global.bcryptHash

/* text to test */
const plaintextPassword = global.plaintextPassword;

/* benchmark */
suite
	// add blowfish test 
	.add('Blowfish#test', function(defer) {
	    bcrypt.compare(plaintextPassword, bcryptHash, function(err, res) {
	        if(res) {
	        	defer.resolve('right password');
	        }else{
	        	defer.resolve('wrong password');
	        }
	    });
	}, {defer: true})
	// add md5 test
	.add('MD5#test', function(defer) {
		let hash = global.md5Hash
		if (hash == md5(plaintextPassword)) {
			defer.resolve('right password')
		}else{
			defer.resolve('wrong password')
		}
	}, {defer: true})
	/* listener to log operation per second */
	.on('cycle', function(event) {
	  	console.log(String(event.target)+'<br/>');
	})
	/* listener to log the result */
	.on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
		console.log('<br/>====================<br/>')
	})
	// run benchmark 
	.run({ 'async': true });