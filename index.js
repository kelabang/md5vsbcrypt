/*
* @Author: d4r
* @Date:   2017-12-11 10:57:44
* @Last Modified by:   d4r
* @Last Modified time: 2017-12-15 02:47:42
*/

const args = require('yargs').argv
const bcrypt = require('bcrypt')
const md5 = require('md5')
const si = require('systeminformation');

/* get hardware information */
si.cpu()
    .then(data => {
    	if(!args.spec) return false
    	console.log('<br/>====================<br/>')
    	console.log('Spec information ')
    	console.log('<br/>====================<br/>')
    	console.log('CPU manufacturer ',  data.manufacturer)
    	console.log('<br/> CPU brand ',  data.brand)
    	console.log('<br/> CPU speed ',  data.speed)
    	console.log('<br/> CPU speedmin ',  data.speedmin)
    	console.log('<br/> CPU speedmax ',  data.speedmax)
    	console.log('<br/> CPU cores ',  data.cores)
    	console.log('<br/> CPU vendor ',  data.vendor)
    })
    .then(() => {

    	/* text to hash */
    	global.plaintextPassword = args.plaintext || '1n1 p4ssw0rd s4y4';
    	global.plaintextPasswordBeda = args.fplaintext || 'ini password saya';

    	/* bcrypt power factor */
    	global.saltRounds = args.rounds || 15;

    	if(args.configuration) {
    		console.log('<br/>====================<br/>')
    		console.log('configuration')
    		console.log('<br/>====================<br/>')
    		console.log('registered password : ', global.plaintextPassword)
    		console.log('<br/>registered fake password : ', global.plaintextPasswordBeda)
    		console.log('<br/>registered salt rounds bycrpt : ', global.saltRounds)
    	}

    	console.log('<br/>=== generate salt bcrypt ===')
    	/* generate bcrypt salt and hash */
    	global.bcryptSalt = bcrypt.genSaltSync(global.saltRounds)
    	console.log('<br/>=== generate hash bcrypt ===')
    	global.bcryptHash = bcrypt.hashSync(global.plaintextPassword, global.bcryptSalt)

    	console.log('<br/>=== generate hash md5 ===')
    	/* generate md5 hash */
    	global.md5Hash = md5(plaintextPassword)

    	console.log('<br/>====================<br/>')
    	console.log('generated salt and hashing')
    	console.log('<br/>====================<br/>')
    	console.log('generated salt bycrpt : ', global.bcryptSalt)
    	console.log('<br/>generated hash bycrpt : ', global.bcryptHash)
    	console.log('<br/>generated hash md5 : ', global.md5Hash)

    	/* option test from terminal arguments */
    	let opsi = args.mode
    	
    	if(opsi == 'positive') {
    		console.log('<br/>====================<br/>')
    		console.log('Start positive test (right password) ')
    		console.log('<br/>====================<br/>')
    		return require('./positive')
    	}
    	if(opsi == 'negative') {
    		console.log('<br/>====================<br/>')
    		console.log('Start negative test (wrong password)')
    		console.log('<br/>====================<br/>')
    		return require('./negative')
    	}
    	console.log('opsi tidak ada')
    })
    .catch(error => console.error(error));


