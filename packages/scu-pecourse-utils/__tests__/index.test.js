const {
  app_key,
  app_secret,
  getSign,
} = require('../lib/index.cjs.js')

const getData = {
  app_key: 'eb8c68399de7483abb2d8abaea0d039f',
  timestamp: '1616561463000',
  sign: 'e98f4838036419596a411b0e5cb3b92b',
  path: '/api/terms'
}

const postData = {
  path: '/api/login',
  app_key: 'eb8c68399de7483abb2d8abaea0d039f',
  timestamp: '1616561934000',
  sign: 'b18c82c474d04603806963d757249884',
  data: {
    username: '2016141451248',
    password: '111111'
  }
}

describe('test sign', () => {
  it('app_key test', () => {
    expect(app_key).toBe(getData.app_key)
  })

  it('get sign test', () => {
    expect(getSign(getData.path, app_secret, getData.timestamp)).toBe(getData.sign)
  })
  it('post sign test', () => {
    expect(getSign(postData.path, app_secret, postData.timestamp, postData.data)).toBe(postData.sign)
  })
})
