const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().required().description('server that will send the emails'),
    SMTP_PORT: Joi.number().required().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().required().description('username for email server'),
    SMTP_PASSWORD: Joi.string().required().description('password for email server'),
    EMAIL_FROM: Joi.string().required().description('the from field in the emails sent by the app'),
    // Firebase config
    FIREBASE_PROJECT_ID: Joi.string().required().description('Firebase Project ID'),
    FIREBASE_PRIVATE_KEY: Joi.string().required().description('Firebase Private Key'),
    FIREBASE_CLIENT_EMAIL: Joi.string().required().description('Firebase Client Email'),
    FIREBASE_CLIENT_ID: Joi.string().required().description('Firebase Client ID'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {},
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  firebase: {
    projectId: envVars.FIREBASE_PROJECT_ID,
    privateKey: envVars.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure private key format
    clientEmail: envVars.FIREBASE_CLIENT_EMAIL,
    clientId: envVars.FIREBASE_CLIENT_ID,
  },
};
