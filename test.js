import {
  ERROR_COUNTRY_CODE_REQUIRED,
  ERROR_PHONE_NUMBER_REQUIRED,
  TWILIO_VERIFICATION_START,
  TWILIO_VERIFICATION_CHECK,
  sendCode,
  checkCode
} from "./";
import test from "ava";

const axiosMockGood = () => ({
  post: () =>
    Promise.resolve({
      data: true
    })
});

const axiosMockBad = () => ({
  get: () =>
    Promise.reject({
      response: {
        data: {
          message: "Phone number is invalid"
        }
      }
    })
});

const KEY = "some secret api key";
const URL = "some random url";

test("sendCode reaches Twilio and succeeds", async t => {
  const success = await sendCode(
    "44",
    "12345678",
    KEY,
    URL,
    axiosMockGood().post
  );

  t.true(success);
});

test("sendCode error country code is required", async t => {
  const error = await t.throws(sendCode());
  t.is(error.message, ERROR_COUNTRY_CODE_REQUIRED);
});

test("sendCode error country code is required", async t => {
  const error = await t.throws(sendCode("33"));
  t.is(error.message, ERROR_PHONE_NUMBER_REQUIRED);
});

test("checkCode reaches Twilio", async t => {
  const error = await t.throws(
    checkCode("44", "9876543210", "123", KEY, URL, axiosMockBad().get)
  );
  t.truthy(error.message.includes("Phone number is invalid"));
});
