/* eslint-env node, jasmine */

const sftpOpen = process.env.JASMINE_TEST === 'lib'
  ? require('../lib/index')
  : require('../src/index')

describe('sftp-open', () => {
  it('should export function', () => {
    expect(sftpOpen).toEqual(jasmine.any(Function))
  })
})
