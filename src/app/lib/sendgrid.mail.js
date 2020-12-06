import q from 'q';
import sendgrid from '@sendgrid/mail';
import config from '../../config';

sendgrid.setApiKey(config.SENDGRID_API_KEY);

const sendgridMail = (options) => {
  const defer = q.defer();
  const msg = {
    to: options.to,
    from: options.from,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  global.logger.info(JSON.stringify(msg, null, '\t'));

  sendgrid.send(msg)
  .then(() => {
    defer.resolve(true);
  })
  .catch((err) => {
    defer.reject(err);
  });
  return defer.promise;
}

export default sendgridMail;
