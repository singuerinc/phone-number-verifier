const axios = require("axios");

const ERROR_COUNTRY_CODE_REQUIRED = "COUNTRY CODE REQUIRED";
const ERROR_PHONE_NUMBER_REQUIRED = "PHONE NUMBER REQUIRED";

const TWILIO_VERIFICATION_START =
  "https://api.authy.com/protected/json/phones/verification/start";
const TWILIO_VERIFICATION_CHECK =
  "https://api.authy.com/protected/json/phones/verification/check";

const sendCode = async (
  country_code,
  phone_number,
  api_key,
  url = TWILIO_VERIFICATION_START,
  axios_post = axios.post
) => {
  if (!country_code) {
    throw new Error(ERROR_COUNTRY_CODE_REQUIRED);
  }
  if (!phone_number) {
    throw new Error(ERROR_PHONE_NUMBER_REQUIRED);
  }

  try {
    const { data } = await axios_post(url, {
      api_key,
      via: "sms",
      phone_number,
      country_code
    });

    return data;
  } catch ({ response }) {
    throw response.data;
  }
};

const checkCode = (api_key, axios_get = axios.get) => async (
  country_code,
  phone_number,
  verification_code
) => {
  if (!country_code) {
    throw new Error(ERROR_COUNTRY_CODE_REQUIRED);
  }
  if (!phone_number) {
    throw new Error(ERROR_PHONE_NUMBER_REQUIRED);
  }
  if (!verification_code) {
    throw new Error(ERROR_COUNTRY_CODE_REQUIRED);
  }

  try {
    const { data } = await axios_get(url, {
      params: {
        api_key,
        verification_code,
        phone_number,
        country_code
      }
    });
    return data;
  } catch ({ response }) {
    throw response.data;
  }
};

module.exports = {
  ERROR_COUNTRY_CODE_REQUIRED,
  ERROR_PHONE_NUMBER_REQUIRED,
  TWILIO_VERIFICATION_START,
  TWILIO_VERIFICATION_CHECK,
  sendCode,
  checkCode
};
