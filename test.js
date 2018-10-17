import PhoneNumberVerifier from './'
import test from 'ava'

const { COUNTRY_CODE, PHONE_NUMBER, API_KEY } = process.env

const sut = new PhoneNumberVerifier({ apiKey: API_KEY })

test('sendCode reaches Twilio and succeeds', async t => {
  const { success } = await sut.sendCode({ countryCode: COUNTRY_CODE, phoneNumber: PHONE_NUMBER })
  t.true(success)
})

test('checkCode reaches Twilio', async t => {
  const error = await t.throws(sut.checkCode({ countryCode: '44', phoneNumber: '123', verificationCode: '123' }))
  t.truthy(error.message.includes('Phone number is invalid'))
})
