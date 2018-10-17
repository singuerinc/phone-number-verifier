# Node Phone Number Verifier

Use this module to verify that your user has access to a phone number.

Powered by [Twilio Verify](https://www.twilio.com/verify).

```
const NumberVerifier = require('phone-number-verifier')
const numberVerifier = new NumberVerifier({ apiKey: '' })

numberVerifier.sendCode({
  countryCode: '44',
  phoneNumber: ''
})


const response = numberVerifier.checkCode({
  countryCode: '44',
  phoneNumber: '',
  verificationCode: '123'
})
console.log(response.success)
```
