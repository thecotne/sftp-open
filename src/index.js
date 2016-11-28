#!/usr/bin/env node

import JSON5 from 'json5'
import {readFileSync} from 'fs'
import {dirname} from 'path'
import {spawn} from 'child_process'
import {version} from '../package'
import format from 'string-format'
import commander from 'commander'

export const commandTemplate = '"{winscp}" {type}://"{user}":"{password}"@{host}:{port}"{remote_path}" /rawsettings LocalDirectory="{local_path}"'

export function openWinscpByPath (sftpConfigPath) {
  const sftpConfigString = readFileSync(sftpConfigPath).toString()
  const sftpConfig = JSON5.parse(sftpConfigString)

  openWinscp({
    type: sftpConfig.type,
    host: sftpConfig.host,
    port: sftpConfig.port,
    user: sftpConfig.user,
    password: sftpConfig.password,
    remote_path: sftpConfig.remote_path,
    local_path: dirname(sftpConfigPath),
    winscp: 'WinSCP'
  })
}

export default function openWinscp (opts) {
  spawn('sh', ['-c', format(commandTemplate, opts)], {detached: true}).unref()

  process.exit()
}

const app = commander
  .version(version)
  .arguments('<sftp-config.json>')
  .action(openWinscpByPath)
  .parse(process.argv)

// show help message by default
if (app.args.length === 0) {
  app.help()
}
