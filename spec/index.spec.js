/* eslint-env node, jasmine */

const sftpOpenPkg = process.env.JASMINE_TEST === 'lib'
  ? require('../lib/index')
  : require('../src/index')

describe('sftp-open', () => {
  it('validate exported variable types', () => {
    expect(sftpOpenPkg.default).toEqual(jasmine.any(Function))
    expect(sftpOpenPkg.openWinscp).toEqual(jasmine.any(Function))
    expect(sftpOpenPkg.openWinscpByPath).toEqual(jasmine.any(Function))
    expect(sftpOpenPkg.commandTemplate).toEqual(jasmine.any(String))
  })
})
