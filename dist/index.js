"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _constants = require("./constants");

var _routes = _interopRequireDefault(require("./routes"));

var _auth = _interopRequireDefault(require("./middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_auth.default);

_mongoose.default.connect('mongodb+srv://admin:admin@cluster0.gkhwv.mongodb.net/tradeit?retryWrites=true&w=majority', _constants.mongooseOptions).then(() => console.log('Database connected')).catch(err => console.log('Error connecting to database'));

app.use('/api/', _routes.default); // if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../client/build'));
//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, '..', 'client', 'build', 'index.html')
//     );
//   });
// }

app.get('/*', (req, res) => {
  res.status(400).json({
    message: 'Invalid URL'
  });
});
app.listen(process.env.PORT || 5000, () => {
  console.log('connected to the server', process.env.PORT || 5000);
});