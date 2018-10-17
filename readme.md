# Node Phone Number Verifier

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
