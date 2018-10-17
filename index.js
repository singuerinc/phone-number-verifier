const axios = require('axios')

module.exports = class {
  constructor ({ apiKey }) {
    this.apiKey = apiKey
  }

  async sendCode ({ countryCode, phoneNumber }) {
    if (!countryCode) { throw new Error('COUNTRY CODE REQUIRED') }
    if (!phoneNumber) { throw new Error('PHONE NUMBER REQUIRED') }

    try {
      const { data } = await axios.post('https://api.authy.com/protected/json/phones/verification/start', {
        api_key: this.apiKey,
        via: 'sms',
        phone_number: phoneNumber,
        country_code: countryCode
      })
      return data
    } catch (error) {
      throw error.response.data
    }
  }

  async checkCode ({ countryCode, phoneNumber, verificationCode }) {
    if (!countryCode) { throw new Error('COUNTRY CODE REQUIRED') }
    if (!phoneNumber) { throw new Error('PHONE NUMBER REQUIRED') }
    if (!verificationCode) { throw new Error('COUNTRY CODE REQUIRED') }

    try {
      const { data } = await axios.get('https://api.authy.com/protected/json/phones/verification/check', {
        params: {
          api_key: this.apiKey,
          verification_code: verificationCode,
          phone_number: phoneNumber,
          country_code: countryCode
        }
      })
      return data
    } catch (error) {
      throw error.response.data
    }
  }
}
