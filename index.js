#!/usr/bin/env node

var Hjson = require('hjson')
var fs = require('fs')
var path = require('path')
var format = require('string-format')
var spawn = require('child_process').spawn

var commander = require('commander')

commander
  .version('1.0.0')
  .arguments('<sftp-config.json>')
  .action(function (sftpConfigPath) {
    var sftpConfigString = fs.readFileSync(sftpConfigPath).toString()
    var sftpConfig = Hjson.parse(sftpConfigString)

    openWinscp({
      type: sftpConfig.type,
      host: sftpConfig.host,
      port: sftpConfig.port,
      user: sftpConfig.user,
      password: sftpConfig.password,
      remote_path: sftpConfig.remote_path,
      local_path: path.dirname(sftpConfigPath),
      winscp: 'WinSCP'
    })
  })
  .parse(process.argv)

function openWinscp (opts) {
  var command = '"{winscp}" {type}://"{user}":"{password}"@{host}:{port}"{remote_path}" /rawsettings LocalDirectory="{local_path}"'
  spawn('sh', ['-c', format(command, opts)], {detached: true}).unref()
  process.exit()
}

module.exports = openWinscp
