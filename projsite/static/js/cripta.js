

const nonce = nacl.randomBytes(24)

const secretKey = new ethereumjs.Buffer.Buffer.from('_THIS_IS_MY_32_CHARS_SECRET_KEY_', 'utf8')

const secretData = new ethereumjs.Buffer.Buffer.from('Some Italians hate wine', 'utf8')
const encrypted = nacl.secretbox(secretData, nonce, secretKey)

const result = `${ethereumjs.Buffer.Buffer.from(nonce).toString('base64')}:${ethereumjs.Buffer.Buffer.from(encrypted).toString('base64')}`
console.log(result)
