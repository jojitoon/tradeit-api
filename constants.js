import debug from 'debug';
// import env from "./config/env-config"

export const logger = debug('tradeit:backend ');

export const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// export const africaTalkingOptions = {
//   apiKey: env.africaIsTalkingKey,
//   username: env.africaIsTalkingUsername
// }
