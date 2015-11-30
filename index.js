#!/usr/bin/env node
var argv = require('yargs').argv;
var format = require('string-format')
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

var startWinscpCommand = '"{winscp}" {type}://{user}:{password}@{host}:{port}"{remote_path}" /rawsettings LocalDirectory="{local_path}"';
var configFile = argv._[0];

eval('var sftpConfig = '+fs.readFileSync(configFile).toString());

sftpConfig.winscp = 'WinSCP';
sftpConfig.local_path = path.dirname(configFile);

var a = format(startWinscpCommand, sftpConfig);

var child = spawn('sh', ['-c', a], {
	detached: true
});
child.unref();
process.exit();

