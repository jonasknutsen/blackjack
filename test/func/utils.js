const utils = require('../../func/utils')

describe('func/utils.js', function() {
  it('arrayFromText() - should return an array with values from comma separated string', async function () {
    let returnValue = await utils.arrayFromText('CA, D5, H9, HQ, S8')
    expect(returnValue)
      .to.be.an('array')
      .and.eql(['CA', 'D5', 'H9', 'HQ', 'S8'])
  })

  it('textFromArray() - should return a string with comma separated values from array', async function () {
    let returnValue = await utils.textFromArray(['CA', 'D5', 'H9', 'HQ', 'S8'])
    expect(returnValue)
      .to.be.an('string')
      .and.to.equal('CA, D5, H9, HQ, S8')
  })

  it('checkScore() - should return a sum from an array input', async function () {
    let returnValue = await utils.checkScore(['CA', 'D5', 'H9', 'HQ', 'S8'])
    expect(returnValue)
      .to.be.an('number')
      .and.to.equal(43)
  })
})
