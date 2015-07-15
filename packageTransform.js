'use strict';

var Argv = require('ee-argv');
var Fs = require('fs');
require('colors');

var rootPackage = Fs.readFileSync('package.json', 'utf-8');
var rootPackageObject = require('./package.json');

var env = Argv.get('env').toUpperCase();

console.log('Starting Transform for %s'.bold.green, env);

if(Argv.has('verbose')){
	console.log('here is the rootPackage'.bold.yellow);
	console.log(rootPackage);
	console.log('end of rootPackage');
}

var envPackage;
try{
	envPackage = require('./package.config.{ENV}.json'.replace('{ENV}',env));
}catch(err){
	console.log('Error Reading package.config.%s.json file. please check it exists'.bold.red, env);
	if(Argv.has('verbose')){
		console.log(err);
	}
	process.exit(1);
}

for(var key in envPackage){
	if(rootPackageObject.config[key]){
		var replaceMe = '"'+key+'": "'+rootPackageObject.config[key]+'",';
		var replaceMeWith = '"'+key+'": "'+envPackage[key]+'",';
		
		if(Argv.has('verbose')){
			console.log('OLD : '.yellow + replaceMe);
			console.log('NEW : '.green + replaceMeWith);
		}
		
		rootPackage = rootPackage.replace(replaceMe, replaceMeWith);
	}
}

try{
	Fs.writeFileSync('package.json', rootPackage);
	console.log('Completed Transform for %s'.bold.green, env);
}catch(err){
	console.log('Error Writing to package.json'.bold.red);
	if(Argv.has('verbose')){
		console.log(err);
	}
	process.exit(1);
}