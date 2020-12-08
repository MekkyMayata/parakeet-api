import q from 'q';
import twilio from 'twilio';
import config from '../../config/';

const accountSid = config.TWILIO_SID;
const twilioAuthToken = config.TWILIO_AUTH_TOKEN;
const from = config.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, twilioAuthToken);

const sendSMS = async (message, phoneNumber) => {
  global.logger.info( `Message: \n${message} \n sending to: ${phoneNumber}`);
  const defer = q.defer();
  
  const phoneNumberArrayObject = phoneNumber.split('');
  // remove first digit
  phoneNumberArrayObject.shift()
  const to = `+234${phoneNumberArrayObject.join('')}`;

  client.messages.create({
    from,
    body: message,
    to
  }).then((res) => {
    defer.resolve(res.sid);
  }).catch((err) => {
    global.logger.info(`Error sending SMS to ${to}`, err);
    defer.reject(err);
  });

  return defer.promise;
};

export default sendSMS;

