'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocateMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocateMenu = exports.LocateMenu = function (_Component) {
  _inherits(LocateMenu, _Component);

  function LocateMenu() {
    _classCallCheck(this, LocateMenu);

    return _possibleConstructorReturn(this, (LocateMenu.__proto__ || Object.getPrototypeOf(LocateMenu)).apply(this, arguments));
  }

  _createClass(LocateMenu, [{
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        'a',
        { href: '#/locate' },
        window.I18n.t('Locate')
      );
    }
  }]);

  return LocateMenu;
}(_preact.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhdGVNZW51LmpzIl0sIm5hbWVzIjpbIkxvY2F0ZU1lbnUiLCJ3aW5kb3ciLCJJMThuIiwidCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRWFBLFUsV0FBQUEsVTs7Ozs7Ozs7Ozs7NkJBQ0Y7QUFDUCxhQUFRO0FBQUE7QUFBQSxVQUFHLE1BQU0sVUFBVDtBQUFzQkMsZUFBT0MsSUFBUCxDQUFZQyxDQUFaLENBQWMsUUFBZDtBQUF0QixPQUFSO0FBQ0QiLCJmaWxlIjoibG9jYXRlTWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBMb2NhdGVNZW51IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoPGEgaHJlZj17JyMvbG9jYXRlJ30+e3dpbmRvdy5JMThuLnQoJ0xvY2F0ZScpfTwvYT4pO1xuICB9XG59Il19