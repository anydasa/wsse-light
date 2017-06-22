'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _encUtf = require('crypto-js/enc-utf8');

var _encUtf2 = _interopRequireDefault(_encUtf);

var _encBase = require('crypto-js/enc-base64');

var _encBase2 = _interopRequireDefault(_encBase);

var _sha = require('crypto-js/sha1');

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wsse = function () {
  function Wsse() {
    _classCallCheck(this, Wsse);
  }

  _createClass(Wsse, [{
    key: 'generateNonce',
    value: function generateNonce() {
      var nonce = Math.random().toString(36).substring(2);
      return _encUtf2.default.parse(nonce).toString(_encBase2.default);
    }
  }, {
    key: 'generatePasswordDigest',
    value: function generatePasswordDigest(nonce, createdDate, encodedPassword) {
      var nonce64 = _encBase2.default.parse(nonce);
      var digest = nonce64.concat(_encUtf2.default.parse(createdDate).concat(_encUtf2.default.parse(encodedPassword)));
      return (0, _sha2.default)(digest).toString(_encBase2.default);
    }
  }, {
    key: 'getWSSEHeader',
    value: function getWSSEHeader(username, password, createdDate) {
      var nonce = this.generateNonce();
      var passwordDigest = this.generatePasswordDigest(nonce, createdDate, password);
      return 'UsernameToken Username="' + username + '", PasswordDigest="' + passwordDigest + '", Nonce="' + nonce + '", Created="' + createdDate + '"';
    }
  }]);

  return Wsse;
}();

exports.default = Wsse;
