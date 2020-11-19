"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongooseOptions = exports.logger = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import env from "./config/env-config"
const logger = (0, _debug.default)('tradeit:backend ');
exports.logger = logger;
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}; // export const africaTalkingOptions = {
//   apiKey: env.africaIsTalkingKey,
//   username: env.africaIsTalkingUsername
// }

exports.mongooseOptions = mongooseOptions;